import { useEffect, useState } from 'react';
import { NAV } from '../data.js';
export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 20);
    f(); window.addEventListener('scroll', f, { passive: true });
    const k = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('keydown', k); };
  }, []);
  return (
    <header className={`header ${solid || open ? 'header--solid' : ''}`}>
      <div className="container header__bar">
        <a href="#home" className="wordmark" onClick={() => setOpen(false)}>Vrudhhi’s <em>Beauty Studio</em></a>
        <nav id="nav" className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          <a className="btn btn--dark nav__cta" href="#booking" onClick={() => setOpen(false)}>Book Appointment</a>
        </nav>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
