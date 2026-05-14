import { useScrollPosition } from '@/hooks/useScrollPosition';

const navItems = [
  { id: 'hero', label: '首页' },
  { id: 'projects', label: '项目' },
  { id: 'tech-stack', label: '技术栈' },
];

interface NavigationProps {
  onOpenContact?: () => void;
}

export function Navigation({ onOpenContact }: NavigationProps) {
  const { scrollY, activeSection } = useScrollPosition();
  const isScrolled = scrollY > 100;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-mono text-sm font-medium text-txt-primary hover:text-gold transition-colors"
          >
            ingozhou
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-gold'
                    : 'text-txt-secondary hover:text-txt-primary'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold rounded-full" />
                )}
              </button>
            ))}

            {/* Contact button */}
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="ml-2 px-4 py-2 text-sm font-medium text-gold border border-gold/30 rounded-lg hover:bg-gold/10 transition-colors"
              >
                联系我
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
