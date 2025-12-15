// Animated grid background with gradient overlay
// Used in Hero and Contact CTA sections

export default function NeonGridBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Grid pattern with radial fade */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #212121 1px, transparent 1px),
            linear-gradient(to bottom, #212121 1px, transparent 1px)
          `,
                    backgroundSize: '4rem 4rem',
                    maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
                }}
            />
            {/* Gradient glow at top */}
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/8 to-transparent blur-[100px]" />
        </div>
    );
}

