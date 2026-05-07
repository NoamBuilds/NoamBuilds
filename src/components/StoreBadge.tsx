import Image from "next/image";

/**
 * Official App Store / Google Play marketing badges.
 *
 * Compliance notes (per Apple + Google guideline pages):
 * - The badge artwork is not modified. No border, no recolor, no animation
 *   on the image itself. Apple's black badge is mandatory in any layout that
 *   shows another platform's badge alongside it.
 * - The wrapper anchor carries the hover affordance via filter brightness;
 *   the badge image stays untouched.
 *
 * Aspect ratios are read from the official SVG viewBoxes:
 *   Apple:  119.66 x 40    -> 2.99
 *   Google: 238.96 x 70.87 -> 3.37
 */

const APPLE_RATIO = 119.66 / 40;
const GOOGLE_RATIO = 238.96 / 70.87;
const DEFAULT_HEIGHT = 56;

type Props = {
    store: "apple" | "google";
    href: string;
    height?: number;
};

export default function StoreBadge({ store, href, height = DEFAULT_HEIGHT }: Props) {
    const isApple = store === "apple";
    const ratio = isApple ? APPLE_RATIO : GOOGLE_RATIO;
    const width = Math.round(height * ratio);
    const label = isApple ? "Download on the App Store" : "Get it on Google Play";
    const src = isApple ? "/badges/apple-app-store.svg" : "/badges/google-play.svg";

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex shrink-0 transition-[filter,transform] duration-200 hover:brightness-110 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
            <Image
                src={src}
                alt={label}
                width={width}
                height={height}
                priority
                unoptimized
                style={{ display: "block" }}
            />
        </a>
    );
}
