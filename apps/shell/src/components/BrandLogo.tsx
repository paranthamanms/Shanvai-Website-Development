import Image from 'next/image';

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  /** Pixel edge length for the square S mark. */
  size?: number;
  decorative?: boolean;
};

/**
 * Logo sizing standard:
 * - Header: 28px
 * - Hero: 36px
 * - Contact form card: 20–22px
 * - Footer: 24px
 */
export function BrandLogo({
  className = '',
  priority = false,
  size = 28,
  decorative = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/shanvai-logo.svg"
      alt={decorative ? '' : 'Shanvai Technologies'}
      width={size}
      height={size}
      priority={priority}
      unoptimized
      className={`select-none object-contain ${className}`}
      style={{ width: size, height: size, maxWidth: size, maxHeight: size }}
      aria-hidden={decorative || undefined}
    />
  );
}
