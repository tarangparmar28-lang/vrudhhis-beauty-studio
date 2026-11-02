import { useEffect, useState } from 'react';
import Photo from './Photo.jsx';
import BookingForm from './BookingForm.jsx';
import { BUSINESS, SERVICES, GALLERY, GALLERY_CATEGORIES, NAV, waLink, serviceMsg, DIRECTIONS, GENERAL_MSG, BRIDAL_MSG } from '../data.js';

const WaIcon = () => (<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 1.9 17.8L.5 23.5l5.8-1.5A11.8 11.8 0 0 0 12 23.5h0A11.8 11.8 0 0 0 20.5 3.5zM12 21.5a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.4.9.9-3.3-.2-.4A9.8 9.8 0 1 1 12 21.5zm5.4-7.3c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.1-.8.9-.9 1.1-.3.2-.6.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6a.6.6 0 0 0 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.3 3.3 0 0 0-1 2.4 5.7 5.7 0 0 0 1.2 3 13 13 0 0 0 5 4.4c1.8.8 2.5.8 3.4.7a2.8 2.8 0 0 0 1.9-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.2-.3-.2-.6-.4z" /></svg>);

const Head = ({ eyebrow, title, sub, center }) => (
  <div className={`head ${center ? 'head--center' : ''}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2>{title}</h2>{sub && <p className="head__sub">{sub}</p>}
  </div>);

const PETALS = Array.from({ length: 16 }, (_, i) => ({ l: (i * 37) % 100, s: 10 + (i * 7) % 14, d: (i * 1.7) % 9, t: 11 + (i * 3) % 8 }));
export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="petals" aria-hidden="true">{PETALS.map((p, i) => <span key={i} className="petal" style={{ left: `${p.l}%`, width: p.s, height: p.s, animationDelay: `-${p.d}s`, animationDuration: `${p.t}s` }} />)}</div>
      <div className="container hero__grid">
        <div className="hero__inner">
          <p className="eyebrow">Your beauty, our passion</p>
          <h1>Discover Your Most Beautiful Self</h1>
          <p className="hero__lead">Experience personalized beauty, expert care, and timeless elegance at Vrudhhi’s Beauty Studio in Vadodara.</p>
          <div className="hero__btns">
            <a className="btn btn--dark" href="#booking">Book Your Appointment</a>
            <a className="btn btn--ghost" href="#services">Explore Our Services</a>
          </div>
        </div>
        <div className="hero__arch"><Photo src="/images/hero.webp" tone={0} alt="Smiling woman with a soft updo in a bright blush beauty studio (illustrative image)" /><span className="hero__badge">Gotri, Vadodara</span></div>
      </div>
    </section>);
}

export function Marquee() {
  const t = SERVICES.map((s) => s.name).join('  ✦  ') + '  ✦  ';
  return <div className="marquee" aria-hidden="true"><div className="marquee__track"><span>{t}</span><span>{t}</span></div></div>;
}

export function About() {
  const feats = [['Personalized Care', 'Beauty services tailored to your preferences and occasion.'], ['Beauty & Elegance', 'Explore looks that complement your personality and style.'], ['Your Special Moments', 'Beauty services for everyday confidence and memorable occasions.']];
  return (
    <section id="about" className="section">
      <div className="container about">
        <Photo src="/images/about.webp" tone={2} className="about__img" alt="Elegant blush and gold beauty studio interior (illustrative image)" />
        <div>
          <Head eyebrow="Your personal beauty destination" title="Beauty Begins With You" />
          <p className="lead">Welcome to Vrudhhi’s Beauty Studio, your beauty destination in Gotri, Vadodara. We believe every individual deserves to feel confident, beautiful, and special. Explore our beauty services and discover an experience tailored to your personal style and preferences.</p>
          <div className="feats">{feats.map(([t, d]) => <article key={t} className="feat"><h3>{t}</h3><p>{d}</p></article>)}</div>
        </div>
      </div>
    </section>);
}

export function Services() {
  return (
    <section id="services" className="section section--blush">
      <div className="container">
        <Head center eyebrow="What we offer" title="Our Beauty Services" sub="Tap any service to start a WhatsApp enquiry. Please ask the studio about pricing and availability." />
        <div className="grid3">
          {SERVICES.map((s) => (
            <article className="card" key={s.name}>
              <Photo src={s.image} tone={s.tone} alt={`${s.name} (illustrative image)`} className="card__img" />
              <div className="card__body"><h3>{s.name}</h3><p>{s.desc}</p>
                <a className="btn btn--outline" target="_blank" rel="noopener noreferrer" href={waLink(serviceMsg(s.name))}>{s.cta}</a></div>
            </article>))}
        </div>
      </div>
    </section>);
}

export function Bridal() {
  return (
    <section id="bridal" className="bridal">
      <div className="container bridal__inner">
        <div className="bridal__text">
          <p className="eyebrow">Bridal beauty</p>
          <h2>Your Dream Look. Your Special Day.</h2>
          <p>Celebrate your special moments with a beauty look that reflects your personality, style, and vision.</p>
          <a className="btn btn--gold" target="_blank" rel="noopener noreferrer" href={waLink(BRIDAL_MSG)}>Enquire About Bridal Makeup</a>
        </div>
        <div className="bridal__imgs">
          <Photo src="/images/bridal.webp" tone={0} className="bridal__a" alt="Bride with gold jewellery and red bridal dupatta (illustrative image)" />
          <Photo src="/images/hair.webp" tone={4} className="bridal__b" alt="Wavy hairstyle with a floral hair clip (illustrative image)" />
        </div>
      </div>
    </section>);
}

export function Gallery() {
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(null);
  const items = GALLERY.filter((g) => cat === 'All' || g.category === cat);
  useEffect(() => {
    if (open === null) return;
    const k = (e) => { if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % items.length); if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + items.length) % items.length); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [open, items.length]);
  const cur = open !== null ? items[open] : null;
  return (
    <section id="gallery" className="section">
      <div className="container">
        <Head center eyebrow="Gallery" title="Beauty Inspiration" sub="Illustrative inspiration images. They are not the salon’s completed work." />
        <div className="filters" role="group" aria-label="Filter gallery">
          {GALLERY_CATEGORIES.map((c) => <button key={c} className={c === cat ? 'on' : ''} aria-pressed={c === cat} onClick={() => { setCat(c); setOpen(null); }}>{c}</button>)}
        </div>
        <div className="gallery">
          {items.map((g, i) => (
            <button key={g.id} className="gallery__item" onClick={() => setOpen(i)} aria-label={`View larger: ${g.alt}`}>
              <Photo src={g.image} tone={g.tone} alt={g.alt} label={g.category} />
            </button>))}
        </div>
      </div>
      {cur && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={cur.alt} onClick={() => setOpen(null)}>
          <button className="lightbox__x" aria-label="Close" onClick={() => setOpen(null)}>×</button>
          <div className="lightbox__img" onClick={(e) => e.stopPropagation()}><Photo src={cur.image} tone={cur.tone} alt={cur.alt} label={cur.category} /></div>
        </div>)}
    </section>);
}

export function Booking() {
  return (
    <section id="booking" className="section section--blush">
      <div className="container booking">
        <div>
          <Head eyebrow="Appointment enquiry" title="Book Your Appointment" sub="Fill in your details and we’ll prepare your enquiry in WhatsApp. Your appointment is confirmed only after the salon replies and checks availability." />
          <p className="small">Open daily, 10:00 AM to 7:30 PM.</p>
        </div>
        <BookingForm />
      </div>
    </section>);
}

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <Head center title="Let's Plan Your Beauty Experience" />
        <div className="contact">
          <article className="infocard">
            <h3>{BUSINESS.name}</h3>
            <address><strong>Address</strong><br />{BUSINESS.addressLines.map((l) => <span key={l}>{l}<br /></span>)}</address>
            <p><strong>WhatsApp</strong><br /><a href={waLink(GENERAL_MSG)} target="_blank" rel="noopener noreferrer">{BUSINESS.phoneDisplay}</a> · <a href={`tel:+${BUSINESS.waNumber}`}>Call</a></p>
            <p><strong>Business Hours</strong><br />Monday–Sunday<br />10:00 AM–7:30 PM</p>
            <div className="infocard__btns">
              <a className="btn btn--dark" href={DIRECTIONS} target="_blank" rel="noopener noreferrer">Get Directions</a>
              <a className="btn btn--outline" href="#booking">Appointment Enquiry</a>
            </div>
          </article>
          <Photo src="/images/contact.webp" tone={5} className="contact__img" alt="Fresh pink lilies beside a welcome card (illustrative image)" />
        </div>
      </div>
    </section>);
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div><p className="wordmark wordmark--light">Vrudhhi’s <em>Beauty Studio</em></p>
          <p>A beauty destination in Gotri, Vadodara, offering personalized beauty services for everyday confidence and special moments.</p>
          <p className="tagline">Feel Beautiful. Feel Confident. Be You.</p></div>
        <div><h4>Quick Links</h4>{NAV.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</div>
        <div><h4>Services</h4>{SERVICES.map((s) => <a key={s.name} href={waLink(serviceMsg(s.name))} target="_blank" rel="noopener noreferrer">{s.name}</a>)}</div>
        <div><h4>Visit Us</h4>
          <p>{BUSINESS.addressLines.join(' ')}</p>
          <p>Monday–Sunday<br />10:00 AM–7:30 PM</p>
          <a href={waLink(GENERAL_MSG)} target="_blank" rel="noopener noreferrer">WhatsApp {BUSINESS.phoneDisplay}</a></div>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
    </footer>);
}

export function WhatsAppFab() {
  return <a className="fab" href={waLink(GENERAL_MSG)} target="_blank" rel="noopener noreferrer" aria-label="Chat with Vrudhhi’s Beauty Studio on WhatsApp"><WaIcon /></a>;
}
