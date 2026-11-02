import { useState } from 'react';
import { SERVICES, waLink } from '../data.js';
const todayStr = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
const EMPTY = { name: '', mobile: '', service: '', date: '', time: '', message: '' };
const fmtDate = (s) => new Date(s + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
const fmtTime = (t) => { const [h, m] = t.split(':').map(Number); return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`; };
function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  const digits = v.mobile.replace(/[\s\-()]/g, '').replace(/^(\+?91|0)/, '');
  if (!/^[6-9]\d{9}$/.test(digits)) e.mobile = 'Enter a valid 10-digit Indian mobile number.';
  if (!v.service) e.service = 'Please select a service.';
  if (!v.date) e.date = 'Please choose a preferred date.';
  else if (v.date < todayStr()) e.date = 'Please choose today or a future date.';
  if (!v.time) e.time = 'Please choose a preferred time.';
  else if (v.time < '10:00' || v.time > '19:30') e.time = 'We are open 10:00 AM to 7:30 PM.';
  else if (v.date === todayStr()) { const n = new Date(); if (v.time < `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}`) e.time = 'Please choose a time later today.'; }
  return e;
}
export default function BookingForm({ presetService }) {
  const [v, setV] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [link, setLink] = useState('');
  const set = (k) => (e) => { setV({ ...v, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: undefined }); };
  const field = (k, label, input) => (
    <div className={`field ${err[k] ? 'field--bad' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>{input}
      {err[k] && <p className="field__err" id={`e-${k}`} role="alert">{err[k]}</p>}
    </div>);
  const aria = (k) => ({ id: `f-${k}`, 'aria-invalid': !!err[k], 'aria-describedby': err[k] ? `e-${k}` : undefined });
  const submit = (e) => {
    e.preventDefault();
    const x = validate(v); setErr(x);
    if (Object.keys(x).length) { document.getElementById(`f-${Object.keys(x)[0]}`)?.focus(); return; }
    const msg = `Hello Vrudhhi’s Beauty Studio!\n\nI would like to request an appointment.\n\nCustomer Name: ${v.name.trim()}\nMobile Number: ${v.mobile.trim()}\nSelected Service: ${v.service}\nPreferred Date: ${fmtDate(v.date)}\nPreferred Time: ${fmtTime(v.time)}\nAdditional Message: ${v.message.trim() || 'None'}\n\nPlease let me know if my preferred appointment slot is available.\n\nThank you!`;
    const url = waLink(msg); setLink(url);
    window.open(url, '_blank', 'noopener');
  };
  return (
    <form className="form" onSubmit={submit} noValidate>
      {field('name', 'Full Name', <input {...aria('name')} value={v.name} onChange={set('name')} autoComplete="name" />)}
      {field('mobile', 'Mobile Number', <input {...aria('mobile')} type="tel" inputMode="tel" value={v.mobile} onChange={set('mobile')} autoComplete="tel" placeholder="10-digit mobile number" />)}
      {field('service', 'Select Service', <select {...aria('service')} value={v.service || presetService || ''} onChange={set('service')}>
        <option value="">Choose a service</option>{SERVICES.map((s) => <option key={s.name}>{s.name}</option>)}</select>)}
      <div className="form__row">
        {field('date', 'Preferred Date', <input {...aria('date')} type="date" min={todayStr()} value={v.date} onChange={set('date')} />)}
        {field('time', 'Preferred Time', <input {...aria('time')} type="time" min="10:00" max="19:30" step="900" value={v.time} onChange={set('time')} />)}
      </div>
      {field('message', 'Additional Message (optional)', <textarea {...aria('message')} rows="3" value={v.message} onChange={set('message')} />)}
      <button className="btn btn--gold" type="submit">Send Enquiry on WhatsApp</button>
      {link && (
        <div className="notice" role="status">
          <p>Your appointment enquiry is ready in WhatsApp. Please send the message to complete your enquiry. Your appointment will be confirmed by the salon after availability is checked.</p>
          <a href={link} target="_blank" rel="noopener noreferrer">WhatsApp didn’t open? Tap here to open it.</a>
        </div>)}
    </form>
  );
}
