'use client';

import React from 'react';
import { Place } from '../../types/place';
import PlaceCard from '../places/PlaceCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface TrendingSectionProps {
  places: Place[];
  onOpenDetails: (place: Place) => void;
}

export default function TrendingSection({ places, onOpenDetails }: TrendingSectionProps) {
  // Take top 6 trending/hero places for an asymmetric showcase
  const featured = places.find(p => p.id === 'vaishali-fc-road') || places[0];
  const sidePicks = places.filter(p => p.id !== featured.id).slice(0, 4);

  return (
    <section id="discover" className="py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
              Curated City Highlights
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#141312] mt-1">
              On Pune’s radar.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#75726C] max-w-md leading-relaxed">
            Essential institutions, timeless hillside trails, and quiet courtyard cafés chosen for quality, authenticity, and enduring cultural impact.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Featured Large Hero Card (7 cols) */}
          {featured && (
            <div
              onClick={() => onOpenDetails(featured)}
              className="lg:col-span-7 group cursor-pointer bg-white rounded-3xl border border-[#E8E4DA] overflow-hidden shadow-soft hover:shadow-editorial transition-all duration-500"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#1A1917]">
                <img
                  src={featured.imageUrl}
                  alt={featured.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#C85A32] text-white shadow-sm">
                    Featured Pune Anchor
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-[#141312] backdrop-blur-sm">
                    {featured.category}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-medium text-[#F5F0E6] flex items-center gap-1.5 mb-1">
                    <span>{featured.neighborhood}</span>
                    <span>·</span>
                    <span>₹{featured.averageVisitCost} avg spend</span>
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                    {featured.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <p className="text-sm sm:text-base text-[#3D3B37] leading-relaxed">
                  {featured.fullDescription}
                </p>

                <div className="p-3.5 bg-[#F5F0E6] rounded-xl border border-[#E8E4DA] flex items-center justify-between text-xs text-[#54524D]">
                  <span className="font-medium italic">
                    Best Time: {featured.bestTimeNote}
                  </span>
                  <span className="font-semibold text-[#1E3A2F] group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0 ml-3">
                    Explore Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Right Column Grid (5 cols, 2 stacked or dual) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {sidePicks.slice(0, 2).map(place => (
              <PlaceCard
                key={place.id}
                place={place}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>

        </div>

        {/* Secondary Asymmetric Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {sidePicks.slice(2, 5).map(place => (
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
