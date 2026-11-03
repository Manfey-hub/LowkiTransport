import React, { useEffect, useRef, useState } from "react";

const PHONE = "0481967216";
const EMAIL = "chrismanth3y@gmail.com";

const createMailto = (quote) => {
  const subject = encodeURIComponent(`Lowki Transport quote request — ${quote.loadType}`);
  const body = encodeURIComponent(
    `Quote request for Lowki Transport\\n\\nName: ${quote.name}\\nEmail: ${quote.email}\\nPhone: ${quote.phone}\\nPickup: ${quote.pickup}\\nDelivery: ${quote.delivery}\\nFreight type: ${quote.loadType}\\nDetails: ${quote.details}\\n\\nPlease contact me to discuss availability and pricing.`
  );
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
};

const serviceGroups = [
  {
    number: "01",
    title: "General freight",
    description: "Everyday commercial freight, palletised goods, parcels and scheduled deliveries.",
    tags: ["Commercial freight", "Parcels & pallets", "Local delivery"],
  },
  {
    number: "02",
    title: "Vehicles & marine",
    description: "Transport coordination for cars, motorcycles, boats and marine equipment through suitable specialist operators.",
    tags: ["Cars & motorcycles", "Boats", "Specialist carriers"],
  },
  {
    number: "03",
    title: "Heavy & oversized",
    description: "Planned movements for machinery, construction equipment and oversized loads, subject to route, permits and carrier capability.",
    tags: ["Machinery", "Oversized freight", "Route planning"],
  },
  {
    number: "04",
    title: "Interstate logistics",
    description: "Freight coordination between Victoria and other Australian states, with clear communication from pickup to delivery.",
    tags: ["Victoria", "Interstate", "Scheduled freight"],
  },
  {
    number: "05",
    title: "Business logistics",
    description: "Flexible transport support for businesses that need a dependable point of contact for their freight requirements.",
    tags: ["Business deliveries", "Repeat movements", "Freight coordination"],
  },
  {
    number: "06",
    title: "Specialist movements",
    description: "A pathway to specialist providers for unusual or complex consignments, subject to feasibility and compliance checks.",
    tags: ["Project freight", "Specialist operators", "Case-by-case planning"],
  },
];

const capabilityGroups = [
  { title: "General freight", items: ["Vans & courier vehicles", "Rigid trucks", "Curtain-siders", "Pantech trucks", "Tray trucks"] },
  { title: "Heavy haulage", items: ["Flatbed trailers", "Drop-deck trailers", "Prime mover combinations", "B-double combinations*"] },
  { title: "Specialised", items: ["Tilt-tray transport", "Low-loader transport", "Vehicle transport", "Boat transport trailers"] },
];

