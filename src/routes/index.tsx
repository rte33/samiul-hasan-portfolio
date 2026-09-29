import { createFileRoute, Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";
import { getPortfolio, getProjects, resolveImage, resolveAsset } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => {
    const portfolio = getPortfolio();
    return {
      meta: [
        { title: portfolio.site.title },
        {
          name: "description",
          content: portfolio.site.description,
        },
        { property: "og:title", content: portfolio.site.title },
        {
          property: "og:description",
          content: portfolio.site.description,
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Index,
});

function SectionHeading({
  title,
  aside,
}: {
  title: string;
  aside?: string;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-line pb-3">
      <h2 className="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      {aside ? (
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-inksoft">
          {aside}
        </span>
      ) : null}
    </div>
  );
}

function Index() {
  const portfolio = getPortfolio();
  const projects = getProjects();
  const { profile, academics, skills, focusAreas, publications, coursework, contact, footer } = portfolio;

  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <div className="grid-bg">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10 lg:px-14">
          {/* HERO */}
          <header className="relative">
            <div className="panel p-7 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-inksoft">
                {profile.subheading ? (
                  <span>{profile.subheading}</span>
                ) : (
                  <span />
                )}
                <div className="flex items-center gap-3">
                  <Link
                    to="/updates"
                    className="inline-flex items-center rounded-[min(1vw,8px)] border border-blueprint/50 bg-surface/90 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-ink ring-1 ring-blueprint/25 shadow-sm transition-all hover:border-blueprint hover:bg-blueprint hover:text-primary-foreground hover:shadow-md"
                  >
                    Updates →
                  </Link>
                  <ThemeToggle />
                </div>
              </div>

              {/* PROMINENT CARD HERO WITH GLASS BEVEL INSET SHADING */}
              <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-[46ch]">
                  {/* Header Row: Tagline + Name + Mobile-only Photo Card */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-blueprint">
                        {profile.tagline}
                      </p>
                      <h1 className="mt-4 text-4xl font-semibold leading-none tracking-tight text-ink sm:text-5xl lg:text-6xl">
                        {profile.name}
                      </h1>
                    </div>

                    {/* Mobile Photo: Prominent card beside name, hidden on desktop */}
                    <div className="shrink-0 w-fit lg:hidden">
                      <div className="w-fit rounded-2xl p-1.5 ring-1 ring-outline/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_24px_-6px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_16px_32px_-6px_rgba(0,0,0,0.65)] bg-surface/75 backdrop-blur-md">
                        <img
                          src={resolveImage(profile.portrait)}
                          alt={profile.portraitAlt || profile.name}
                          className="size-24 rounded-xl object-cover sm:size-32"
                          width={434}
                          height={412}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 max-w-[52ch] text-base text-inksoft sm:text-lg">
                    {profile.summary}
                  </p>
                  {profile.cv ? (
                    <a
                      href={resolveAsset(profile.cv)}
                      download
                      className="mt-6 inline-flex items-center gap-2 rounded-[min(1vw,10px)] bg-blueprint px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-ink"
                    >
                      {profile.cvLabel || "Download CV (PDF) ↓"}
                    </a>
                  ) : null}
                </div>

                {/* Desktop Photo Card: Unchanged on Desktop (>= 1024px) */}
                <div className="hidden shrink-0 w-fit lg:block">
                  <div className="w-fit rounded-2xl p-1.5 ring-1 ring-outline/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_24px_-6px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_16px_32px_-6px_rgba(0,0,0,0.65)] bg-surface/75 backdrop-blur-md">
                    <img
                      src={resolveImage(profile.portrait)}
                      alt={profile.portraitAlt || profile.name}
                      className="size-44 rounded-xl object-cover"
                      width={434}
                      height={412}
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* EDUCATION & FOCUS AREAS */}
          {academics && academics.length > 0 ? (
            <section className="mt-16">
              <SectionHeading title="Education & Research Focus" aside="Academic Background" />
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {academics.map((item, idx) => (
                  <div key={idx} className="panel flex flex-col justify-between p-6 md:col-span-2">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-inksoft">
                            {item.period}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">
                            {item.degree}
                          </h3>
                        </div>
                        {item.logo ? (
                          <div className="shrink-0 w-fit rounded-xl bg-white/90 p-2 shadow-sm ring-1 ring-outline/70 dark:bg-white/95">
                            <img
                              src={resolveImage(item.logo)}
                              alt={`${item.institution} logo`}
                              className="h-10 w-auto max-w-[64px] object-contain sm:h-12"
                              width={64}
                              height={48}
                              loading="lazy"
                            />
                          </div>
                        ) : null}
                      </div>
                      <p className="mt-3 text-sm font-medium text-blueprint">{item.institution}</p>
                      <p className="mt-3 text-sm leading-relaxed text-inksoft">
                        {item.details}
                      </p>
                    </div>
                  </div>
                ))}

                {/* FOCUS AREAS & QUICK METRICS CARD */}
                <div className="panel flex flex-col justify-between p-6">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-inksoft">
                      {focusAreas?.title || "Focus Areas"}
                    </p>
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      {(focusAreas?.tags || [
                        "Power Systems",
                        "Optical SPR",
                        "PVsyst Solar",
                        "CFD Thermal",
                      ]).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-lg bg-surface/90 px-2.5 py-1 font-mono text-[11px] font-medium text-ink ring-1 ring-outline/70 transition-colors hover:bg-surface-strong"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 border-t border-line/70 pt-3.5 font-mono text-xs text-inksoft">
                    {focusAreas?.metrics || `${publications?.length || 4} Papers • 1 Grant`}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {/* RESEARCH / PROJECTS */}
          {projects && projects.length > 0 ? (
            <section className="mt-16">
              <SectionHeading title="Research & Projects" aside="Selected work" />
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {projects.map((p) => (
                  <Link
                    key={p.slug}
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="panel group block p-6 transition hover:ring-blueprint/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-blueprint">
                        {p.fig}
                      </span>
                      <span className="font-mono text-[11px] text-inksoft">{p.year}</span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-ink">{p.title}</h3>
                    <p className="mt-2 text-sm text-inksoft">{p.summary}</p>
                    <span className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.15em] text-blueprint group-hover:text-ink">
                      Read case study →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {/* SKILLS */}
          {skills && skills.length > 0 ? (
            <section className="mt-16">
              <SectionHeading title="Technical Skills" aside="Tools & methods" />
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {skills.map((s, idx) => (
                  <div key={idx} className="panel p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-inksoft">
                      {s.category}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-inksoft">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* PUBLICATIONS */}
          {(publications && publications.length > 0) || coursework ? (
            <section className="mt-16">
              <SectionHeading title="Publications & Coursework" />
              <div className="panel mt-6 p-6">
                <ul className="space-y-4">
                  {publications?.map((pub, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="font-mono text-[11px] text-blueprint">{pub.num || `[${idx + 1}]`}</span>
                      <p className="text-sm text-inksoft">
                        {pub.authors ? `${pub.authors} ` : null}
                        {pub.year ? `(${pub.year}). ` : null}
                        {pub.url ? (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-ink transition-colors hover:text-blueprint underline underline-offset-2"
                          >
                            {pub.title}
                          </a>
                        ) : (
                          <span className="text-ink font-medium">{pub.title}</span>
                        )}
                        {pub.venue ? ` ${pub.venue}.` : null}
                        {pub.badge ? (
                          <span className="ml-2 inline-block rounded bg-blueprint/10 px-1.5 py-0.5 font-mono text-[10px] uppercase text-blueprint">
                            {pub.badge}
                          </span>
                        ) : null}
                      </p>
                    </li>
                  ))}
                  {coursework ? (
                    <li className="flex gap-4">
                      <span className="font-mono text-[11px] text-blueprint">
                        [{publications ? publications.length + 1 : 1}]
                      </span>
                      <p className="text-sm text-inksoft">
                        <span className="text-ink font-medium">Coursework:</span> {coursework}
                      </p>
                    </li>
                  ) : null}
                </ul>
              </div>
            </section>
          ) : null}

          {/* CONTACT */}
          {contact ? (
            <section className="mt-16">
              <SectionHeading title={contact.heading || "Contact"} />
              <div className="panel mt-6 p-7 sm:p-8">
                <p className="max-w-[52ch] text-base text-inksoft">
                  {contact.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex items-center gap-2 rounded-[min(1vw,10px)] bg-blueprint px-4 py-2.5 text-sm font-medium text-primary-foreground ring-1 ring-blueprint/40 transition-colors hover:bg-ink"
                    >
                      {contact.email}
                    </a>
                  ) : null}
                  {contact.links?.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target={link.url.startsWith("http") ? "_blank" : undefined}
                      rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-[min(1vw,10px)] bg-surface/70 px-4 py-2.5 text-sm font-medium text-ink ring-1 ring-outline transition-colors hover:bg-surface-strong"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {footer ? (
            <footer className="mt-14 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-inksoft">
              <span>{footer.title}</span>
              <span>{footer.revision}</span>
            </footer>
          ) : null}
        </div>
      </div>
    </div>
  );
}
