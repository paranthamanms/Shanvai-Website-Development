import Image from 'next/image';

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  /** Pixel width. Header standard: 32. Hero lockup: 40. */
  size?: number;
  decorative?: boolean;
};

/**
 * Logo sizing standard (enterprise header/hero ratios):
 * - Header wordmark lockup: 32px mark
 * - Hero brand lockup: 40px mark
 * - Footer: 28px mark
 */
export function BrandLogo({
  className = '',
  priority = false,
  size = 32,
  decorative = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/shanvai-logo.svg"
      alt={decorative ? '' : 'Shanvai Technologies'}
      width={size}
      height={Math.round(size * 0.93)}
      priority={priority}
      unoptimized
      className={`h-auto w-auto select-none ${className}`}
      aria-hidden={decorative || undefined}
    />
  );
}
