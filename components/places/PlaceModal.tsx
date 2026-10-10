'use client';

import React from 'react';
import { Place } from '../../types/place';
import { 
  X, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Compass, 
  ShieldCheck, 
  Car, 
  Footprints, 
  Sparkles, 
  ExternalLink, 
  Share2, 
  CheckCircle2, 
  Info 
} from 'lucide-react';
import { PUNE_TRAFFIC_PATTERNS } from '../../data/traffic-guidance';
import { PUNE_PLACES } from '../../data/places';

interface PlaceModalProps {
  place: Place | null;
  onClose: () => void;
  onSelectAlternative?: (altPlace: Place) => void;
}

export default function PlaceModal({ place, onClose, onSelectAlternative }: PlaceModalProps) {
  if (!place) return null;

  const traffic = PUNE_TRAFFIC_PATTERNS[place.neighborhood] || PUNE_TRAFFIC_PATTERNS['FC Road & Deccan'];

  // Find 2 nearby alternatives in same or adjacent neighborhood
  const alternatives = PUNE_PLACES
    .filter(p => p.id !== place.id && (p.neighborhood === place.neighborhood || p.category === place.category))
    .slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.origin + `/places/${place.slug}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-[#FBF9F5] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E4DA] my-8 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky Header Close Button */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#1A1917] hover:bg-white flex items-center justify-center shadow-soft transition-all"
            title="Share place"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#1A1917] hover:bg-white flex items-center justify-center shadow-soft transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 divide-y divide-[#E8E4DA]">
          
          {/* Hero Banner Section */}
          <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full bg-[#1A1917]">
            <img
              src={place.imageUrl}
              alt={place.name}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-black/30 to-transparent" />
            
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#1E3A2F] text-white">
                  {place.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/20 backdrop-blur-sm text-white">
                  {place.neighborhood}
                </span>
                {place.isVerified && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#A0EAC9]/30 text-[#A0EAC9] flex items-center gap-1 border border-[#A0EAC9]/40">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Local Spot
                  </span>
                )}
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
                {place.name}
              </h2>
            </div>
          </div>

          {/* Section: Overview & Editorial Description */}
          <div className="p-6 sm:p-8 space-y-6 bg-white">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#75726C] mb-2">
                The Pune Experience
              </h3>
              <p className="text-sm sm:text-base text-[#2A2926] leading-relaxed">
                {place.fullDescription}
              </p>
            </div>

            {/* Why Visit Callout */}
            <div className="p-4 rounded-2xl bg-[#F5F0E6] border border-[#E8E4DA] flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
              <div>
                <span className="font-serif italic font-semibold text-sm text-[#1A1917] block">
                  Why Visit
                </span>
                <p className="text-xs text-[#54524D] mt-0.5 leading-relaxed">
                  {place.whyVisit}
                </p>
              </div>
            </div>

            {/* Best Suited For Tags */}
            <div>
              <span className="text-xs font-semibold text-[#75726C] block mb-2">
                Ideal For
              </span>
              <div className="flex flex-wrap gap-2">
                {place.bestFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-[#FBF9F5] text-[#3D3B37] border border-[#E8E4DA]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Budget & Spend Breakdown */}
          <div className="p-6 sm:p-8 bg-[#FBF9F5] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#75726C]">
                  Budget Breakdown (Realistic Estimates)
                </h3>
                <span className="text-xl font-serif font-bold text-[#141312] mt-0.5 block">
                  {place.priceBasis === 'free' ? '₹0 · Completely Free' : `Approx. ₹${place.averageVisitCost} per person`}
                </span>
              </div>
              <span className="text-[11px] text-[#75726C] bg-white px-2.5 py-1 rounded-lg border border-[#E8E4DA]">
                Basis: {place.priceBasis}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-[#E8E4DA]">
                <span className="text-[#75726C] text-[11px] block">Range</span>
                <span className="font-semibold text-[#1A1917]">
                  {place.priceBasis === 'free' ? '₹0' : `₹${place.priceMin} – ₹${place.priceMax}`}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E8E4DA]">
                <span className="text-[#75726C] text-[11px] block">Avg Food/Drink</span>
                <span className="font-semibold text-[#1A1917]">
                  {place.priceBasis === 'free' ? 'None' : `₹${place.averageVisitCost}`}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E8E4DA]">
                <span className="text-[#75726C] text-[11px] block">Entry Fee</span>
                <span className="font-semibold text-[#1A1917]">
                  {place.priceBasis === 'entry fee' ? `₹${place.priceMin}` : '₹0'}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E8E4DA]">
                <span className="text-[#75726C] text-[11px] block">Duration</span>
                <span className="font-semibold text-[#1A1917]">{place.estimatedVisitDurationMinutes} mins</span>
              </div>
            </div>

            <div className="text-[11px] text-[#75726C] flex items-center gap-1.5 italic">
              <Info className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
              <span>Prices verified against local menu benchmarks ({place.lastVerifiedAt}). Subject to menu changes.</span>
            </div>
          </div>

          {/* Section: Best Time & Traffic Guidance */}
          <div className="p-6 sm:p-8 bg-white space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#75726C] mb-2">
                Optimal Visiting Window & Atmosphere
              </h3>
              <p className="text-xs sm:text-sm text-[#2A2926] leading-relaxed">
                {place.bestTimeNote}
              </p>
            </div>

            {/* Traffic Guidance Callout */}
            <div className="p-4 rounded-2xl bg-[#E3EDE8]/50 border border-[#B9E4D0] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3A2F]">
                <Car className="w-4 h-4 text-[#1E3A2F]" />
                <span>Typical Neighborhood Traffic Guidance</span>
              </div>
              <p className="text-xs text-[#2A2926] leading-relaxed">
                {traffic.weekdayEveningPeak} can create bottlenecks at {traffic.keyBottlenecks.slice(0, 2).join(' & ')}.
              </p>
              <p className="text-[11px] text-[#54524D]">
                <strong className="text-[#1E3A2F]">Recommended window:</strong> {traffic.recommendedDepartureWindows.afternoon} or {traffic.recommendedDepartureWindows.evening}.
              </p>
              <p className="text-[10px] text-[#75726C] italic border-t border-[#B9E4D0]/60 pt-1.5">
                Note: Heuristic planning guidance based on historic flow — check live navigation before departing.
              </p>
            </div>

            {/* Verified Useful Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-[#1A1917] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                  Address
                </span>
                <p className="text-[#54524D] leading-relaxed">{place.address}</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-[#1A1917] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#1E3A2F]" />
                  Operating Hours
                </span>
                <p className="text-[#54524D]">{place.openingHours}</p>
              </div>
            </div>

            {/* Parking & Transit */}
            <div className="p-3 bg-[#FBF9F5] rounded-xl border border-[#E8E4DA] text-xs space-y-1">
              <span className="font-semibold text-[#1A1917]">Transit & Parking:</span>
              <p className="text-[#54524D]">
                {place.transportAccessibility.nearestMetroOrBus}. Two-wheeler parking: {place.transportAccessibility.twoWheelerParking}; Car parking: {place.transportAccessibility.carParking}.
              </p>
            </div>
          </div>

          {/* Section: Nearby Alternatives */}
          {alternatives.length > 0 && (
            <div className="p-6 sm:p-8 bg-[#FBF9F5] space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#75726C]">
                Nearby Alternatives in {place.neighborhood}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {alternatives.map(alt => (
                  <div
                    key={alt.id}
                    onClick={() => onSelectAlternative ? onSelectAlternative(alt) : null}
                    className="p-3 bg-white rounded-xl border border-[#E8E4DA] hover:border-[#1E3A2F] cursor-pointer transition-all shadow-soft-sm space-y-1"
                  >
                    <span className="text-[10px] text-[#C85A32] font-semibold">{alt.category}</span>
                    <h4 className="font-serif font-bold text-sm text-[#141312] truncate">{alt.name}</h4>
                    <p className="text-[11px] text-[#75726C] line-clamp-1">{alt.shortDescription}</p>
                    <span className="text-[10px] font-semibold text-[#1E3A2F] block">
                      {alt.priceBasis === 'free' ? 'Free' : `₹${alt.averageVisitCost}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Action Buttons */}
          <div className="p-5 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 border-t border-[#E8E4DA]">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-[#E8E4DA] text-xs font-semibold text-[#2A2926] hover:bg-[#F5F0E6] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>

            <a
              href={`/plan?startingArea=${encodeURIComponent(place.neighborhood)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#284E3F] transition-all shadow-soft"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan Outing Around This Spot</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
