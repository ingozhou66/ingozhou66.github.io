import { useState, useEffect, useCallback } from 'react';

const GLYPHS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

interface CharacterScrambleProps {
  text: string;
  duration?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'span' | 'div';
}

export function CharacterScramble({
  text,
  duration = 800,
  className = '',
  as: Tag = 'h1',
}: CharacterScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);

  const scramble = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    const chars = text.split('');
    const totalSteps = Math.ceil(duration / 30);
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;

      const newText = chars
        .map((char, i) => {
          if (char === ' ') return ' ';
          // Characters resolve left to right based on progress
          const charProgress = i / chars.length;
          if (progress > charProgress + 0.3) {
            return char;
          }
          // Random glyph
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setDisplayText(newText);

      if (step >= totalSteps) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, duration, hasAnimated]);

  useEffect(() => {
    const timer = setTimeout(scramble, 400);
    return () => clearTimeout(timer);
  }, [scramble]);

  return (
    <Tag className={className}>
      {displayText}
    </Tag>
  );
}
