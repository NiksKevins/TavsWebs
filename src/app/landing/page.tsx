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

      <section id="atsauksmes" className="bg-white text-black">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:py-16">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center lg:text-left">
              <Icon className="mx-auto mb-3 text-[#14B8A6] lg:mx-0" size={28} />
              <p className="text-3xl font-bold tracking-tight text-[#0D9488] sm:text-4xl">
                {value}
              </p>
              <p className="mt-1 text-sm text-black/60">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            KĀ TAS STRĀDĀ?{" "}
            <span className="font-semibold text-black/70">Vienkārši 3 soļos</span>
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
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
                <p className="mt-2 text-sm leading-relaxed text-black/60">
                  {step.text}
                </p>
              </div>
            ))}
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
