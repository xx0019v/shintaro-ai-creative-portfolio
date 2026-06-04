interface GoldRuleProps {
  className?: string;
  vertical?: boolean;
}

export default function GoldRule({ className = "", vertical = false }: GoldRuleProps) {
  if (vertical) {
    return <div className={`gold-vrule ${className}`} aria-hidden />;
  }
  return <div className={`gold-rule ${className}`} aria-hidden />;
}
