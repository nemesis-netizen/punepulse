'use client';

import React from 'react';
import { Place } from '../../types/place';
import PlaceCard from '../places/PlaceCard';
import { Sparkles, Compass } from 'lucide-react';

interface HiddenGemsSectionProps {
  places: Place[];
  onOpenDetails: (place: Place) => void;
}

export default function HiddenGemsSection({ places, onOpenDetails }: HiddenGemsSectionProps) {
  const gems = places.filter(p => p.isHiddenGem);

  return (
    <section id="hidden-gems" className="py-20 bg-white border-t border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3EDE8] text-[#1E3A2F] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFF THE MAIN CORRIDOR</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#141312]">
              Pune’s hidden sanctuaries.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#75726C] max-w-md leading-relaxed">
            Curated spaces that avoid commercial hype: indie book sanctuaries, 8th-century subterranean basalt caves, colonial bakery balconies, and quiet garden courtyards.
          </p>
        </div>

        {/* Gems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gems.slice(0, 6).map(place => (
            <PlaceCard
              key={place.id}
              place={place}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
