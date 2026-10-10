'use client';

import React, { useState } from 'react';
import { Neighborhood, Place } from '../../types/place';
import { PUNE_AREAS, AreaInfo } from '../../data/areas';
import PlaceCard from '../places/PlaceCard';
import { MapPin, Navigation, Car, Train, Footprints, ShieldCheck, Sparkles } from 'lucide-react';

interface NeighborhoodExplorerProps {
  places: Place[];
  onOpenDetails: (place: Place) => void;
}

export default function NeighborhoodExplorer({ places, onOpenDetails }: NeighborhoodExplorerProps) {
  const [activeAreaName, setActiveAreaName] = useState<Neighborhood>('FC Road & Deccan');

  const activeArea = PUNE_AREAS.find(a => a.name === activeAreaName) || PUNE_AREAS[0];
  const areaPlaces = places.filter(p => p.neighborhood === activeAreaName);

  return (
    <section id="areas" className="py-20 bg-white border-t border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A2F]">
            Area-Based Discovery
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#141312]">
            Explore Pune by neighborhood.
          </h2>
          <p className="text-sm text-[#75726C] leading-relaxed">
            Every neighborhood in Pune has a distinct pulse. While our MVP provides deep verified coverage for FC Road & Deccan, browse other core pockets as our curated catalog expands.
          </p>
        </div>

        {/* Area Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {PUNE_AREAS.map(area => {
            const isSelected = area.name === activeAreaName;
            return (
              <button
                key={area.id}
                onClick={() => setActiveAreaName(area.name)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#1E3A2F] text-[#FBF9F5] border-[#1E3A2F] shadow-soft'
                    : 'bg-[#FBF9F5] text-[#54524D] border-[#E8E4DA] hover:bg-white hover:text-[#1A1917]'
                }`}
              >
                <span>{area.name}</span>
                {area.isMvpFocus && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-bold ${
                    isSelected ? 'bg-[#C85A32] text-white' : 'bg-[#E3EDE8] text-[#1E3A2F]'
                  }`}>
                    Deep Guide
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Area Editorial Briefing Card */}
        <div className="bg-[#FBF9F5] rounded-3xl p-6 sm:p-10 border border-[#E8E4DA] shadow-soft mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 cols: Story & Vibe */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C85A32]">
                <MapPin className="w-4 h-4" />
                <span>{activeArea.name} Briefing</span>
              </div>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#141312]">
                {activeArea.tagline}
              </h3>
              
              <p className="text-sm text-[#3D3B37] leading-relaxed">
                {activeArea.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                {activeArea.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white text-[#2A2926] border border-[#E8E4DA]"
                  >
                    ★ {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 5 cols: Practical Transit & Parking Intelligence */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E8E4DA] space-y-4 text-xs">
              <span className="font-serif font-bold text-sm text-[#1A1917] block">
                Local Mobility Intelligence
              </span>

              <div className="space-y-3 divide-y divide-[#F5F0E6]">
                <div className="pt-2 flex items-start gap-2.5">
                  <Footprints className="w-4 h-4 text-[#1E3A2F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1A1917] block">Walkability Score:</strong>
                    <span className="text-[#54524D]">{activeArea.walkingScore}</span>
                  </div>
                </div>

                <div className="pt-2.5 flex items-start gap-2.5">
                  <Train className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1A1917] block">Metro & Public Transit:</strong>
                    <span className="text-[#54524D]">{activeArea.transitAccess}</span>
                  </div>
                </div>

                <div className="pt-2.5 flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-[#75726C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1A1917] block">Parking Advice:</strong>
                    <span className="text-[#54524D]">{activeArea.parkingAdvice}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`/plan?startingArea=${encodeURIComponent(activeArea.name)}`}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#284E3F] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Plan an Outing Starting in {activeArea.name}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Curated Listings in this Neighborhood */}
        <div>
          <div className="flex items-baseline justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold text-[#141312]">
              Curated in {activeArea.name} ({areaPlaces.length} places)
            </h3>
            <span className="text-xs text-[#75726C]">
              Verified Editorial Listings
            </span>
          </div>

          {areaPlaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {areaPlaces.map(place => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FBF9F5] rounded-3xl border border-dashed border-[#E8E4DA] p-8 space-y-3">
              <MapPin className="w-8 h-8 text-[#C85A32] mx-auto opacity-60" />
              <h4 className="font-serif text-lg font-bold text-[#1A1917]">
                Progressive Expansion in Progress
              </h4>
              <p className="text-xs text-[#75726C] max-w-md mx-auto">
                We are actively scouting verified, budget-honest gems in {activeArea.name}. Check our deep-coverage zones like FC Road & Deccan in the meantime.
              </p>
              <button
                onClick={() => setActiveAreaName('FC Road & Deccan')}
                className="px-4 py-2 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold"
              >
                Switch to FC Road & Deccan
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
