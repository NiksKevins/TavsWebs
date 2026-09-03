import Image from "next/image";
import {
  Check,
  ClipboardList,
  Globe2,
  MessageSquare,
  Rocket,
  Star,
} from "lucide-react";
import { LeadForm } from "@/components/landing/LeadForm";
import { BrandMark } from "@/components/ui/BrandMark";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  GOOGLE_REVIEWS_URL,
  googleReviews,
  realProjects,
  site,
  stats,
} from "@/lib/data";

const checklist = [
  "Jauna mājaslapa no nulles (WordPress vai pielāgota)",
  "Interneta veikals un maksājumi",
  "CRM un biznesa sistēmas",
  "Mobilās aplikācijas un AI čatboti",
  "Bezmaksas piedāvājums 24h laikā",
];

const steps = [
  {
    n: "01",
    title: "Aizpildiet formu",
    text: "Izvēlieties pakalpojumu un atstājiet kontaktus — mājaslapas adrese nav obligāta.",
    icon: ClipboardList,
  },
  {
    n: "02",
    title: "Īsa saruna",
    text: "Sazināmies 24h laikā, saprotam mērķi un sagatavojam skaidru piedāvājumu.",
    icon: MessageSquare,
  },
  {
    n: "03",
    title: "Sākam darbu",
    text: "Kad piedāvājums der — būvējam un palaidam. Ātri, kvalitatīvi, pielāgoti.",
    icon: Rocket,
  },
];

const statLabels: Record<(typeof stats)[number]["key"], string> = {
  websites: "Izveidotas mājaslapas",
  years: "Gadi pieredzes",
  rating: "Google vērtējums",
  response: "Atbildes laiks",
};

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-[#F4B400]" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a
            href="#top"
            className="display inline-flex items-center gap-2.5 text-lg text-text"
            aria-label={site.name}
          >
            <BrandMark className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
            {site.name}
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            <a href="#pakalpojumi" className="nav-link transition-colors hover:text-text">
              Pakalpojumi
            </a>
            <a href="#portfolio" className="nav-link transition-colors hover:text-text">
              Darbi
            </a>
            <a href="#atsauksmes" className="nav-link transition-colors hover:text-text">
              Atsauksmes
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-emerald-300 hover:bg-emerald-50 sm:flex"
            >
              <WhatsAppIcon size={18} brand />
            </a>
            <a
              href="#forma"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-bright hover:-translate-y-0.5"
            >
              Sazināties
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <p className="inline-flex rounded-full border border-border bg-bg-elevated px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase shadow-sm">
              Bezmaksas piedāvājums · no €200
            </p>
            <h1 className="display mt-6 text-4xl leading-[1.05] text-balance sm:text-5xl lg:text-[3.25rem]">
              Mājaslapas, CRM, SEO un AI risinājumi biznesam
            </h1>
            <p className="mt-5 text-lg text-muted">
              Izveidosim to{" "}
              <span className="font-semibold text-accent">ātri</span>, kvalitatīvi
              un pielāgotu jūsu prasībām — piedāvājums 24 stundu laikā.
            </p>
            <ul className="mt-8 space-y-3" id="pakalpojumi">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-text/85">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={site.botUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              Izmēģināt AI čatbotu → bot.tavswebs.com
            </a>
          </div>

          <div id="forma">
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="section-alt border-b border-border">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:py-16">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <Globe2 className="mx-auto mb-3 text-accent" size={24} />
              <p className="display text-3xl text-accent sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{statLabels[stat.key]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="display text-center text-2xl sm:text-3xl">
            Kā tas strādā?{" "}
            <span className="text-muted">Vienkārši 3 soļos</span>
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n} className="card p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <step.icon size={26} />
                </div>
                <p className="mt-4 font-mono text-xs text-accent">{step.n}</p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="atsauksmes" className="section-alt border-b border-border py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-3 py-1.5 shadow-sm">
              <GoogleMark className="h-4 w-4" />
              <span className="text-xs font-semibold tracking-wide text-muted uppercase">
                Google atsauksmes
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <p className="display text-4xl text-accent">4.9</p>
              <Stars />
            </div>
            <h2 className="display mt-3 text-2xl sm:text-3xl">Ko saka klienti</h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
            {googleReviews.map((review) => (
              <blockquote key={review.name} className="card flex flex-col p-5 text-left">
                <Stars />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text">
                  &ldquo;{review.textLv}&rdquo;
                </p>
                <footer className="mt-4 flex flex-col gap-0.5 border-t border-border pt-4">
                  <cite className="not-italic text-sm font-semibold">{review.name}</cite>
                  {"roleLv" in review && review.roleLv ? (
                    <span className="text-xs text-dim">{review.roleLv}</span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-xs text-dim">
                      <GoogleMark className="h-3.5 w-3.5 shrink-0" />
                      Google atsauksme
                    </span>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-6 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
            >
              <GoogleMark className="h-5 w-5" />
              Lasīt visas Google atsauksmes
            </a>
          </div>
        </div>
      </section>

      <section id="portfolio" className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-center text-xs font-semibold tracking-[0.22em] text-dim uppercase">
            Portfolio
          </p>
          <h2 className="display mt-3 text-center text-3xl sm:text-4xl">
            Reāli klientu projekti
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {realProjects.map((project) => (
              <div key={project.id} className="group card overflow-hidden">
                <div className="relative aspect-[16/11] overflow-hidden bg-surface">
                  <Image
                    src={project.image}
                    alt={project.id}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <a
              href={`${site.url}/work`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
            >
              Apskatīt visus darbus
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="display text-3xl text-balance sm:text-4xl">
            Gatavi jaunai mājaslapai vai sistēmai?
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Pastāstiet, kas vajadzīgs — iedosim skaidru cenu un termiņu bez maksas.
          </p>
          <a
            href="#forma"
            className="mt-8 inline-flex rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-bright hover:-translate-y-0.5"
          >
            Saņemt bezmaksas piedāvājumu
          </a>
        </div>
      </section>

      <footer className="border-t border-border bg-bg-elevated">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-dim sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} TavsWebs</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
              {site.email}
            </a>
            <a href={site.phoneHref} className="transition-colors hover:text-accent">
              {site.phone}
            </a>
            <a
              href={site.botUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              AI čatbots
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
