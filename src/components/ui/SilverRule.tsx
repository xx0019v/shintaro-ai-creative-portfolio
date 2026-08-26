interface Props { className?: string; vertical?: boolean }

export default function SilverRule({ className = "", vertical = false }: Props) {
  if (vertical) return <div className={`vrule-silver ${className}`} aria-hidden />;
  return <div className={`rule-silver ${className}`} aria-hidden />;
}
