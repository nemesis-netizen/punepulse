'use client';

import React, { Suspense } from 'react';
import OutingPlanner from '../../components/planner/OutingPlanner';
import { Sparkles, MapPin, ShieldCheck } from 'lucide-react';
import { Mood, Neighborhood } from '../../types/place';

function PlannerContent() {
  const [initialMood, setInitialMood] = React.useState<Mood | undefined>(undefined);
  const [initialArea, setInitialArea] = React.useState<Neighborhood | undefined>(undefined);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const moodParam = params.get('mood') as Mood | null;
      const areaParam = params.get('startingArea') as Neighborhood | null;
      if (moodParam) setInitialMood(moodParam);
      if (areaParam) setInitialArea(areaParam);
    }
  }, []);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3EDE8] text-[#1E3A2F] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ALGORITHMIC PUNE CONCIERGE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#141312]">
          Design your perfect day in Pune.
        </h1>
        <p className="text-xs sm:text-sm text-[#75726C] leading-relaxed">
          Set your budget, available hours, and neighborhood. We compute real stops, travel buffers, and honest spending estimates without marketing hype.
        </p>
      </div>

      {/* 8-Step Interactive Planner */}
      <OutingPlanner
        initialMood={initialMood}
        initialArea={initialArea}
      />
    </div>
  );
}

export default function PlanPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading planner...</div>}>
      <PlannerContent />
    </Suspense>
  );
}
