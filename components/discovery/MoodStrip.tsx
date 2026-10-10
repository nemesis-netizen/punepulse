'use client';

import React from 'react';
import { Mood } from '../../types/place';
import { 
  Coffee, 
  Heart, 
  Users, 
  Mountain, 
  Utensils, 
  Palette, 
  Moon, 
  BookOpen, 
  Sparkles, 
  Sun 
} from 'lucide-react';

interface MoodItem {
  mood: Mood;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  accentBg: string;
  accentColor: string;
}

const MOODS: MoodItem[] = [
  {
    mood: 'Slow morning',
    label: 'Slow Morning',
    subtitle: 'Quiet breakfast, Irani chai & fresh newspapers',
    icon: <Sun className="w-5 h-5" />,
    accentBg: 'bg-[#FFF8E7]',
    accentColor: 'text-[#D97706]'
  },
  {
    mood: 'Coffee and conversations',
    label: 'Coffee & Talks',
    subtitle: 'Green garden patios, pour-overs & unhurried chats',
    icon: <Coffee className="w-5 h-5" />,
    accentBg: 'bg-[#F5F0E6]',
    accentColor: 'text-[#854D0E]'
  },
  {
    mood: 'Date night',
    label: 'Date Night',
    subtitle: 'Intimate candlelit bistros & romantic strolls',
    icon: <Heart className="w-5 h-5" />,
    accentBg: 'bg-[#FDF2F2]',
    accentColor: 'text-[#C85A32]'
  },
  {
    mood: 'Friends and chaos',
    label: 'Friends & Chaos',
    subtitle: 'Cold coffee towers, crowded tables & laughter',
    icon: <Users className="w-5 h-5" />,
    accentBg: 'bg-[#EFF6FF]',
    accentColor: 'text-[#2563EB]'
  },
  {
    mood: 'Nature escape',
    label: 'Nature Escape',
    subtitle: 'Hilltop breeze, sunrise trails & birdsong',
    icon: <Mountain className="w-5 h-5" />,
    accentBg: 'bg-[#E3EDE8]',
    accentColor: 'text-[#1E3A2F]'
  },
  {
    mood: 'Food hunt',
    label: 'Food Hunt',
    subtitle: 'Iconic SPDP, misal rassa & secret burger joints',
    icon: <Utensils className="w-5 h-5" />,
    accentBg: 'bg-[#FEF3C7]',
    accentColor: 'text-[#B45309]'
  },
  {
    mood: 'Art and culture',
    label: 'Art & Heritage',
    subtitle: 'Basalt rock caves, Peshwa forts & zines',
    icon: <Palette className="w-5 h-5" />,
    accentBg: 'bg-[#F3E8FF]',
    accentColor: 'text-[#7E22CE]'
  },
  {
    mood: 'Nightlife',
    label: 'Nightlife & Craft',
    subtitle: 'Microbrewery ciders, live gigs & open courtyards',
    icon: <Moon className="w-5 h-5" />,
    accentBg: 'bg-[#1A1917]',
    accentColor: 'text-[#F5F0E6]'
  },
  {
    mood: 'Solo reset',
    label: 'Solo Reset',
    subtitle: 'Barefoot tea spaces, quiet books & calm parks',
    icon: <BookOpen className="w-5 h-5" />,
    accentBg: 'bg-[#ECFDF5]',
    accentColor: 'text-[#059669]'
  },
  {
    mood: 'Something spontaneous',
    label: 'Spontaneous',
    subtitle: 'Surprise route generator across the city',
    icon: <Sparkles className="w-5 h-5" />,
    accentBg: 'bg-[#FFF7ED]',
    accentColor: 'text-[#EA580C]'
  }
];

interface MoodStripProps {
  activeMood?: Mood | 'all';
  onSelectMood?: (mood: Mood) => void;
}

export default function MoodStrip({ activeMood, onSelectMood }: MoodStripProps) {
  const handleMoodClick = (mood: Mood) => {
    if (onSelectMood) {
      onSelectMood(mood);
    } else {
      window.location.href = `/plan?mood=${encodeURIComponent(mood)}`;
    }
  };

  return (
    <section id="moods" className="py-14 bg-white border-y border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
              Instant Mood Matching
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#141312] mt-1">
              What are we feeling today?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#75726C] max-w-md">
            Click any vibe below to immediately filter places or launch an automated custom outing tuned to that feeling.
          </p>
        </div>

        {/* Scrollable / Grid Mood Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {MOODS.map(item => {
            const isSelected = activeMood === item.mood;
            return (
              <button
                key={item.mood}
                onClick={() => handleMoodClick(item.mood)}
                className={`group relative p-4 rounded-2xl text-left transition-all border flex flex-col justify-between min-h-[130px] ${
                  isSelected
                    ? 'border-[#1E3A2F] bg-[#E3EDE8] shadow-soft ring-2 ring-[#1E3A2F]/20'
                    : 'border-[#E8E4DA] bg-[#FBF9F5] hover:bg-white hover:border-[#C7C4BC] hover:shadow-soft-sm'
                }`}
              >
                {/* Top Icon Pill */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.accentBg} ${item.accentColor}`}
                >
                  {item.icon}
                </div>

                {/* Text Labels */}
                <div className="mt-3">
                  <div className="font-semibold text-xs text-[#1A1917] group-hover:text-[#C85A32] transition-colors">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-[#75726C] line-clamp-2 mt-0.5 leading-snug font-normal">
                    {item.subtitle}
                  </div>
                </div>

                {/* Micro hover indicator */}
                <span className="absolute top-3 right-3 text-[10px] text-[#75726C] opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
