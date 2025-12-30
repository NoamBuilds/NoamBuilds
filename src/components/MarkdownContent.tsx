import React from 'react';

type MarkdownContentProps = {
    content: string;
};

export default function MarkdownContent({ content }: MarkdownContentProps) {
    // Split content into lines for processing
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: string[] = [];
    let currentListType: 'ul' | 'ol' | null = null;
    let key = 0;

    const flushList = () => {
        if (currentList.length > 0) {
            const ListTag = currentListType === 'ol' ? 'ol' : 'ul';
            const listClass = currentListType === 'ol'
                ? "list-decimal list-inside space-y-2 mb-6 ml-4"
                : "list-disc list-inside space-y-2 mb-6 ml-4";

            elements.push(
                <ListTag key={`list-${key++}`} className={listClass}>
                    {currentList.map((item, i) => (
                        <li key={i} className="text-foreground/70 leading-relaxed">
                            {parseInlineFormatting(item)}
                        </li>
                    ))}
                </ListTag>
            );
            currentList = [];
            currentListType = null;
        }
    };

    const parseInlineFormatting = (text: string): (string | React.ReactElement)[] => {
        const parts: (string | React.ReactElement)[] = [];
        let remaining = text;
        let inlineKey = 0;

        // Parse bold (**text** or __text__)
        const boldRegex = /(\*\*|__)(.*?)\1/g;
        let lastIndex = 0;
        let match;

        while ((match = boldRegex.exec(remaining)) !== null) {
            if (match.index > lastIndex) {
                parts.push(remaining.slice(lastIndex, match.index));
            }
            parts.push(
                <strong key={`bold-${inlineKey++}`} className="font-bold text-foreground">
                    {match[2]}
                </strong>
            );
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < remaining.length) {
            parts.push(remaining.slice(lastIndex));
        }

        return parts.length > 0 ? parts : [text];
    };

    lines.forEach((line, index) => {
        // Empty line
        if (line.trim() === '') {
            flushList();
            return;
        }

        // Heading (## or **Heading:**)
        if (line.startsWith('##')) {
            flushList();
            const text = line.replace(/^##\s*/, '').trim();
            elements.push(
                <h3 key={`h3-${key++}`} className="text-2xl font-bold text-foreground mt-8 mb-4">
                    {text}
                </h3>
            );
            return;
        }

        // Bold heading pattern (**Text:**)
        if (line.match(/^\*\*[^*]+:\*\*$/)) {
            flushList();
            const text = line.replace(/^\*\*|\*\*$/g, '');
            elements.push(
                <h4 key={`h4-${key++}`} className="text-xl font-bold text-foreground mt-6 mb-3">
                    {text}
                </h4>
            );
            return;
        }

        // Unordered list item (- item)
        if (line.match(/^-\s+/)) {
            if (currentListType !== 'ul') {
                flushList();
                currentListType = 'ul';
            }
            currentList.push(line.replace(/^-\s+/, ''));
            return;
        }

        // Ordered list item (1. item)
        if (line.match(/^\d+\.\s+/)) {
            if (currentListType !== 'ol') {
                flushList();
                currentListType = 'ol';
            }
            currentList.push(line.replace(/^\d+\.\s+/, ''));
            return;
        }

        // Regular paragraph
        flushList();
        if (line.trim()) {
            elements.push(
                <p key={`p-${key++}`} className="text-foreground/70 text-lg leading-relaxed mb-4">
                    {parseInlineFormatting(line)}
                </p>
            );
        }
    });

    // Flush any remaining list
    flushList();

    return <div className="markdown-content">{elements}</div>;
}
