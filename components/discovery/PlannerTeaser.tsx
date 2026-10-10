import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, IndianRupee, Clock, Compass } from 'lucide-react';

export default function PlannerTeaser() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#F5F0E6]/50 via-[#FBF9F5] to-white border-t border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#1E3A2F] text-[#FBF9F5] overflow-hidden p-8 sm:p-14 shadow-editorial">
          
          {/* Subtle background ambient pulse */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C85A32]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold tracking-wide text-[#A0EAC9]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE PERSONALIZED OUTING ENGINE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Tell us the vibe. <br />
              <span className="italic font-normal text-[#F5F0E6]">We’ll figure out the rest.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#C7C4BC] leading-relaxed">
              Skip the 45-minute WhatsApp debates and generic review lists. Choose your mood, budget (e.g. ₹350/person), hours available, and starting area. We build an ordered, time-buffered itinerary with realistic spend estimates and transport buffers.
            </p>

            {/* Checklist of what user receives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#E8E6E1] pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A0EAC9] shrink-0" />
                <span>Deterministic budget breakdown</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A0EAC9] shrink-0" />
                <span>Honest Pune traffic buffers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A0EAC9] shrink-0" />
                <span>Instant stop swaps & alternatives</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A0EAC9] shrink-0" />
                <span>No signup required · Save & share</span>
              </div>
            </div>

            {/* Launch CTA */}
            <div className="pt-4">
              <a
                href="/plan"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C85A32] text-white text-sm font-semibold hover:bg-[#D9714B] transition-all shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Launch Outing Planner</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
