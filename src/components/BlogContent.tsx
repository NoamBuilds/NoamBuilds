import React from "react";

type Props = { content: string };

function parseInline(text: string): (string | React.ReactElement)[] {
    const parts: (string | React.ReactElement)[] = [];
    // Combined regex: links, bold, italic
    const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*/g;
    let last = 0;
    let match;
    let k = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > last) parts.push(text.slice(last, match.index));

        if (match[1] !== undefined) {
            // Link
            parts.push(
                <a key={k++} href={match[2]} className="text-primary hover:underline" {...(match[2].startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {match[1]}
                </a>
            );
        } else if (match[3] !== undefined) {
            // Bold
            parts.push(<strong key={k++} className="font-bold text-foreground">{match[3]}</strong>);
        } else if (match[4] !== undefined) {
            // Italic
            parts.push(<em key={k++} className="italic">{match[4]}</em>);
        }
        last = match.index + match[0].length;
    }

    if (last < text.length) parts.push(text.slice(last));
    return parts.length > 0 ? parts : [text];
}

export default function BlogContent({ content }: Props) {
    const lines = content.split("\n");
    const elements: React.ReactElement[] = [];
    let listItems: string[] = [];
    let listType: "ul" | "ol" | null = null;
    let tableRows: string[][] = [];
    let key = 0;

    const flushList = () => {
        if (listItems.length === 0) return;
        const Tag = listType === "ol" ? "ol" : "ul";
        const cls = listType === "ol" ? "list-decimal" : "list-disc";
        elements.push(
            <Tag key={key++} className={`${cls} list-inside space-y-2 mb-6 ml-4`}>
                {listItems.map((item, i) => (
                    <li key={i} className="text-foreground/70 leading-relaxed">{parseInline(item)}</li>
                ))}
            </Tag>
        );
        listItems = [];
        listType = null;
    };

    const flushTable = () => {
        if (tableRows.length === 0) return;
        const header = tableRows[0];
        const body = tableRows.slice(1);
        elements.push(
            <div key={key++} className="overflow-x-auto mb-8">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-white/20">
                            {header.map((cell, i) => (
                                <th key={i} className="text-left p-3 font-bold text-foreground">{parseInline(cell)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {body.map((row, ri) => (
                            <tr key={ri} className="border-b border-white/10">
                                {row.map((cell, ci) => (
                                    <td key={ci} className="p-3 text-foreground/70">{parseInline(cell)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
        tableRows = [];
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Empty line
        if (trimmed === "") {
            flushList();
            continue;
        }

        // Table row
        if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
            flushList();
            // Skip separator rows (|---|---|)
            if (trimmed.match(/^\|[\s\-|]+\|$/)) continue;
            const cells = trimmed.split("|").slice(1, -1).map((c) => c.trim());
            tableRows.push(cells);
            // Check if next line is not a table row — flush
            const next = lines[i + 1]?.trim();
            if (!next || (!next.startsWith("|"))) flushTable();
            continue;
        } else {
            flushTable();
        }

        // H2
        if (trimmed.startsWith("## ")) {
            flushList();
            elements.push(
                <h2 key={key++} className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
                    {trimmed.slice(3)}
                </h2>
            );
            continue;
        }

        // H3
        if (trimmed.startsWith("### ")) {
            flushList();
            elements.push(
                <h3 key={key++} className="text-xl md:text-2xl font-bold text-foreground mt-8 mb-4">
                    {trimmed.slice(4)}
                </h3>
            );
            continue;
        }

        // Unordered list
        if (trimmed.match(/^-\s+/)) {
            if (listType !== "ul") { flushList(); listType = "ul"; }
            listItems.push(trimmed.replace(/^-\s+/, ""));
            continue;
        }

        // Ordered list
        if (trimmed.match(/^\d+\.\s+/)) {
            if (listType !== "ol") { flushList(); listType = "ol"; }
            listItems.push(trimmed.replace(/^\d+\.\s+/, ""));
            continue;
        }

        // Paragraph
        flushList();
        elements.push(
            <p key={key++} className="text-foreground/70 text-lg leading-relaxed mb-4">
                {parseInline(trimmed)}
            </p>
        );
    }

    flushList();
    flushTable();

    return <div>{elements}</div>;
}
