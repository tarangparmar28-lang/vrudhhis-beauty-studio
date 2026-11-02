// Shows a photo from /public/images. An empty slot shows a plain blush frame.
export default function Photo({ src, alt, label, className = '' }) {
  if (!src) return <div className={`photo photo--blank ${className}`} role="img" aria-label={alt} />;
  return <img className={`photo ${className}`} src={src} alt={alt} loading={className.includes('hero') ? 'eager' : 'lazy'} decoding="async" />;
}
