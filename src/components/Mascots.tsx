import React from 'react';
import { CharacterId, MascotMood } from '../types/grammar';

interface MascotAvatarProps {
  character: CharacterId;
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
};

export const MascotAvatar: React.FC<MascotAvatarProps> = ({
  character,
  mood = 'happy',
  size = 'md',
  className = '',
}) => {
  const sizeClass = SIZE_MAP[size];

  const renderEyes = () => {
    if (mood === 'cheer') {
      return (
        <>
          <path d="M35 50 Q39 45 43 50" stroke="#3B2F2F" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M57 50 Q61 45 65 50" stroke="#3B2F2F" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      );
    }
    if (mood === 'comfort') {
      return (
        <>
          <circle cx="39" cy="51" r="3.4" fill="#3B2F2F" />
          <circle cx="61" cy="51" r="3.4" fill="#3B2F2F" />
          <circle cx="38" cy="49.8" r="1.2" fill="#FFFFFF" />
          <circle cx="60" cy="49.8" r="1.2" fill="#FFFFFF" />
          <path d="M34 44 L42 46" stroke="#3B2F2F" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M66 44 L58 46" stroke="#3B2F2F" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="34" cy="56" rx="2.3" ry="3.2" fill="#93C5FD" />
        </>
      );
    }
    if (mood === 'surprised') {
      return (
        <>
          <circle cx="39" cy="50" r="4" fill="#3B2F2F" />
          <circle cx="61" cy="50" r="4" fill="#3B2F2F" />
          <circle cx="37.8" cy="48.5" r="1.5" fill="#FFFFFF" />
          <circle cx="59.8" cy="48.5" r="1.5" fill="#FFFFFF" />
        </>
      );
    }
    return (
      <>
        <circle cx="39" cy="50" r="3.5" fill="#3B2F2F" />
        <circle cx="61" cy="50" r="3.5" fill="#3B2F2F" />
        <circle cx="37.8" cy="48.7" r="1.2" fill="#FFFFFF" />
        <circle cx="59.8" cy="48.7" r="1.2" fill="#FFFFFF" />
        {mood === 'study' && (
          <>
            <circle cx="39" cy="50" r="7.5" stroke="#FB7185" strokeWidth="2" fill="none" />
            <circle cx="61" cy="50" r="7.5" stroke="#FB7185" strokeWidth="2" fill="none" />
            <line x1="46.5" y1="50" x2="53.5" y2="50" stroke="#FB7185" strokeWidth="2" />
          </>
        )}
      </>
    );
  };

  const renderMouth = () => {
    if (mood === 'surprised') {
      return <ellipse cx="50" cy="58" rx="3.2" ry="4" fill="#FB7185" stroke="#3B2F2F" strokeWidth="2.2" />;
    }
    if (mood === 'comfort') {
      return <path d="M45 59 Q50 55 55 59" stroke="#3B2F2F" strokeWidth="2.4" strokeLinecap="round" fill="none" />;
    }
    // Classic Chiikawa ω cat/hamster mouth
    return (
      <path
        d="M44 56 Q47 60 50 56 Q53 60 56 56"
        stroke="#3B2F2F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    );
  };

  if (character === 'chii') {
    // Chii: Soft pure white marshmallow hamster/bear with round ears & pink sasumata wand
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${sizeClass} shrink-0 select-none ${className}`}
        aria-label="치이 캐릭터"
      >
        {/* Background soft halo */}
        <circle cx="50" cy="52" r="44" fill="#FFF0F5" />
        {/* Round Bear/Hamster Ears */}
        <circle cx="29" cy="27" r="11" fill="#FFFFFF" stroke="#3B2F2F" strokeWidth="3" />
        <circle cx="29" cy="27" r="5.5" fill="#FFD6E4" />
        <circle cx="71" cy="27" r="11" fill="#FFFFFF" stroke="#3B2F2F" strokeWidth="3" />
        <circle cx="71" cy="27" r="5.5" fill="#FFD6E4" />
        {/* Marshmallow Head & Body */}
        <ellipse cx="50" cy="56" rx="32" ry="29" fill="#FFFFFF" stroke="#3B2F2F" strokeWidth="3" />
        {/* Cute rosy cheeks with hand-drawn hatch lines */}
        <ellipse cx="29" cy="56" rx="6.5" ry="4" fill="#FFB3C6" opacity="0.85" />
        <ellipse cx="71" cy="56" rx="6.5" ry="4" fill="#FFB3C6" opacity="0.85" />
        <line x1="27" y1="55" x2="29" y2="57" stroke="#F43F5E" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="30" y1="55" x2="32" y2="57" stroke="#F43F5E" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="68" y1="55" x2="70" y2="57" stroke="#F43F5E" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="71" y1="55" x2="73" y2="57" stroke="#F43F5E" strokeWidth="1.3" strokeLinecap="round" />
        {/* Tiny eyebrows */}
        {mood !== 'comfort' && (
          <>
            <path d="M36 42 Q39 40 42 42" stroke="#3B2F2F" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M58 42 Q61 40 64 42" stroke="#3B2F2F" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </>
        )}
        {renderEyes()}
        {renderMouth()}
        {/* Little paws */}
        <ellipse cx="26" cy="70" rx="6" ry="4.5" fill="#FFFFFF" stroke="#3B2F2F" strokeWidth="2.6" />
        <ellipse cx="74" cy="70" rx="6" ry="4.5" fill="#FFFFFF" stroke="#3B2F2F" strokeWidth="2.6" />
        {/* Pink Sasumata (문법봉) */}
        <line x1="81" y1="78" x2="86" y2="48" stroke="#FB7185" strokeWidth="3.2" strokeLinecap="round" />
        <path
          d="M81 49 Q86 54 92 50"
          stroke="#FB7185"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  if (character === 'hachi') {
    // Hachi: Cute cat-eared friend with sky-blue parted bangs & ear tips
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${sizeClass} shrink-0 select-none ${className}`}
        aria-label="하치 캐릭터"
      >
        <circle cx="50" cy="52" r="44" fill="#EFF8FF" />
        {/* Pointy Cat Ears */}
        <polygon points="22,38 28,15 42,29" fill="#7DD3FC" stroke="#3B2F2F" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="78,38 72,15 58,29" fill="#7DD3FC" stroke="#3B2F2F" strokeWidth="3" strokeLinejoin="round" />
        {/* Round Head */}
        <ellipse cx="50" cy="56" rx="32" ry="29" fill="#FFFFFF" stroke="#3B2F2F" strokeWidth="3" />
        {/* Hachi's Iconic Sky-Blue Parted Bangs */}
        <path
          d="M21 46 C26 27, 45 27, 50 37 C55 27, 74 27, 79 46 C70 39, 57 38, 50 32 C43 38, 30 39, 21 46 Z"
          fill="#7DD3FC"
          stroke="#3B2F2F"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        {/* Cheeks */}
        <ellipse cx="29" cy="56" rx="6" ry="3.8" fill="#FFB3C6" opacity="0.85" />
        <ellipse cx="71" cy="56" rx="6" ry="3.8" fill="#FFB3C6" opacity="0.85" />
        {renderEyes()}
        {renderMouth()}
        {/* Little Fang smile hint when happy/cheer */}
        {(mood === 'happy' || mood === 'cheer') && (
          <polygon points="53,58 55,62 57,58" fill="#FFFFFF" stroke="#3B2F2F" strokeWidth="1.4" />
        )}
        {/* Paws holding tiny pencil */}
        <ellipse cx="27" cy="71" rx="6" ry="4.5" fill="#FFFFFF" stroke="#3B2F2F" strokeWidth="2.6" />
        <ellipse cx="73" cy="71" rx="6" ry="4.5" fill="#FFFFFF" stroke="#3B2F2F" strokeWidth="2.6" />
        <line x1="17" y1="63" x2="29" y2="75" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="15,61 19,62 16,65" fill="#3B2F2F" />
      </svg>
    );
  }

  // Usagi: Energetic pastel creamy-yellow bunny with tall ears!
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeClass} shrink-0 select-none ${className}`}
      aria-label="우사기 캐릭터"
    >
      <circle cx="50" cy="54" r="43" fill="#FEF9C3" />
      {/* Tall Bunny Ears */}
      <ellipse cx="38" cy="21" rx="6.8" ry="17" fill="#FEF08A" stroke="#3B2F2F" strokeWidth="3" />
      <ellipse cx="38" cy="21" rx="3" ry="10" fill="#FBCFE8" />
      <ellipse cx="62" cy="21" rx="6.8" ry="17" fill="#FEF08A" stroke="#3B2F2F" strokeWidth="3" />
      <ellipse cx="62" cy="21" rx="3" ry="10" fill="#FBCFE8" />
      {/* Bunny Head */}
      <ellipse cx="50" cy="59" rx="31" ry="27" fill="#FEF08A" stroke="#3B2F2F" strokeWidth="3" />
      {/* Rosy Cheeks */}
      <ellipse cx="29" cy="59" rx="6.2" ry="3.8" fill="#FDA4AF" opacity="0.9" />
      <ellipse cx="71" cy="59" rx="6.2" ry="3.8" fill="#FDA4AF" opacity="0.9" />
      {/* Eyes shifted slightly down for bunny proportions */}
      <g transform="translate(0, 3)">
        {renderEyes()}
        {renderMouth()}
      </g>
      {/* Energetic raised paws */}
      <ellipse cx="23" cy="64" rx="6" ry="4.2" transform="rotate(-25 23 64)" fill="#FEF08A" stroke="#3B2F2F" strokeWidth="2.6" />
      <ellipse cx="77" cy="64" rx="6" ry="4.2" transform="rotate(25 77 64)" fill="#FEF08A" stroke="#3B2F2F" strokeWidth="2.6" />
    </svg>
  );
};

export const CHARACTER_NAMES: Record<CharacterId, string> = {
  chii: '치이',
  hachi: '하치',
  usagi: '우사기',
};

interface MascotBubbleProps {
  character: CharacterId;
  mood?: MascotMood;
  speakerLabel?: string;
  children: React.ReactNode;
}

export const MascotBubble: React.FC<MascotBubbleProps> = ({
  character,
  mood = 'happy',
  speakerLabel,
  children,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FFF8F3] border border-[#F2E5DC]">
      <MascotAvatar character={character} mood={mood} size="md" className="animate-float-slow" />
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold text-[#9A6B56] mb-1">
          {speakerLabel ?? `${CHARACTER_NAMES[character]}의 한마디`}
        </div>
        <div className="text-sm sm:text-[15px] leading-relaxed text-[#3B2F2F]">{children}</div>
      </div>
    </div>
  );
};
