'use client';

import React, { useState } from 'react';
import PlaceFilter from '../../components/places/PlaceFilter';
import PlaceCard from '../../components/places/PlaceCard';
import PlaceModal from '../../components/places/PlaceModal';
import { PUNE_PLACES } from '../../data/places';
import { FilterState, filterPlaces } from '../../lib/filters';
import { Place } from '../../types/place';
import { Sparkles, MapPin } from 'lucide-react';

const initialFilters: FilterState = {
  searchQuery: '',
  selectedNeighborhood: 'all',
  selectedCategory: 'all',
  selectedMood: 'all',
  priceTier: 'all',
  verifiedOnly: false,
  indoorOutdoor: 'all'
};

export default function DiscoverPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filteredPlaces = filterPlaces(PUNE_PLACES, filters);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Editorial Header */}
      <div className="max-w-2xl space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
          Pune Catalog Directory
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#141312]">
          Discover places across Pune.
        </h1>
        <p className="text-xs sm:text-sm text-[#75726C] leading-relaxed">
          Filter through our curated registry of verified cafés, iconic bakeries, hillside lookouts, and cultural landmarks.
        </p>
      </div>

      {/* Filter Bar */}
      <PlaceFilter
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(initialFilters)}
        totalMatches={filteredPlaces.length}
      />

      {/* Listings Grid */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map(place => (
            <PlaceCard
              key={place.id}
              place={place}
              onOpenDetails={p => setSelectedPlace(p)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#E8E4DA] p-8 space-y-3">
          <MapPin className="w-8 h-8 text-[#C85A32] mx-auto opacity-50" />
          <h3 className="font-serif text-xl font-bold text-[#141312]">
            No matching places found
          </h3>
          <p className="text-xs text-[#75726C] max-w-md mx-auto">
            Try loosening your filters, changing price tiers, or clearing the search query to see all places in Pune.
          </p>
          <button
            onClick={() => setFilters(initialFilters)}
            className="px-5 py-2.5 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Global Place Modal */}
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
