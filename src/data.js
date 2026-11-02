// ALL business details live here. Edit once, updates everywhere.
export const BUSINESS = {
  name: 'Vrudhhi’s Beauty Studio',
  phoneDisplay: '+91 94285 80830',
  waNumber: '919428580830',
  addressLines: ['Samnvay West Breeze,', '24 Meter Road, Gotri,', 'Vadodara, Gujarat 391101, India.'],
  hours: 'Monday–Sunday, 10:00 AM–7:30 PM',
};
export const waLink = (msg) => `https://wa.me/${BUSINESS.waNumber}?text=${encodeURIComponent(msg)}`;
export const DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent('Samnvay West Breeze, 24 Meter Road, Gotri, Vadodara, Gujarat 391101, India');
export const GENERAL_MSG = 'Hello Vrudhhi’s Beauty Studio! I would like to know more about your beauty services and appointments.';
export const BRIDAL_MSG = 'Hello Vrudhhi’s Beauty Studio! I would like to enquire about your bridal makeup services. Please share the details.';
export const serviceMsg = (s) => `Hello Vrudhhi’s Beauty Studio! I would like to enquire about ${s}. Please share the details.`;

// Set `image: '/images/yourfile.jpg'` to replace any illustrative placeholder with a real photo.
export const SERVICES = [
  { name: 'Bridal Makeup', tone: 0, image: '/images/bridal.webp', cta: 'Enquire about bridal makeup', desc: 'Elegant bridal makeup designed to complement your personal style and make your special moments unforgettable.' },
  { name: 'Hair Styling & Haircut', tone: 1, image: '/images/hair.webp', cta: 'Enquire about hair services', desc: 'Discover hairstyles and haircuts suited to your preferences, personality, and occasion.' },
  { name: 'Facial & Skincare', tone: 2, image: '/images/skincare.webp', cta: 'Enquire about skincare', desc: 'Explore facial and skincare services tailored to your beauty preferences and skincare needs.' },
  { name: 'Manicure & Pedicure', tone: 3, image: '/images/nails.webp', cta: 'Enquire about nail care', desc: 'Enjoy carefully styled nails and a refreshing manicure and pedicure experience.' },
  { name: 'Hair Colour & Hair Spa', tone: 4, image: '/images/haircolour.webp', cta: 'Enquire about hair colour', desc: 'Refresh your look with hair colour services and a relaxing hair spa experience.' },
  { name: 'Waxing & Threading', tone: 5, image: '/images/grooming.webp', cta: 'Enquire about grooming', desc: 'Explore personal grooming services designed for a neat, polished look.' },
];
export const GALLERY_CATEGORIES = ['All', 'Bridal Makeup', 'Hair Styling', 'Skincare', 'Nail Care', 'Hair Colour', 'Beauty Details'];
export const GALLERY = [
  ['Bridal Makeup', '/images/bridal.webp', 'Bride with gold jewellery, tikka and red bridal dupatta'],
  ['Hair Styling', '/images/hero.webp', 'Soft updo hairstyle in a bright beauty studio'],
  ['Hair Styling', '/images/hair.webp', 'Wavy half-up hairstyle with a floral hair clip'],
  ['Skincare', '/images/skincare.webp', 'Facial treatment with a soothing face mask'],
  ['Skincare', '/images/grooming.webp', 'Grooming facial with shaving cream'],
  ['Nail Care', '/images/nails.webp', 'Soft pink manicure with floral nail art'],
  ['Hair Colour', '/images/haircolour.webp', 'Rich burgundy and rose hair colour with soft waves'],
  ['Beauty Details', '/images/about.webp', 'Elegant blush and gold beauty studio interior'],
  ['Beauty Details', '/images/contact.webp', 'Fresh pink lilies beside a welcome card'],
].map(([category, f, alt], i) => ({ id: i, category, tone: i, image: f, alt: `${alt} (illustrative image)` }));
export const NAV = [['Home', '#home'], ['About', '#about'], ['Services', '#services'], ['Bridal Beauty', '#bridal'], ['Gallery', '#gallery'], ['Contact', '#contact']];
