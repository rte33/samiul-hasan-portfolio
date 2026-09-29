import { createFileRoute, Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";
import { getUpdates, getPortfolio, type UpdateEntry } from "@/lib/content";

export const Route = createFileRoute("/updates")({
  head: () => {
    const data = getUpdates();
    return {
      meta: [
        { title: data.title },
        {
          name: "description",
          content: data.description,
        },
        { property: "og:title", content: data.title },
        {
          property: "og:description",
          content: data.description,
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: UpdatesPage,
});

function TimelineEntry({ entry, isNow }: { entry: UpdateEntry; isNow?: boolean }) {
  return (
    <li className="relative pl-10 sm:pl-14">
      {/* node on the line */}
      <span
        className={`absolute left-0 top-1.5 flex size-4 items-center justify-center rounded-full ring-2 ${
          isNow
            ? "bg-blueprint ring-blueprint/40"
            : "bg-paper ring-outline"
        }`}
      >
        {isNow ? <span className="size-1.5 rounded-full bg-paper" /> : null}
      </span>
      <div className="panel p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-inksoft">
            {entry.date}
            {entry.time ? ` — ${entry.time}` : ""}
          </p>
          {entry.tag ? (
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
                isNow
                  ? "bg-blueprint text-primary-foreground"
                  : "bg-surface text-inksoft ring-1 ring-outline"
              }`}
            >
              {entry.tag}
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 text-base font-semibold text-ink sm:text-lg">
          {entry.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-inksoft">
          {entry.detail}
        </p>
        {entry.links && entry.links.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1 rounded bg-surface/70 px-2.5 py-1 font-mono text-[11px] text-blueprint ring-1 ring-outline hover:text-ink"
              >
                {link.label} →
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
}

function UpdatesPage() {
  const data = getUpdates();
  const portfolio = getPortfolio();

  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <div className="grid-bg">
        <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
          <header className="panel p-7 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-inksoft">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-[min(1vw,8px)] border border-line bg-surface/80 px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-[0.15em] text-ink ring-1 ring-outline/60 shadow-sm transition-all hover:border-blueprint/60 hover:text-blueprint hover:shadow-sm"
              >
                ← Portfolio
              </Link>
              <ThemeToggle />
            </div>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-blueprint">
              Activity log
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Updates
            </h1>
            <p className="mt-4 max-w-[52ch] text-base text-inksoft">
              {data.intro ||
                "What I'm working on right now, and a timestamped record of recent milestones, research, and publications."}
            </p>
          </header>

          <div className="relative mt-12">
            {/* vertical line */}
            <span
              aria-hidden
              className="absolute bottom-2 left-[7px] top-2 w-px bg-outline"
            />
            <ol className="space-y-6">
              {data.now ? <TimelineEntry entry={data.now} isNow /> : null}
              {data.entries.map((entry, idx) => (
                <TimelineEntry key={idx} entry={entry} />
              ))}
            </ol>
          </div>

          <footer className="mt-16 border-t border-line pt-6 pb-4 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-inksoft">
            {portfolio.footer.title}
          </footer>
        </div>
      </div>
    </div>
  );
}
