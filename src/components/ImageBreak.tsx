import Image from "next/image";
import AnimatedElement from "./AnimatedElement";

type ImageBreakProps = {
    imageSrc: string;
    text?: string[];  // Array of lines, e.g., ["BUILD", "SHIP", "REPEAT"]
    alt?: string;
};

export default function ImageBreak({
    imageSrc,
    text = ["BUILD", "SHIP", "REPEAT"],
    alt = "Dramatic visual break"
}: ImageBreakProps) {
    return (
        <section
            className="relative h-[80vh] w-full overflow-hidden"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Text overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
                <AnimatedElement>
                    <h2 className="text-6xl md:text-9xl font-bold text-white text-center opacity-30 mix-blend-overlay leading-tight">
                        {text.map((line, i) => (
                            <span key={i}>
                                {line}
                                {i < text.length - 1 && <br />}
                            </span>
                        ))}
                    </h2>
                </AnimatedElement>
            </div>

            {/* Background image */}
            <Image
                src={imageSrc}
                alt={alt}
                fill
                className="object-cover"
                priority={false}
            />
        </section>
    );
}