export default function LowkiSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState("idle");
  const [quoteMailto, setQuoteMailto] = useState("");
  const menuTriggerRef = useRef(null);
  const menuPanelRef = useRef(null);
  const [quote, setQuote] = useState({ name: "", email: "", phone: "", pickup: "", delivery: "", loadType: "General freight", details: "" });

  const updateQuote = (event) => setQuote((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submitQuote = async (event) => {
    event.preventDefault();
    setQuoteStatus("sending");
    setQuoteMailto("");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quote),
      });
      if (!response.ok) throw new Error("Quote service unavailable");
      setQuoteStatus("sent");
    } catch {
      setQuoteMailto(createMailto(quote));
      setQuoteStatus("fallback");
    }
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = menuPanelRef.current;
    const focusable = () => panel?.querySelectorAll("a[href], button:not([disabled])") ?? [];
    focusable()[0]?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
      }
      if (event.key === "Tab") {
        const items = [...focusable()];
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      menuTriggerRef.current?.focus();
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[#08090b] text-slate-100 antialiased selection:bg-red-600 selection:text-white">
      <div className="border-b border-white/10 bg-[#111216]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs tracking-wide text-slate-400 sm:px-8">
          <span>Melbourne, Victoria · Transport & logistics</span>
          <a href={`tel:${PHONE}`} className="hidden transition hover:text-white sm:inline">Call {PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="transition hover:text-red-400 sm:hidden">Email Lowki</a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08090b]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#home" className="group flex items-center gap-3" aria-label="Lowki Transport home">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-500/50 bg-red-600 text-lg font-black italic tracking-tighter text-white shadow-lg shadow-red-950/40">L</div>
            <div className="leading-none">
              <div className="text-xl font-black tracking-[0.16em] text-white">LOWKI</div>
              <div className="mt-1 text-[10px] font-bold tracking-[0.36em] text-red-500">TRANSPORT</div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 lg:flex">
            <a className="transition hover:text-red-400" href="#services">Services</a>
            <a className="transition hover:text-red-400" href="#capabilities">Capabilities</a>
            <a className="transition hover:text-red-400" href="#approach">Our approach</a>
            <a className="transition hover:text-red-400" href="#about">About</a>
            <a href="#quote" className="rounded-md bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-500">Request a quote <span aria-hidden="true">↗</span></a>
          </nav>

          <button ref={menuTriggerRef} onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen} className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-2xl transition hover:border-red-500 hover:text-red-400 lg:hidden">☰</button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm" onClick={closeMenu}>
          <aside ref={menuPanelRef} role="dialog" aria-modal="true" aria-label="Navigation menu" tabIndex={-1} className="ml-auto flex h-full w-[min(88vw,390px)] flex-col border-l border-red-900/60 bg-[#101014] p-6 shadow-2xl shadow-black" onClick={(event) => event.stopPropagation()}>
            <div className="mb-10 flex items-center justify-between">
              <div className="leading-none"><div className="text-xl font-black tracking-[0.16em]">LOWKI</div><div className="mt-1 text-[10px] font-bold tracking-[0.36em] text-red-500">TRANSPORT</div></div>
              <button onClick={closeMenu} aria-label="Close navigation menu" className="rounded-md px-3 py-1 text-4xl text-slate-300 transition hover:text-red-400">×</button>
            </div>
            <nav className="space-y-1 text-lg font-semibold">
              {[["Home", "#home"], ["Services", "#services"], ["Capabilities", "#capabilities"], ["Our approach", "#approach"], ["About Lowki", "#about"], ["Request a quote", "#quote"], ["Contact", "#contact"]].map(([label, href]) => (
                <a key={href} href={href} onClick={closeMenu} className="block border-b border-white/10 py-4 transition hover:translate-x-1 hover:text-red-400">{label}<span className="float-right text-red-500">↗</span></a>
              ))}
            </nav>
            <div className="mt-auto space-y-3 pt-8">
              <a href={`tel:${PHONE}`} className="block rounded-md bg-red-600 px-4 py-4 text-center font-bold text-white transition hover:bg-red-500">Call {PHONE}</a>
              <a href={`mailto:${EMAIL}`} className="block rounded-md border border-white/15 px-4 py-4 text-center font-semibold transition hover:border-red-500">Email Lowki</a>
            </div>
          </aside>
        </div>
      )}

      <main>
        <section id="home" className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,rgba(190,18,36,0.22),transparent_42%),linear-gradient(135deg,#111216_0%,#08090b_58%,#16090b_100%)]" />
          <div className="absolute -right-28 top-20 -z-10 h-80 w-80 rounded-full border border-red-500/10 sm:h-[30rem] sm:w-[30rem]" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.12fr_.88fr] lg:gap-16 lg:py-32">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-300"><span className="h-2 w-2 rounded-full bg-red-500" /> Transport. Logistics. Connected.</div>
              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">One trusted name.<br /><span className="text-red-500">More ways to move.</span></h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Lowki Transport is a Melbourne-based transport coordination business connecting customers with suitable operators for freight across Victoria and interstate. We help assess the load, route and timing, then discuss options and availability—from general commercial freight to vehicles, boats, machinery and specialist consignments.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#quote" className="inline-flex items-center justify-center gap-3 rounded-md bg-red-600 px-6 py-4 font-bold text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-red-500">Request a transport quote <span>↗</span></a>
                <a href="#services" className="inline-flex items-center justify-center gap-3 rounded-md border border-white/20 px-6 py-4 font-semibold text-white transition hover:border-red-500 hover:text-red-300">Explore our services <span>↓</span></a>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div><div className="text-sm font-bold text-white">One contact</div><div className="mt-1 text-xs leading-5 text-slate-500">For your freight needs</div></div>
                <div><div className="text-sm font-bold text-white">Flexible network</div><div className="mt-1 text-xs leading-5 text-slate-500">Matched to each job</div></div>
                <div><div className="text-sm font-bold text-white">Clear updates</div><div className="mt-1 text-xs leading-5 text-slate-500">From enquiry onward</div></div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl border border-red-500/20" />
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#121319] p-6 shadow-2xl shadow-black/50 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div><div className="text-xs font-bold uppercase tracking-[0.22em] text-red-400">Start a conversation</div><h2 className="mt-2 text-2xl font-bold text-white">What do you need moved?</h2><p className="mt-2 text-sm leading-6 text-slate-400">Tell us the basics. We’ll use your enquiry to discuss options and availability.</p></div>
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-600/15 text-2xl text-red-400 sm:flex">↗</div>
                </div>
                <form onSubmit={submitQuote} className="mt-7 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-xs font-semibold text-slate-400">Name *<input required name="name" value={quote.name} onChange={updateQuote} autoComplete="name" placeholder="Your name" className="mt-2 w-full rounded-md border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-500" /></label>
                    <label className="block text-xs font-semibold text-slate-400">Email *<input required type="email" name="email" value={quote.email} onChange={updateQuote} autoComplete="email" placeholder="you@example.com" className="mt-2 w-full rounded-md border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-500" /></label>
                    <label className="block text-xs font-semibold text-slate-400">Pickup location *<input required name="pickup" value={quote.pickup} onChange={updateQuote} placeholder="Suburb, state or postcode" className="mt-2 w-full rounded-md border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-500" /></label>
                    <label className="block text-xs font-semibold text-slate-400">Delivery location *<input required name="delivery" value={quote.delivery} onChange={updateQuote} placeholder="Suburb, state or postcode" className="mt-2 w-full rounded-md border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-500" /></label>
                  </div>
                  <label className="block text-xs font-semibold text-slate-400">What are you transporting?
                    <select name="loadType" value={quote.loadType} onChange={updateQuote} className="mt-2 w-full rounded-md border border-white/10 bg-[#1b1c22] px-3 py-3 text-sm text-white outline-none focus:border-red-500">
                      {["General freight", "Parcel or small delivery", "Palletised freight", "Vehicle", "Boat or marine equipment", "Machinery or oversized load", "Interstate freight", "Other / specialist request"].map((type) => <option key={type}>{type}</option>)}
                    </select>
                  </label>
                  <button type="submit" disabled={quoteStatus === "sending"} className="flex w-full items-center justify-center gap-3 rounded-md bg-red-600 px-5 py-4 font-bold text-white transition hover:bg-red-500 disabled:cursor-wait disabled:opacity-70">{quoteStatus === "sending" ? "Sending enquiry…" : "Send quote enquiry"} <span aria-hidden="true">↗</span></button>
                  <p role="status" aria-live="polite" className="text-center text-xs leading-5 text-slate-400">{quoteStatus === "sending" && "Sending your enquiry…"}{quoteStatus === "sent" && "Thanks — your enquiry has been sent. Lowki will follow up to discuss availability and pricing."}{quoteStatus === "fallback" && <>The online form could not send your enquiry. <a className="font-semibold text-red-400 underline" href={quoteMailto}>Open a prepared email instead</a>.</>}</p>
                  <p className="text-center text-xs leading-5 text-slate-500">Your enquiry is not a confirmed quote or booking. Availability, pricing and terms are confirmed with you before a movement proceeds.</p>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><div className="text-xs font-bold uppercase tracking-[0.24em] text-red-500">What we can help move</div><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Transport solutions, <span className="text-slate-500">built around the job.</span></h2></div>
            <p className="max-w-xl text-sm leading-7 text-slate-400">Every load has different requirements. We work to understand the consignment, route, timing and handling needs before discussing the right transport option.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {serviceGroups.map((service) => (
              <article key={service.number} className="group rounded-xl border border-white/10 bg-[#111216] p-6 transition duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:bg-[#15151a] hover:shadow-xl hover:shadow-red-950/10 sm:p-7">
                <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.2em] text-red-500">{service.number}</span><span className="text-xl text-slate-600 transition group-hover:translate-x-1 group-hover:text-red-400">↗</span></div>
                <h3 className="mt-6 text-xl font-bold text-white">{service.title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">{service.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{service.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-slate-400">{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="capabilities" className="border-y border-white/10 bg-[#0d0e12]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="max-w-3xl"><div className="text-xs font-bold uppercase tracking-[0.24em] text-red-500">Network & capability</div><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">The right equipment for the right load.</h2><p className="mt-5 leading-7 text-slate-400">Lowki coordinates transport through suitable operators based on each job. The equipment below describes capabilities we may be able to arrange; it does not promise owned equipment or guaranteed availability.</p></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {capabilityGroups.map((group, index) => (
                <div key={group.title} className="rounded-xl border border-white/10 bg-[#111216] p-6 transition duration-300 hover:border-red-500/40">
                  <div className="mb-5 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-red-600/15 text-sm font-black text-red-400">0{index + 1}</span><h3 className="text-lg font-bold text-white">{group.title}</h3></div>
                  <ul className="space-y-3">{group.items.map((item) => <li key={item} className="flex items-start gap-3 text-sm text-slate-300"><span className="mt-0.5 text-red-500">↗</span>{item}</li>)}</ul>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-500">*Higher-capacity combinations and specialised movements are subject to operator availability, permits, route assessment and applicable regulations.</p>
          </div>
        </section>

        <section id="approach" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
            <div><div className="text-xs font-bold uppercase tracking-[0.24em] text-red-500">A simpler way to move freight</div><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">One point of contact.<br /><span className="text-slate-500">A network of solutions.</span></h2><p className="mt-5 leading-7 text-slate-400">Our long-term ambition is to make Lowki a trusted first call for transport requirements of all sizes. We’re building step by step—prioritising communication, careful planning and dependable partners.</p><a href="#quote" className="mt-7 inline-flex items-center gap-3 font-bold text-red-400 transition hover:text-red-300">Discuss your transport needs <span>→</span></a></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[["01", "Understand the job", "We start with the load, pickup and delivery points, timing and any special handling needs."], ["02", "Plan the movement", "We assess the requirements and discuss suitable transport options and any constraints."], ["03", "Confirm the details", "Availability, responsibilities, pricing and terms are agreed before a job proceeds."], ["04", "Keep communication clear", "We aim to provide straightforward updates and a clear contact point throughout the movement."]].map(([number, title, description]) => (
                <div key={number} className="rounded-lg border border-white/10 p-5"><div className="text-xs font-bold tracking-[0.2em] text-red-500">{number}</div><h3 className="mt-4 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-white/10 bg-[#111216]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:py-20">
            <div><div className="text-xs font-bold uppercase tracking-[0.24em] text-red-500">About Lowki</div><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">Building a bigger vision for Australian transport.</h2><p className="mt-5 max-w-3xl leading-7 text-slate-400">Lowki Transport is a Melbourne-based transport coordination business building relationships with independent operators. We help customers discuss suitable transport options; the carrier, scope, availability, responsibilities and terms are confirmed for each movement before a job proceeds.</p></div>
            <div className="rounded-xl border border-red-500/30 bg-black/30 p-6 lg:min-w-[240px]"><div className="text-2xl font-black tracking-tight text-white">LOWKI <span className="text-red-500">TRANSPORT</span></div><div className="mt-2 text-sm font-semibold text-slate-400">Connected transport. Clear communication.</div><div className="mt-5 h-1 w-16 rounded-full bg-red-600" /></div>
          </div>
        </section>

        <section id="quote" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div><div className="text-xs font-bold uppercase tracking-[0.24em] text-red-500">Let’s get moving</div><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Tell us what you need transported.</h2><p className="mt-5 leading-7 text-slate-400">Share the details and we’ll use them to start a conversation about the right transport option. Complex, oversized or unusual loads may need additional information before feasibility and pricing can be confirmed.</p><div className="mt-8 space-y-4 text-sm"><a href={`tel:${PHONE}`} className="flex items-center gap-4 rounded-lg border border-white/10 p-4 transition hover:border-red-500/50"><span className="flex h-10 w-10 items-center justify-center rounded-md bg-red-600/15 text-red-400">☎</span><span><span className="block text-xs text-slate-500">Call Lowki</span><span className="mt-1 block font-semibold text-white">{PHONE}</span></span></a><a href={`mailto:${EMAIL}`} className="flex items-center gap-4 rounded-lg border border-white/10 p-4 transition hover:border-red-500/50"><span className="flex h-10 w-10 items-center justify-center rounded-md bg-red-600/15 text-red-400">✉</span><span><span className="block text-xs text-slate-500">Email enquiries</span><span className="mt-1 block break-all font-semibold text-white">{EMAIL}</span></span></a></div></div>
            <form onSubmit={submitQuote} className="rounded-xl border border-white/10 bg-[#111216] p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white">Request a quote</h3><p className="mt-2 text-sm text-slate-400">Fields marked * are required.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-semibold text-slate-400">Name *<input required name="name" value={quote.name} onChange={updateQuote} autoComplete="name" className="mt-2 w-full rounded-md border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-red-500" placeholder="Your name" /></label>
                <label className="text-xs font-semibold text-slate-400">Email *<input required type="email" name="email" value={quote.email} onChange={updateQuote} autoComplete="email" className="mt-2 w-full rounded-md border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-red-500" placeholder="you@example.com" /></label>
                <label className="text-xs font-semibold text-slate-400">Phone<input name="phone" value={quote.phone} onChange={updateQuote} autoComplete="tel" className="mt-2 w-full rounded-md border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-red-500" placeholder="Your contact number" /></label>
                <label className="text-xs font-semibold text-slate-400">Freight type
                  <select name="loadType" value={quote.loadType} onChange={updateQuote} className="mt-2 w-full rounded-md border border-white/10 bg-[#1b1c22] px-3 py-3 text-sm text-white outline-none focus:border-red-500">{["General freight", "Parcel or small delivery", "Palletised freight", "Vehicle", "Boat or marine equipment", "Machinery or oversized load", "Interstate freight", "Other / specialist request"].map((type) => <option key={type}>{type}</option>)}</select>
                </label>
                <label className="text-xs font-semibold text-slate-400">Pickup location *<input required name="pickup" value={quote.pickup} onChange={updateQuote} className="mt-2 w-full rounded-md border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-red-500" placeholder="Pickup suburb / postcode" /></label>
                <label className="text-xs font-semibold text-slate-400">Delivery location *<input required name="delivery" value={quote.delivery} onChange={updateQuote} className="mt-2 w-full rounded-md border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-red-500" placeholder="Delivery suburb / postcode" /></label>
                <label className="text-xs font-semibold text-slate-400 sm:col-span-2">Load details<textarea name="details" value={quote.details} onChange={updateQuote} rows={4} className="mt-2 w-full resize-y rounded-md border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-red-500" placeholder="Dimensions, weight, timing, access or handling requirements…" /></label>
              </div>
              <button type="submit" disabled={quoteStatus === "sending"} className="mt-5 flex w-full items-center justify-center gap-3 rounded-md bg-red-600 px-5 py-4 font-bold text-white transition hover:bg-red-500 disabled:cursor-wait disabled:opacity-70">{quoteStatus === "sending" ? "Sending enquiry…" : "Send quote enquiry"} <span aria-hidden="true">↗</span></button>
              <p role="status" aria-live="polite" className="mt-3 text-center text-xs leading-5 text-slate-400">{quoteStatus === "sending" && "Sending your enquiry…"}{quoteStatus === "sent" && "Thanks — your enquiry has been sent. Lowki will follow up to discuss availability and pricing."}{quoteStatus === "fallback" && <>The online form could not send your enquiry. <a className="font-semibold text-red-400 underline" href={quoteMailto}>Open a prepared email instead</a>.</>}</p>
              <p className="mt-3 text-xs leading-5 text-slate-500">Your enquiry is not a confirmed quote or booking. Availability, pricing and terms are confirmed with you before a movement proceeds.</p>
            </form>
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 bg-[#111216]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div><div className="font-black tracking-[0.16em] text-white">LOWKI <span className="text-red-500">TRANSPORT</span></div><p className="mt-2 text-sm text-slate-500">Melbourne, Victoria · Enquiries for Victoria and interstate movements</p></div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400"><a href="#services" className="hover:text-red-400">Services</a><a href="#capabilities" className="hover:text-red-400">Capabilities</a><a href={`mailto:${EMAIL}`} className="hover:text-red-400">Email</a><a href={`tel:${PHONE}`} className="hover:text-red-400">Call</a></div>
          </div>
          <div className="border-t border-white/5"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 text-xs text-slate-600 sm:px-8 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} Lowki Transport. All rights reserved.</span><span>Transport availability and service scope confirmed per enquiry.</span></div></div>
        </section>
      </main>
    </div>
  );
}
