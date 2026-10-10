'use client';

import React, { useState } from 'react';
import { Itinerary, ItineraryStop } from '../../types/itinerary';
import { Place } from '../../types/place';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Car, 
  Footprints, 
  RefreshCw, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Share2, 
  Bookmark, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight, 
  SlidersHorizontal 
} from 'lucide-react';
import PlaceModal from '../places/PlaceModal';

interface ItineraryViewProps {
  itinerary: Itinerary;
  onReplaceStop: (stopIndex: number, newPlace: Place) => void;
  onRemoveStop: (stopIndex: number) => void;
  onReorderStop: (fromIndex: number, toIndex: number) => void;
  onRegenerate: () => void;
  onReset: () => void;
}

export default function ItineraryView({
  itinerary,
  onReplaceStop,
  onRemoveStop,
  onReorderStop,
  onRegenerate,
  onReset
}: ItineraryViewProps) {
  const [activeReplaceIndex, setActiveReplaceIndex] = useState<number | null>(null);
  const [selectedPlaceModal, setSelectedPlaceModal] = useState<Place | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedLocal, setSavedLocal] = useState(false);

  const budget = itinerary.budget;

  const handleCopySummary = () => {
    const summaryText = `📍 ${itinerary.title}
"${itinerary.tagline}"

${itinerary.stops.map(s => `${s.suggestedArrivalTime} – ${s.place.name} (${s.place.neighborhood})
• Activity: ${s.activityNote}
• Est. Cost: ₹${s.estimatedCostPerPerson}/person`).join('\n\n')}

💰 Total Est. Spend: ₹${budget.totalPerPerson}/person (Group: ₹${budget.totalGroupSpend})
🚗 Starting from: ${itinerary.startingNeighborhood}
🚦 Traffic guidance: ${itinerary.trafficGuidance.bestDepartureWindow}
Generated via PunePulse (https://punepulse.app)`;

    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSavePlan = () => {
    if (typeof window !== 'undefined') {
      const savedList = JSON.parse(localStorage.getItem('punepulse_saved_plans') || '[]');
      savedList.unshift({
        id: itinerary.id,
        title: itinerary.title,
        date: new Date().toLocaleDateString(),
        stops: itinerary.stops.map(s => s.place.name),
        budgetPerPerson: budget.totalPerPerson
      });
      localStorage.setItem('punepulse_saved_plans', JSON.stringify(savedList.slice(0, 10)));
      setSavedLocal(true);
      setTimeout(() => setSavedLocal(false), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner / Itinerary Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E4DA] shadow-soft">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#F5F0E6]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3A2F]">
              <Sparkles className="w-4 h-4 text-[#C85A32]" />
              <span>YOUR PERSONALIZED PUNE OUTING</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#141312]">
              {itinerary.title}
            </h1>
            
            <p className="font-serif italic text-base sm:text-lg text-[#C85A32]">
              “{itinerary.tagline}”
            </p>
            
            <p className="text-xs sm:text-sm text-[#54524D] leading-relaxed max-w-2xl">
              {itinerary.curatorNote}
            </p>
          </div>

          {/* Quick Actions (Share, Save, Regenerate) */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E4DA] text-xs font-semibold text-[#2A2926] hover:bg-[#F5F0E6] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Summary Copied!' : 'Share Itinerary'}</span>
            </button>

            <button
              onClick={handleSavePlan}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E4DA] text-xs font-semibold text-[#2A2926] hover:bg-[#F5F0E6] transition-colors"
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedLocal ? 'fill-current text-[#C85A32]' : ''}`} />
              <span>{savedLocal ? 'Saved on Device!' : 'Save Plan'}</span>
            </button>

            <button
              onClick={onRegenerate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#284E3F] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {/* Budget & Time Overview Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-[#E8E4DA]">
            <span className="text-[11px] font-semibold text-[#75726C] uppercase tracking-wider block">
              Estimated Total
            </span>
            <span className="font-serif text-2xl font-bold text-[#141312] mt-0.5 block">
              ₹{budget.totalPerPerson} <span className="text-xs font-normal text-[#54524D]">/ person</span>
            </span>
            <span className="text-[10px] text-[#75726C] block mt-0.5">
              Includes {itinerary.preferences.budget.contingencyPercentage}% contingency buffer (₹{budget.contingencyPerPerson})
            </span>
          </div>

          <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-[#E8E4DA]">
            <span className="text-[11px] font-semibold text-[#75726C] uppercase tracking-wider block">
              Group Spend ({itinerary.preferences.groupCount} people)
            </span>
            <span className="font-serif text-2xl font-bold text-[#141312] mt-0.5 block">
              ₹{budget.totalGroupSpend}
            </span>
            <span className="text-[10px] text-[#75726C] block mt-0.5">
              Shared food & travel calculation
            </span>
          </div>

          <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-[#E8E4DA]">
            <span className="text-[11px] font-semibold text-[#75726C] uppercase tracking-wider block">
              Total Duration
            </span>
            <span className="font-serif text-2xl font-bold text-[#141312] mt-0.5 block">
              ~{Math.round(itinerary.totalDurationMinutes / 60 * 10) / 10} hrs
            </span>
            <span className="text-[10px] text-[#75726C] block mt-0.5">
              {itinerary.stops.length} curated stops with buffers
            </span>
          </div>

          <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-[#E8E4DA]">
            <span className="text-[11px] font-semibold text-[#75726C] uppercase tracking-wider block">
              Starting Hub
            </span>
            <span className="font-serif text-xl font-bold text-[#141312] mt-0.5 block truncate">
              {itinerary.startingNeighborhood.split('&')[0]}
            </span>
            <span className="text-[10px] text-[#75726C] block mt-0.5">
              Transport: {itinerary.preferences.transportMode}
            </span>
          </div>
        </div>

        {/* Budget Status Alert if Tight/Exceeds */}
        {budget.budgetStatus === 'exceeds-budget' && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#FDF2F2] border border-[#FCECE6] text-xs text-[#991B1B] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              This itinerary exceeds your target budget by ₹{budget.totalPerPerson - itinerary.preferences.budget.maxAmountPerPerson}. Try replacing a paid stop with a zero-cost hill or garden stop below.
            </span>
          </div>
        )}
      </div>

      {/* Traffic Advisory Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#E3EDE8]/60 border border-[#B9E4D0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Car className="w-4 h-4 text-[#1E3A2F] shrink-0" />
          <div>
            <strong className="text-[#1E3A2F] block">Local Pune Traffic Intelligence:</strong>
            <span className="text-[#3D3B37]">{itinerary.trafficGuidance.peakWarning}</span>
          </div>
        </div>
        <span className="text-[10px] text-[#75726C] bg-white px-2.5 py-1 rounded-full border border-[#B9E4D0] shrink-0">
          {itinerary.trafficGuidance.disclaimer}
        </span>
      </div>

      {/* Ordered Timeline Stops */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#141312]">
          Ordered Itinerary Sequence
        </h2>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#E8E4DA]">
          {itinerary.stops.map((stop, index) => {
            const isReplacing = activeReplaceIndex === index;

            return (
              <div key={stop.place.id + index} className="relative group">
                
                {/* Timeline Circle Bullet */}
                <div className="absolute -left-6 sm:-left-8 top-5 w-6 h-6 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-xs font-bold shadow-soft">
                  {stop.order}
                </div>

                {/* Main Stop Card */}
                <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all space-y-4">
                  
                  {/* Top row: Time pill, place name, cost */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#F5F0E6] text-[#1A1917] border border-[#E8E4DA]">
                        {stop.suggestedArrivalTime} – {stop.suggestedDepartureTime}
                      </span>
                      <span className="text-xs text-[#75726C]">
                        (~{stop.durationMinutes} mins)
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#1E3A2F]">
                        {stop.place.priceBasis === 'free' ? 'Free stop' : `₹${stop.estimatedCostPerPerson} per person`}
                      </span>

                      {/* Reorder Buttons */}
                      <div className="flex items-center gap-1 border-l border-[#F5F0E6] pl-2">
                        {index > 0 && (
                          <button
                            onClick={() => onReorderStop(index, index - 1)}
                            className="p-1 text-[#75726C] hover:text-[#1A1917]"
                            title="Move up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {index < itinerary.stops.length - 1 && (
                          <button
                            onClick={() => onReorderStop(index, index + 1)}
                            className="p-1 text-[#75726C] hover:text-[#1A1917]"
                            title="Move down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Place Details Content */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    <div className="md:col-span-4 aspect-[16/10] rounded-2xl overflow-hidden bg-[#F5F0E6]">
                      <img
                        src={stop.place.imageUrl}
                        alt={stop.place.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="md:col-span-8 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-[#C85A32] font-semibold">
                        <span>{stop.place.category}</span>
                        <span>·</span>
                        <span className="text-[#54524D]">{stop.place.neighborhood}</span>
                      </div>

                      <h3
                        onClick={() => setSelectedPlaceModal(stop.place)}
                        className="font-serif text-2xl font-bold text-[#141312] hover:text-[#C85A32] cursor-pointer transition-colors"
                      >
                        {stop.place.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#54524D] leading-relaxed">
                        {stop.place.shortDescription}
                      </p>

                      <div className="p-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E4DA] text-xs text-[#2A2926] flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                        <span className="italic">Curator note: {stop.activityNote}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stop Action Bar: Replace, Remove, View Guide */}
                  <div className="pt-3 border-t border-[#F5F0E6] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedPlaceModal(stop.place)}
                        className="px-3 py-1.5 rounded-full border border-[#E8E4DA] hover:bg-[#F5F0E6] text-[#2A2926] font-medium"
                      >
                        View Full Details
                      </button>

                      <button
                        onClick={() => setActiveReplaceIndex(isReplacing ? null : index)}
                        className="px-3 py-1.5 rounded-full bg-[#F5F0E6] hover:bg-[#EBE3D3] text-[#1E3A2F] font-semibold flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>{isReplacing ? 'Cancel Swap' : 'Replace Stop'}</span>
                      </button>

                      {itinerary.stops.length > 1 && (
                        <button
                          onClick={() => onRemoveStop(index)}
                          className="p-1.5 rounded-full text-[#9E9A92] hover:text-[#DC2626] hover:bg-[#FDF2F2]"
                          title="Remove this stop"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.place.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E3A2F] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Replace Stop Drawer if clicked */}
                  {isReplacing && (
                    <div className="mt-4 p-4 rounded-2xl bg-[#FBF9F5] border border-[#C7C4BC] space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-[#141312]">
                          Choose Alternative for Stop {stop.order}:
                        </span>
                        <span className="text-[11px] text-[#75726C]">
                          Filtered for geographic & budget compatibility
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {stop.availableAlternatives.map(alt => (
                          <div
                            key={alt.id}
                            onClick={() => {
                              onReplaceStop(index, alt);
                              setActiveReplaceIndex(null);
                            }}
                            className="p-3 bg-white rounded-xl border border-[#E8E4DA] hover:border-[#1E3A2F] hover:shadow-soft cursor-pointer transition-all space-y-1"
                          >
                            <span className="text-[10px] font-semibold text-[#C85A32]">{alt.category}</span>
                            <h4 className="font-serif font-bold text-sm text-[#1A1917] truncate">{alt.name}</h4>
                            <p className="text-[11px] text-[#75726C] line-clamp-1">{alt.shortDescription}</p>
                            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#F5F0E6]">
                              <span className="font-semibold text-[#1E3A2F]">
                                {alt.priceBasis === 'free' ? 'Free' : `₹${alt.averageVisitCost}`}
                              </span>
                              <span className="text-[#C85A32] font-semibold">Pick →</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Transit Buffer to next stop */}
                {stop.travelToNextStop && (
                  <div className="my-3 pl-4 flex items-center gap-2 text-xs text-[#75726C]">
                    <div className="px-3 py-1 rounded-full bg-[#F5F0E6] border border-[#E8E4DA] flex items-center gap-1.5">
                      <Footprints className="w-3.5 h-3.5 text-[#1E3A2F]" />
                      <span>
                        ~{stop.travelToNextStop.distanceKm} km transfer ({stop.travelToNextStop.estimatedMinutes} mins + {stop.travelToNextStop.bufferMinutes} min buffer)
                      </span>
                    </div>
                    <span className="text-[11px] italic hidden sm:inline">
                      {stop.travelToNextStop.typicalTrafficNote}
                    </span>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* Place Modal when opened */}
      {selectedPlaceModal && (
        <PlaceModal
          place={selectedPlaceModal}
          onClose={() => setSelectedPlaceModal(null)}
          onSelectAlternative={alt => {
            setSelectedPlaceModal(alt);
          }}
        />
      )}

      {/* Bottom Floating Reset / Return */}
      <div className="pt-8 border-t border-[#E8E4DA] flex items-center justify-between">
        <button
          onClick={onReset}
          className="text-xs font-semibold text-[#75726C] hover:text-[#1A1917]"
        >
          ← Edit My Parameters (Change Budget/Mood/Time)
        </button>

        <a
          href="/#discover"
          className="text-xs font-semibold text-[#1E3A2F] hover:underline"
        >
          Browse All 26 Verified Places →
        </a>
      </div>

    </div>
  );
}
