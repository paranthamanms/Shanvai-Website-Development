export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-abyss">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-snow">
            Shanvai Technologies
          </p>
          <p className="mt-1 text-sm text-mist">
            Decision intelligence platforms for regulated BFSI institutions.
          </p>
        </div>
        <p className="text-xs text-mist/80">
          © {new Date().getFullYear()} Shanvai Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
