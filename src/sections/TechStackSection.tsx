import {
  Layout,
  Server,
  Database,
  BarChart3,
  Wrench,
} from 'lucide-react';
import { techCategories } from '@/data/projects';
import { ScrollReveal } from '@/components/ScrollReveal';

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
};

export function TechStackSection() {
  return (
    <section id="tech-stack" className="py-24 md:py-32 border-t border-border">
      <div className="section-container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-0.5 bg-gold rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold text-txt-primary">
              技术栈
            </h2>
          </div>
          <p className="text-txt-secondary max-w-xl mb-12 ml-14">
            通过 AI 协作独立完成从产品设计、前端交互到后端服务的全栈交付
          </p>
        </ScrollReveal>

        {/* Tech Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techCategories.map((category, index) => (
            <ScrollReveal key={category.name} delay={index * 0.1}>
              <div className="group bg-surface border border-border rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-gold-border">
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold transition-colors group-hover:bg-gold/20">
                    {iconMap[category.icon]}
                  </div>
                  <h3 className="text-base font-semibold text-txt-primary">
                    {category.name}
                  </h3>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
