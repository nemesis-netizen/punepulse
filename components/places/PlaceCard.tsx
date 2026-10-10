'use client';

import React, { useState } from 'react';
import { Place } from '../../types/place';
import { MapPin, Clock, IndianRupee, Bookmark, ExternalLink, Sparkles } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
  onOpenDetails: (place: Place) => void;
  isSaved?: boolean;
  onToggleSave?: (placeId: string) => void;
}

export default function PlaceCard({ place, onOpenDetails, isSaved = false, onToggleSave }: PlaceCardProps) {
  const [saved, setSaved] = useState(isSaved);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    if (onToggleSave) onToggleSave(place.id);
  };

  return (
    <article
      onClick={() => onOpenDetails(place)}
      className="group cursor-pointer bg-white rounded-2xl border border-[#E8E4DA] overflow-hidden shadow-soft-sm hover:shadow-editorial transition-all duration-300 flex flex-col hover:-translate-y-1"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F0E6]">
        <img
          src={place.imageUrl}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-sm text-[#1A1917] shadow-sm">
              {place.category}
            </span>
            {place.isHiddenGem && (
              <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-[#1E3A2F] text-[#FBF9F5]">
                Hidden Gem
              </span>
            )}
            {place.isTrending && (
              <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-[#C85A32] text-white">
                Radar Pick
              </span>
            )}
          </div>

          <button
            onClick={handleSaveClick}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
              saved
                ? 'bg-[#C85A32] text-white'
                : 'bg-white/80 text-[#3D3B37] hover:bg-white hover:text-[#C85A32]'
            }`}
            aria-label="Save place"
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom image overlay information */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#F5F0E6]">
            <MapPin className="w-3.5 h-3.5 text-[#E3EDE8]" />
            <span>{place.neighborhood}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-serif text-xl font-bold tracking-tight text-[#141312] group-hover:text-[#C85A32] transition-colors">
              {place.name}
            </h3>
            <span className="text-xs font-semibold text-[#1E3A2F] shrink-0">
              {place.priceBasis === 'free' ? (
                'Free entry'
              ) : (
                `₹${place.averageVisitCost} / pers.`
              )}
            </span>
          </div>

          <p className="text-xs text-[#54524D] line-clamp-2 mt-1.5 leading-relaxed font-normal">
            {place.shortDescription}
          </p>
        </div>

        {/* Best time & metadata strip */}
        <div className="pt-3 border-t border-[#F5F0E6] flex items-center justify-between text-[11px] text-[#75726C]">
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3 h-3 text-[#C85A32] shrink-0" />
            <span className="truncate">{place.bestTimeNote.split('.')[0]}</span>
          </div>

          <span className="text-[#1E3A2F] font-semibold text-[11px] group-hover:translate-x-0.5 transition-transform shrink-0">
            View Guide →
          </span>
        </div>
      </div>
    </article>
  );
}
