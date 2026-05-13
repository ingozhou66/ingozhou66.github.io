import { useState, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { ProjectsGrid } from '@/sections/ProjectsGrid';
import { TechStackSection } from '@/sections/TechStackSection';
import { FooterSection } from '@/sections/FooterSection';
import { IframePreviewModal } from '@/components/IframePreviewModal';
import { VideoGalleryModal } from '@/components/VideoGalleryModal';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'iframe' | 'video' | null>(null);

  const handleSelectProject = useCallback((projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    setActiveProject(project);
    setModalType(project.type);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    // Delay clearing project to allow exit animation
    setTimeout(() => {
      setActiveProject(null);
      setModalType(null);
    }, 400);
  }, []);

  return (
    <div className="min-h-screen bg-surface-primary">
      <Navigation />

      <main>
        <HeroSection />
        <ProjectsGrid onSelectProject={handleSelectProject} />
        <TechStackSection />
        <FooterSection />
      </main>

      {/* Iframe Preview Modal */}
      <IframePreviewModal
        project={modalType === 'iframe' ? activeProject : null}
        open={modalOpen && modalType === 'iframe'}
        onClose={handleCloseModal}
      />

      {/* Video Gallery Modal */}
      <VideoGalleryModal
        project={modalType === 'video' ? activeProject : null}
        open={modalOpen && modalType === 'video'}
        onClose={handleCloseModal}
      />
    </div>
  );
}
