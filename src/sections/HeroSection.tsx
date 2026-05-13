import { motion } from 'framer-motion';
import { Github, MessageSquare } from 'lucide-react';

const keywords = ['产品设计', 'AI 协作', '独立开发', '数据驱动'];

export function HeroSection() {
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
          {/* Name - simple fade in */}
          <motion.h1
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight text-txt-primary leading-[1.1]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            ingozhou
          </motion.h1>

          {/* Subtitle / positioning */}
          <motion.p
            className="mt-4 font-mono text-base md:text-lg text-txt-secondary"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            独立开发者 <span className="text-gold/60">·</span> AI 产品构建者{' '}
            <span className="text-gold/60">·</span> 前游戏策划
          </motion.p>

          {/* Bio */}
          <motion.p
            className="mt-6 text-base text-txt-secondary leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            曾在腾讯、星辉做了 5 年游戏系统策划，主导过龙石战争、战国野望等项目的核心系统从 0 到 1
            落地。现在借助 AI 工具，一个人完成从产品设计、交互体验到前后端开发的完整闭环。无论是项目合作还是工作机会，欢迎联系。
          </motion.p>

          {/* Keywords */}
          <motion.div
            className="mt-5 flex items-center gap-2 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
            className="mt-6 flex items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="https://github.com/ingozhou66"
              target="_blank"
              rel="noopener noreferrer"
              className="ghost-btn text-xs py-2 px-3"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-txt-secondary">
              <MessageSquare className="w-3.5 h-3.5 text-txt-muted" />
              <span className="font-mono text-xs">微信：inherentid（加好友请备注来源）</span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
