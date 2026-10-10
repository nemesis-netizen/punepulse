'use client';

import React, { useState } from 'react';
import Hero from '../components/hero/Hero';
import MoodStrip from '../components/discovery/MoodStrip';
import TrendingSection from '../components/discovery/TrendingSection';
import PlannerTeaser from '../components/discovery/PlannerTeaser';
import NeighborhoodExplorer from '../components/discovery/NeighborhoodExplorer';
import HiddenGemsSection from '../components/discovery/HiddenGemsSection';
import BestTimeToVisit from '../components/discovery/BestTimeToVisit';
import PlaceModal from '../components/places/PlaceModal';
import { PUNE_PLACES } from '../data/places';
import { Place } from '../types/place';

export default function HomePage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <div className="w-full">
      {/* Hero Section with Editorial Headline & Topographic Canvas */}
      <Hero />

      {/* Instant Mood Matching Strip */}
      <MoodStrip
        onSelectMood={mood => {
          window.location.href = `/plan?mood=${encodeURIComponent(mood)}`;
        }}
      />

      {/* Trending On Pune's Radar (Asymmetric Grid) */}
      <TrendingSection
        places={PUNE_PLACES}
        onOpenDetails={place => setSelectedPlace(place)}
      />

      {/* Outing Planner Teaser Callout */}
      <PlannerTeaser />

      {/* Explore by Neighborhood with Deep FC Road Coverage */}
      <NeighborhoodExplorer
        places={PUNE_PLACES}
        onOpenDetails={place => setSelectedPlace(place)}
      />

      {/* Hidden Gems Section */}
      <HiddenGemsSection
        places={PUNE_PLACES}
        onOpenDetails={place => setSelectedPlace(place)}
      />

      {/* Best Time To Go Visual Guide */}
      <BestTimeToVisit />

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
