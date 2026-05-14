import { Github, ArrowUp, MessageSquare, Mail } from 'lucide-react';

const navLinks = [
  { id: 'projects', label: '项目' },
  { id: 'tech-stack', label: '技术栈' },
  { id: 'hero', label: '顶部' },
];

export function FooterSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="footer"
      className="border-t border-border bg-surface py-12 md:py-16"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left: Brand */}
          <div>
            <h3 className="font-mono text-lg font-semibold text-txt-primary">
              ingozhou
            </h3>
            <p className="mt-2 text-sm text-txt-secondary">
              独立开发者 · AI 产品构建者
            </p>
            <p className="mt-4 text-xs text-txt-muted font-mono">
              前腾讯游戏策划 → AI 辅助独立开发
            </p>
          </div>

          {/* Center: Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-txt-primary mb-4">
              导航
            </h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm text-txt-secondary hover:text-gold transition-colors text-left w-fit"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Contact */}
          <div>
            <h4 className="text-sm font-semibold text-txt-primary mb-4">
              联系方式
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/ingozhou66"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-txt-secondary hover:text-gold transition-colors w-fit"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <span className="inline-flex items-center gap-2 text-sm text-txt-secondary w-fit">
                <MessageSquare className="w-4 h-4 text-txt-muted" />
                微信：inherentid
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-txt-secondary w-fit">
                <Mail className="w-4 h-4 text-txt-muted" />
                ingozhou@gmail.com
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-txt-muted font-mono">
            &copy; {new Date().getFullYear()} — Designed and built by hand
          </p>

          <button
            onClick={() => scrollTo('hero')}
            className="ghost-btn p-2"
            title="回到顶部"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
