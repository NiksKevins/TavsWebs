import Image from "next/image";
import {
  Check,
  ClipboardList,
  MessageSquare,
  Rocket,
  Globe2,
  Smile,
  Star,
  Headphones,
} from "lucide-react";
import { LeadForm } from "@/components/landing/LeadForm";
import { BrandMark } from "@/components/ui/BrandMark";
import { projects, site } from "@/lib/data";

const checklist = [
  "Jauna mājaslapa no nulles",
  "Interneta veikals un maksājumi",
  "CRM un biznesa sistēmas",
  "Mobilās aplikācijas",
  "Bezmaksas piedāvājums 24h laikā",
];

const stats = [
  { value: "35+", label: "Izveidotas mājaslapas", icon: Globe2 },
  { value: "98%", label: "Klientu apmierinātība", icon: Smile },
  { value: "4.9★", label: "Vidējais vērtējums", icon: Star },
  { value: "24/7", label: "Atbalsts klientiem", icon: Headphones },
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

const GOOGLE_REVIEWS_URL = "https://share.google/SfRHlWtMviu8CpwQ5";

/** Client quotes shown on landing — replace with exact Google review text if different. */
const googleReviews = [
  {
    name: "Andris",
    text: "Vajadzēja vietni, kas skaidri rāda, ko darām. Sanāca ātri, un tagad klienti zvana paši — bez liekas skaidrošanas.",
  },
  {
    name: "Mārtiņš",
    text: "Galvenais bija, lai paši varam mainīt saturu. CMS ir saprotams — labojam lapas un pasākumus bez programmētāja.",
  },
  {
    name: "Ilze Bērziņa",
    text: "No sarunas līdz gatavai lapai — pāris nedēļas. Dizains tīrs, mobilajā skats labs, un cena bija godīga.",
  },
] as const;

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-[#F4B400]" aria-label={`${count} zvaigznes`}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

const portfolio = projects.slice(0, 4);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 text-white"
            aria-label={site.name}
          >
            <BrandMark className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
            <span className="text-sm font-bold tracking-[0.18em] uppercase sm:text-[15px]">
              {site.name}
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#pakalpojumi" className="hover:text-white">
              Pakalpojumi
            </a>
            <a href="#portfolio" className="hover:text-white">
              Portfolio
            </a>
            <a href="#par-mums" className="hover:text-white">
              Par mums
            </a>
            <a href="#atsauksmes" className="hover:text-white">
              Atsauksmes
            </a>
          </nav>
          <a
            href="#forma"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold !text-black transition hover:bg-zinc-100"
          >
            Sazināties
          </a>
        </div>
      </header>

      <section id="top" className="border-b border-white/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <p className="inline-flex rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white/80 uppercase">
              Bezmaksas piedāvājums
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Vajag jaunu mājaslapu biznesam?
            </h1>
            <p className="mt-5 text-lg text-white/70">
              Izveidosim to{" "}
              <span className="font-semibold text-[#5EEAD4]">ātri</span>,
              kvalitatīvi un pielāgotu jūsu prasībām — no €200.
            </p>
            <ul className="mt-8 space-y-3" id="pakalpojumi">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm sm:text-base"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5EEAD4]/15 text-[#5EEAD4]">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="forma">
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid max-w-5xl justify-items-center gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:py-16">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="w-full max-w-[220px] text-center">
              <Icon className="mx-auto mb-3 text-[#14B8A6]" size={28} />
              <p className="text-3xl font-bold tracking-tight text-[#0D9488] sm:text-4xl">
                {value}
              </p>
              <p className="mt-1 text-sm text-black/60">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            KĀ TAS STRĀDĀ?{" "}
            <span className="font-semibold text-black/70">Vienkārši 3 soļos</span>
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <div key={step.n} className="relative text-center">
                {i < steps.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute top-8 right-[-12%] hidden h-px w-[24%] bg-black/15 md:block"
                  />
                )}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-[#5EEAD4]">
                  <step.icon size={28} />
                </div>
                <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-[#0D9488]">
                  {step.n}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-black/60">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="atsauksmes" className="border-t border-black/5 bg-white text-black">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5">
              <GoogleMark className="h-4 w-4" />
              <span className="text-xs font-semibold tracking-wide text-black/70 uppercase">
                Google atsauksmes
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <p className="text-4xl font-bold tracking-tight text-[#0D9488]">4.9</p>
              <Stars />
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Ko saka klienti
            </h2>
            <p className="mt-2 max-w-md text-sm text-black/55">
              Klientu atsauksmes + saite uz mūsu Google profilu.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {googleReviews.map((review) => (
              <blockquote
                key={review.name}
                className="flex flex-col rounded-2xl border border-black/8 bg-[#FAFAFA] p-5 text-left"
              >
                <Stars />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-black/75">
                  “{review.text}”
                </p>
                <footer className="mt-4 flex items-center gap-2 border-t border-black/5 pt-4">
                  <GoogleMark className="h-4 w-4 shrink-0" />
                  <cite className="not-italic text-sm font-semibold text-black">
                    {review.name}
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:border-black/30 hover:bg-black/[0.03]"
            >
              <GoogleMark className="h-5 w-5" />
              Lasīt visas Google atsauksmes
            </a>
          </div>
        </div>
      </section>

      <section id="portfolio" className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-center text-xs font-semibold tracking-[0.22em] text-[#5EEAD4] uppercase">
            Portfolio
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Paskatieties mūsu darbus
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {portfolio.map((project) => (
              <div key={project.id} className="group">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111]">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                  </div>
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={project.image}
                      alt={project.id}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="max-w-none object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <a
              href={`${site.url}/work`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/30 px-6 py-3 text-sm font-medium transition hover:border-white hover:bg-white/5"
            >
              Apskatīt visu portfolio
            </a>
          </div>
        </div>
      </section>

      <section id="par-mums" className="bg-white text-black">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Gatavi jaunai mājaslapai vai sistēmai?
          </h2>
          <p className="mt-4 text-base text-black/60 sm:text-lg">
            Pastāstiet, kas vajadzīgs — iedosim skaidru cenu un termiņu bez
            maksas.
          </p>
          <a
            href="#forma"
            className="mt-8 inline-flex rounded-xl bg-[#5EEAD4] px-8 py-3.5 text-sm font-semibold !text-black transition hover:bg-[#7af0dc]"
          >
            Saņemt bezmaksas piedāvājumu
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-white/40 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} TavsWebs</p>
          <div className="flex gap-4">
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
            <a href={site.phoneHref} className="hover:text-white">
              {site.phone}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
