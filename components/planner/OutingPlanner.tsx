'use client';

import React, { useState, useEffect } from 'react';
import { UserPreferences, BudgetTier, DurationOption } from '../../types/preferences';
import { Mood, Neighborhood, TransportMode, GroupSize, Place } from '../../types/place';
import { Itinerary } from '../../types/itinerary';
import { generateItinerary, replaceStopInItinerary, removeStopFromItinerary } from '../../lib/recommendations';
import { PUNE_AREAS } from '../../data/areas';
import ItineraryView from './ItineraryView';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  IndianRupee, 
  Clock, 
  MapPin, 
  Users, 
  Car, 
  Footprints, 
  Sliders, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

const MOOD_OPTIONS: { mood: Mood; label: string; desc: string }[] = [
  { mood: 'Slow morning', label: 'Slow Morning', desc: 'Irani chai, quiet reading & breakfast' },
  { mood: 'Coffee and conversations', label: 'Coffee & Talks', desc: 'Leafy patios & deep conversations' },
  { mood: 'Date night', label: 'Date Night', desc: 'Candlelight, wine & romantic strolls' },
  { mood: 'Friends and chaos', label: 'Friends & Chaos', desc: 'Lively tables, food runs & laughter' },
  { mood: 'Nature escape', label: 'Nature Escape', desc: 'Scenic hilltop ridges & fresh air' },
  { mood: 'Food hunt', label: 'Food Hunt', desc: 'Puneri misal, SPDP & heritage bites' },
  { mood: 'Art and culture', label: 'Art & Heritage', desc: 'Forts, ancient caves & zines' },
  { mood: 'Nightlife', label: 'Nightlife & Craft', desc: 'Microbreweries, live gigs & patios' },
  { mood: 'Solo reset', label: 'Solo Reset', desc: 'Barefoot tea lounges & quiet parks' },
  { mood: 'Something spontaneous', label: 'Spontaneous', desc: 'Surprise route across the city' }
];

const BUDGET_TIERS: { tier: BudgetTier; label: string; amount: number; desc: string }[] = [
  { tier: 'under-200', label: 'Under ₹200', amount: 200, desc: 'Student pocket money (Chai, bun maska, street snacks)' },
  { tier: '200-500', label: '₹200 – ₹500', amount: 450, desc: 'Casual café brunch, dosa feast or hill snack' },
  { tier: '500-1000', label: '₹500 – ₹1,000', amount: 800, desc: 'French bistro meal or craft beer flight' },
  { tier: '1000-2000', label: '₹1,000 – ₹2,000', amount: 1500, desc: 'Full premium dinner, cocktails & cab transfers' },
  { tier: 'custom', label: 'Custom Amount', amount: 600, desc: 'Specify exact amount per person' }
];

const DURATION_OPTIONS: { id: DurationOption; label: string; hours: string; stops: string }[] = [
  { id: '1-2-hours', label: 'Quick Hop', hours: '1–2 Hours', stops: '1 curated stop' },
  { id: '3-4-hours', label: 'Classic Outing', hours: '3–4 Hours', stops: '2 complementary stops' },
  { id: 'half-day', label: 'Half Day', hours: '5–6 Hours', stops: '3 curated stops with buffer' },
  { id: 'full-day', label: 'Full Day Immersion', hours: '7–9 Hours', stops: '4 curated stops across day' }
];

