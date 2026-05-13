import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { ScrollReveal } from '@/components/ScrollReveal';

interface ProjectsGridProps {
  onSelectProject: (projectId: string) => void;
}

export function ProjectsGrid({ onSelectProject }: ProjectsGridProps) {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="section-container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12">
            <span className="w-10 h-0.5 bg-gold rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold text-txt-primary">
              项目作品
            </h2>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onPreview={() => onSelectProject(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
