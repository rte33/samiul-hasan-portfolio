import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";
import { getProject, projects, getPortfolio } from "@/lib/content";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const author = getPortfolio().profile.name;
    const title = p ? `${p.title} — Case Study | ${author}` : "Case Study";
    return {
      meta: [
        { title },
        { name: "description", content: p?.summary ?? "EEE project case study." },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.summary ?? "EEE project case study." },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-paper p-10 text-ink">
      Project not found. <Link to="/" className="text-blueprint underline">Back home</Link>
    </div>
  ),
  component: CaseStudy,
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <div className="border-b border-line pb-3">
        <h2 className="text-xl font-semibold tracking-tight text-ink">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function CaseStudy() {
  const { project: p } = Route.useLoaderData();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length]!;

  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <div className="grid-bg">
        <div className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-inksoft hover:text-blueprint"
            >
              ← Back to portfolio
            </Link>
            <ThemeToggle />
          </div>

          <header className="panel mt-6 p-7 sm:p-10">
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-inksoft">
              <span className="text-blueprint">{p.fig} — Case Study</span>
              <span>{p.year}</span>
            </div>
            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {p.title}
            </h1>
            <p className="mt-4 max-w-[60ch] text-inksoft">{p.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-surface/70 px-2.5 py-1 font-mono text-[11px] text-ink ring-1 ring-outline"
                >
                  {t}
                </span>
              ))}
            </div>
          </header>

          <figure className="panel mt-6 overflow-hidden p-3">
            <img
              src={p.image}
              alt={p.caption}
              width={1280}
              height={768}
              className="w-full rounded-md object-cover"
            />
            <figcaption className="px-2 pb-1 pt-3 font-mono text-[11px] text-inksoft">
              {p.fig}. {p.caption}
            </figcaption>
          </figure>

          <Block title="Objectives">
            <ul className="panel space-y-3 p-6">
              {p.objectives.map((o, i) => (
                <li key={i} className="flex gap-4 text-sm text-inksoft">
                  <span className="font-mono text-[11px] text-blueprint">O{i + 1}</span>
                  {o}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Methods">
            <ol className="panel space-y-3 p-6">
              {p.methods.map((m, i) => (
                <li key={i} className="flex gap-4 text-sm text-inksoft">
                  <span className="font-mono text-[11px] text-blueprint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {m}
                </li>
              ))}
            </ol>
          </Block>

          <Block title="Results">
            <div className="grid gap-4 sm:grid-cols-3">
              {p.results.map((r) => (
                <div key={r.metric} className="panel p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-inksoft">
                    {r.metric}
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-blueprint">{r.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-[65ch] text-sm text-inksoft">{p.resultNotes}</p>
          </Block>

          <div className="mt-14 flex items-center justify-between border-t border-line pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-inksoft">
              Next case study
            </span>
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="text-sm font-medium text-blueprint hover:text-ink"
            >
              {next.title} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