export default function OutingPlanner({ initialMood, initialArea }: { initialMood?: Mood; initialArea?: Neighborhood }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null);

  // Preference State
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([initialMood || 'Slow morning']);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('200-500');
  const [customBudgetAmount, setCustomBudgetAmount] = useState<number>(400);
  const [includeFood, setIncludeFood] = useState<boolean>(true);
  const [includeTransport, setIncludeTransport] = useState<boolean>(true);
  const [includeActivities, setIncludeActivities] = useState<boolean>(true);
  
  const [duration, setDuration] = useState<DurationOption>('3-4-hours');
  const [startingArea, setStartingArea] = useState<Neighborhood>(initialArea || 'FC Road & Deccan');
  
  const [groupSize, setGroupSize] = useState<GroupSize>('friends-2-3');
  const [groupCount, setGroupCount] = useState<number>(3);
  
  const [transportMode, setTransportMode] = useState<TransportMode>('two-wheeler');
  
  const [indoorOutdoor, setIndoorOutdoor] = useState<'any' | 'indoor' | 'outdoor'>('any');
  const [atmosphere, setAtmosphere] = useState<'any' | 'quiet' | 'lively'>('any');
  const [avoidCrowds, setAvoidCrowds] = useState<boolean>(false);

  // Sync group count with group size presets
  const handleGroupSizeChange = (size: GroupSize) => {
    setGroupSize(size);
    if (size === 'solo') setGroupCount(1);
    else if (size === 'couple') setGroupCount(2);
    else if (size === 'friends-2-3') setGroupCount(3);
    else if (size === 'group-4-6') setGroupCount(5);
    else setGroupCount(8);
  };

  const toggleMood = (mood: Mood) => {
    if (selectedMoods.includes(mood)) {
      if (selectedMoods.length > 1) {
        setSelectedMoods(selectedMoods.filter(m => m !== mood));
      }
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const getEffectiveMaxBudget = (): number => {
    if (budgetTier === 'custom') return customBudgetAmount;
    const tierObj = BUDGET_TIERS.find(b => b.tier === budgetTier);
    return tierObj ? tierObj.amount : 500;
  };

  const handleGenerate = () => {
    const preferences: UserPreferences = {
      moods: selectedMoods,
      budget: {
        tier: budgetTier,
        maxAmountPerPerson: getEffectiveMaxBudget(),
        includeFoodAndDrinks: includeFood,
        includeTransport: includeTransport,
        includeActivities: includeActivities,
        contingencyPercentage: 10
      },
      duration,
      startingNeighborhood: startingArea,
      groupSize,
      groupCount,
      transportMode,
      indoorOutdoorPreference: indoorOutdoor,
      atmospherePreference: atmosphere,
      avoidCrowds
    };

    const it = generateItinerary(preferences);
    setGeneratedItinerary(it);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplaceStop = (stopIndex: number, newPlace: Place) => {
    if (!generatedItinerary) return;
    const updated = replaceStopInItinerary(generatedItinerary, stopIndex, newPlace);
    setGeneratedItinerary(updated);
  };

  const handleRemoveStop = (stopIndex: number) => {
    if (!generatedItinerary) return;
    const updated = removeStopFromItinerary(generatedItinerary, stopIndex);
    setGeneratedItinerary(updated);
  };

  const handleReorderStop = (fromIndex: number, toIndex: number) => {
    if (!generatedItinerary) return;
    const newStops = [...generatedItinerary.stops];
    const item = newStops.splice(fromIndex, 1)[0];
    newStops.splice(toIndex, 0, item);
    // re-order numbers
    const renumbered = newStops.map((s, idx) => ({ ...s, order: idx + 1 }));
    setGeneratedItinerary({
      ...generatedItinerary,
      stops: renumbered
    });
  };

  // If already generated, render ItineraryView
  if (generatedItinerary) {
    return (
      <ItineraryView
        itinerary={generatedItinerary}
        onReplaceStop={handleReplaceStop}
        onRemoveStop={handleRemoveStop}
        onReorderStop={handleReorderStop}
        onRegenerate={handleGenerate}
        onReset={() => setGeneratedItinerary(null)}
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#E8E4DA] shadow-editorial p-6 sm:p-10 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Stepper Progress Bar */}
      <div className="space-y-3 pb-6 border-b border-[#F5F0E6]">
        <div className="flex items-center justify-between text-xs text-[#75726C]">
          <span className="font-semibold text-[#1E3A2F] uppercase tracking-wider">
            Concierge Step {currentStep} of 7
          </span>
          <span className="font-medium">
            {currentStep === 1 && 'Mood Selection'}
            {currentStep === 2 && 'Budget & Spending Parameters'}
            {currentStep === 3 && 'Available Duration'}
            {currentStep === 4 && 'Starting Location Hub'}
            {currentStep === 5 && 'Group Composition'}
            {currentStep === 6 && 'Transport Mode'}
            {currentStep === 7 && 'Atmosphere & Vibe Tuning'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#F5F0E6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1E3A2F] transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: Mood */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141312]">
              What kind of mood are we curating?
            </h2>
            <p className="text-xs sm:text-sm text-[#75726C] mt-1">
              Select one or more vibes. We balance stops so your afternoon flows naturally.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MOOD_OPTIONS.map(opt => {
              const isSelected = selectedMoods.includes(opt.mood);
              return (
                <button
                  key={opt.mood}
                  onClick={() => toggleMood(opt.mood)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between ${
                    isSelected
                      ? 'border-[#1E3A2F] bg-[#E3EDE8] text-[#1E3A2F] shadow-soft'
                      : 'border-[#E8E4DA] bg-[#FBF9F5] text-[#2A2926] hover:bg-white hover:border-[#C7C4BC]'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">{opt.label}</span>
                    <span className="text-xs text-[#54524D] mt-0.5 block">{opt.desc}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                    isSelected ? 'bg-[#1E3A2F] border-[#1E3A2F] text-white' : 'border-[#C7C4BC]'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: Budget */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141312]">
              Set your target budget per person.
            </h2>
            <p className="text-xs sm:text-sm text-[#75726C] mt-1">
              PunePulse never silently exceeds your budget. We match real dish and entry prices.
            </p>
          </div>

          {/* Tiers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {BUDGET_TIERS.map(b => {
              const isSelected = budgetTier === b.tier;
              return (
                <button
                  key={b.tier}
                  onClick={() => setBudgetTier(b.tier)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#1E3A2F] bg-[#E3EDE8] text-[#1E3A2F] shadow-soft'
                      : 'border-[#E8E4DA] bg-[#FBF9F5] text-[#2A2926] hover:bg-white hover:border-[#C7C4BC]'
                  }`}
                >
                  <span className="font-bold text-sm block">{b.label}</span>
                  <span className="text-xs text-[#54524D] mt-1 block">{b.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Custom Budget Slider */}
          {budgetTier === 'custom' && (
            <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1A1917]">Custom Budget Per Person:</span>
                <span className="font-serif text-xl font-bold text-[#C85A32]">₹{customBudgetAmount}</span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={customBudgetAmount}
                onChange={e => setCustomBudgetAmount(Number(e.target.value))}
                className="w-full accent-[#1E3A2F]"
              />
              <div className="flex justify-between text-[11px] text-[#75726C]">
                <span>₹100 (Pocket snack)</span>
                <span>₹1,500</span>
                <span>₹3,000 (Luxury outing)</span>
              </div>
            </div>
          )}

          {/* Included Expenses Checklist */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8E4DA] space-y-3">
            <span className="text-xs font-bold text-[#1A1917] block">
              What should be covered in this budget?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFood}
                  onChange={e => setIncludeFood(e.target.checked)}
                  className="rounded text-[#1E3A2F] focus:ring-0"
                />
                <span>Food & Drinks</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeTransport}
                  onChange={e => setIncludeTransport(e.target.checked)}
                  className="rounded text-[#1E3A2F] focus:ring-0"
                />
                <span>Transport / Fuel / Metro</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeActivities}
                  onChange={e => setIncludeActivities(e.target.checked)}
                  className="rounded text-[#1E3A2F] focus:ring-0"
                />
                <span>Entry & Activity Fees</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Available Duration */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141312]">
              How much time do you have in Pune today?
            </h2>
            <p className="text-xs sm:text-sm text-[#75726C] mt-1">
              We allocate realistic visit times and include Pune transfer buffers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DURATION_OPTIONS.map(d => {
              const isSelected = duration === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setDuration(d.id)}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#1E3A2F] bg-[#E3EDE8] text-[#1E3A2F] shadow-soft'
                      : 'border-[#E8E4DA] bg-[#FBF9F5] text-[#2A2926] hover:bg-white hover:border-[#C7C4BC]'
                  }`}
                >
                  <span className="font-serif font-bold text-lg block">{d.hours}</span>
                  <span className="font-semibold text-xs text-[#54524D] block mt-0.5">{d.label}</span>
                  <span className="text-[11px] text-[#75726C] mt-1 block">Yields {d.stops}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4: Starting Location */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141312]">
              Where are you setting off from?
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#C85A32] mt-1 font-medium">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Default is FC Road & Deccan. Not based on your GPS location.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {PUNE_AREAS.map(area => {
              const isSelected = startingArea === area.name;
              return (
                <button
                  key={area.id}
                  onClick={() => setStartingArea(area.name)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#1E3A2F] bg-[#E3EDE8] text-[#1E3A2F] shadow-soft'
                      : 'border-[#E8E4DA] bg-[#FBF9F5] text-[#2A2926] hover:bg-white hover:border-[#C7C4BC]'
                  }`}
                >
                  <span className="font-bold text-sm block">{area.name}</span>
                  <span className="text-[11px] text-[#54524D] line-clamp-1 mt-0.5">{area.tagline}</span>
                  {area.isMvpFocus && (
                    <span className="inline-block mt-2 text-[9px] font-bold uppercase tracking-wider text-[#C85A32]">
                      ★ Deepest verified data
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 5: Group Size */}
      {currentStep === 5 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141312]">
              Who are you venturing out with?
            </h2>
            <p className="text-xs sm:text-sm text-[#75726C] mt-1">
              Helps us calculate shared travel and find venues with suitable seating layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'solo', label: 'Solo Explorer', count: 1, desc: 'Quiet corners, reading & introspection' },
              { id: 'couple', label: 'Couple / Date', count: 2, desc: 'Intimate ambiance & romantic pace' },
              { id: 'friends-2-3', label: '2 or 3 Friends', count: 3, desc: 'College banter & easy café tables' },
              { id: 'group-4-6', label: 'Group of 4 to 6', count: 5, desc: 'Sprawling food feast & shared cabs' },
              { id: 'large-group', label: 'Larger Crew (7+)', count: 8, desc: 'Spacious microbreweries & lawns' },
            ].map(g => {
              const isSelected = groupSize === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => handleGroupSizeChange(g.id as GroupSize)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#1E3A2F] bg-[#E3EDE8] text-[#1E3A2F] shadow-soft'
                      : 'border-[#E8E4DA] bg-[#FBF9F5] text-[#2A2926] hover:bg-white hover:border-[#C7C4BC]'
                  }`}
                >
                  <span className="font-bold text-sm block">{g.label}</span>
                  <span className="text-xs text-[#54524D] mt-1 block">{g.desc}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] flex items-center justify-between text-xs">
            <span className="font-semibold text-[#1A1917]">Adjust exact headcount:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGroupCount(Math.max(1, groupCount - 1))}
                className="w-8 h-8 rounded-full bg-white border border-[#E8E4DA] flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="font-serif font-bold text-base text-[#1E3A2F]">{groupCount} people</span>
              <button
                onClick={() => setGroupCount(groupCount + 1)}
                className="w-8 h-8 rounded-full bg-white border border-[#E8E4DA] flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: Transport Preference */}
      {currentStep === 6 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141312]">
              How will you navigate the city?
            </h2>
            <p className="text-xs sm:text-sm text-[#75726C] mt-1">
              Influences route clustering, fuel cost estimates, and parking stress considerations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'two-wheeler', label: 'Two-Wheeler (Bike/Scooter)', desc: 'The authentic Pune way. 40% faster in traffic.' },
              { id: 'walking', label: 'Walking Only', desc: 'Tight proximity within FC Road or Deccan alleys.' },
              { id: 'public-transit', label: 'Public Transit / Metro', desc: 'Vanaz-Ruby Hall Metro corridor & buses.' },
              { id: 'car-cab', label: 'Car or Cab (Ola/Uber/Auto)', desc: 'Comfortable, factoring in parking delays.' },
              { id: 'flexible', label: 'Flexible / Auto Rickshaw', desc: 'Combination of hopping autos and walking.' }
            ].map(t => {
              const isSelected = transportMode === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTransportMode(t.id as TransportMode)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#1E3A2F] bg-[#E3EDE8] text-[#1E3A2F] shadow-soft'
                      : 'border-[#E8E4DA] bg-[#FBF9F5] text-[#2A2926] hover:bg-white hover:border-[#C7C4BC]'
                  }`}
                >
                  <span className="font-bold text-sm block">{t.label}</span>
                  <span className="text-xs text-[#54524D] mt-1 block">{t.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 7: Optional Atmosphere & Pace */}
      {currentStep === 7 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141312]">
              Fine-tune the atmosphere (Optional).
            </h2>
            <p className="text-xs sm:text-sm text-[#75726C] mt-1">
              Add any specific architectural or crowd constraints before we compute your day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Setting: Indoor vs Outdoor */}
            <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] space-y-2">
              <span className="font-bold text-[#1A1917] block">Environment:</span>
              <div className="flex gap-2">
                {[
                  { id: 'any', label: 'Any Setting' },
                  { id: 'outdoor', label: 'Garden & Open-Air' },
                  { id: 'indoor', label: 'Air-Conditioned / Indoor' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setIndoorOutdoor(opt.id as any)}
                    className={`px-3 py-1.5 rounded-full border ${
                      indoorOutdoor === opt.id
                        ? 'bg-[#1E3A2F] text-white border-[#1E3A2F]'
                        : 'bg-white text-[#3D3B37] border-[#E8E4DA]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Atmosphere: Quiet vs Lively */}
            <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] space-y-2">
              <span className="font-bold text-[#1A1917] block">Noise & Energy:</span>
              <div className="flex gap-2">
                {[
                  { id: 'any', label: 'Any Vibe' },
                  { id: 'quiet', label: 'Quiet & Relaxed' },
                  { id: 'lively', label: 'Lively & Buzzing' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setAtmosphere(opt.id as any)}
                    className={`px-3 py-1.5 rounded-full border ${
                      atmosphere === opt.id
                        ? 'bg-[#1E3A2F] text-white border-[#1E3A2F]'
                        : 'bg-white text-[#3D3B37] border-[#E8E4DA]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Crowd toggle */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8E4DA] flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-[#1A1917] block">Avoid peak weekend crowds?</span>
              <span className="text-[#75726C]">Prioritizes unhurried courtyards and off-peak stops.</span>
            </div>
            <input
              type="checkbox"
              checked={avoidCrowds}
              onChange={e => setAvoidCrowds(e.target.checked)}
              className="w-5 h-5 rounded text-[#1E3A2F] focus:ring-0"
            />
          </div>

          {/* Review Summary Capsule */}
          <div className="p-5 rounded-2xl bg-[#E3EDE8] border border-[#B9E4D0] space-y-2 text-xs">
            <span className="font-semibold text-[#1E3A2F] block">Ready to Generate Outing:</span>
            <div className="text-[#2A2926] leading-relaxed">
              • <strong>Mood:</strong> {selectedMoods.join(', ')} <br />
              • <strong>Budget:</strong> ₹{getEffectiveMaxBudget()} / person ({groupCount} people) <br />
              • <strong>Duration:</strong> {duration.replace('-', ' ')} starting from {startingArea} <br />
              • <strong>Transport:</strong> {transportMode}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons: Prev / Next / Generate */}
      <div className="pt-6 border-t border-[#F5F0E6] flex items-center justify-between">
        {currentStep > 1 ? (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#E8E4DA] text-xs font-semibold text-[#2A2926] hover:bg-[#F5F0E6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < 7 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#284E3F] transition-all shadow-soft"
          >
            <span>Next Step</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C85A32] text-white text-sm font-semibold hover:bg-[#D9714B] transition-all shadow-editorial transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Create My Outing Itinerary</span>
          </button>
        )}
      </div>

    </div>
  );
}
