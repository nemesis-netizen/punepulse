'use client';

import React, { useState } from 'react';
import PlaceCard from '../../components/places/PlaceCard';
import PlaceModal from '../../components/places/PlaceModal';
import { PUNE_PLACES } from '../../data/places';
import { Place } from '../../types/place';
import { Sparkles, MapPin } from 'lucide-react';

export default function HiddenGemsPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const gems = PUNE_PLACES.filter(p => p.isHiddenGem);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3EDE8] text-[#1E3A2F] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INDIE & LESSER-KNOWN GEMS</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#141312]">
          Pune’s Quiet Secrets.
        </h1>
        <p className="text-xs sm:text-sm text-[#75726C] leading-relaxed">
          Away from commercial noise and influencer queues. Independent bookstores with chai, secluded lake perimeters, ancient basalt shrines, and heritage Parsi bakery balconies.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gems.map(place => (
          <PlaceCard
            key={place.id}
            place={place}
            onOpenDetails={p => setSelectedPlace(p)}
          />
        ))}
      </div>

      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onSelectAlternative={alt => setSelectedPlace(alt)}
        />
      )}
    </div>
  );
}
