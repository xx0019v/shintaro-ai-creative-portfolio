import { ArrowUp } from "lucide-react";

const TAGS = ["AI", "Web", "Branding", "Visual Design", "Project Direction"];

export default function Footer() {
  return (
    <footer className="relative border-t border-ivory/[0.08]">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-serif text-base md:text-lg tracking-tight text-ivory">
              Shintaro Avendano
            </p>
            <p className="mt-2 text-[10px] tracking-wider2 uppercase text-muted">
              AI Creative Developer Portfolio
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-wider2 uppercase text-muted">
            {TAGS.map((t, i) => (
              <li key={t} className="flex items-center gap-2">
                {i > 0 && <span className="h-px w-2 bg-muted/40" />}
                {t}
              </li>
            ))}
          </ul>

          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-[10px] tracking-wider2 uppercase text-ivory/70 hover:text-champagne transition-colors"
          >
            <ArrowUp
              size={14}
              strokeWidth={1.25}
              className="transition-transform duration-500 group-hover:-translate-y-1"
            />
            Back to top
          </a>
        </div>

        <div className="mt-10 gold-rule" />

        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[10px] tracking-wider2 uppercase text-muted">
          <p>© 2026 Shintaro Avendano. All rights reserved.</p>
          <p>Designed &amp; built in Japan · 2026</p>
        </div>
      </div>
    </footer>
  );
}
