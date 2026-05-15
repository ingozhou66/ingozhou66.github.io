import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const keywords = ['AI工作流搭建', '产品设计', '网页开发', '游戏设计'];

interface HeroSectionProps {
  onOpenContact?: () => void;
}

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[45vh] flex items-center overflow-hidden pt-16"
      style={{
        background:
          'radial-gradient(ellipse at 30% 20%, rgba(201,160,80,0.03) 0%, transparent 50%), #0a0a0f',
      }}
    >
      <div className="section-container py-16 md:py-20">
        <div className="max-w-3xl">
          {/* Avatar + Name row */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-6">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/touxiang.jpg"
                alt="ingozhou"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border border-gold/30"
              />
            </motion.div>

            {/* Name + Subtitle */}
            <div className="text-center md:text-left">
              <motion.h1
                className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight text-txt-primary leading-[1.1]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                ingozhou
              </motion.h1>

              <motion.p
                className="mt-2 font-mono text-base md:text-lg text-txt-secondary"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                独立开发者
              </motion.p>
            </div>
          </div>

          {/* Bio */}
          <motion.div
            className="mt-6 text-base text-txt-secondary leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>专注于 AI 工具与 AI × 硬件在生活场景中的落地，相信好的技术应该让人更自由。</p>
            <p className="mt-3">
              独立游戏因缺少美术合伙人暂时停滞，后续会在项目区更新进展并寻找志同道合的伙伴。
            </p>
          </motion.div>

          {/* Keywords */}
          <motion.div
            className="mt-5 flex items-center gap-2 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {keywords.map((kw, i) => (
              <span key={kw} className="flex items-center gap-2">
                <span className="font-mono text-xs text-txt-muted">{kw}</span>
                {i < keywords.length - 1 && (
                  <span className="text-gold/30 text-[10px]">·</span>
                )}
              </span>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div
            className="mt-6 flex items-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="gold-btn text-xs py-2 px-4"
              >
                <Mail className="w-3.5 h-3.5" />
                联系我
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
