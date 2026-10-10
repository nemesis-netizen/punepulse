import React from 'react';
import { ArrowRight, Compass, Sparkles, MapPin, Clock, IndianRupee } from 'lucide-react';
import TopographicCanvas from './TopographicCanvas';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-[#F5F0E6]/80 via-transparent to-transparent -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Editorial Content (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3EDE8] border border-[#B9E4D0] text-[#1E3A2F] text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2F]" />
              <span>THE CURATED CITY DISCOVERY JOURNAL</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#141312] leading-[1.08]">
              Your Pune. <br />
              <span className="italic font-normal text-[#C85A32]">Your pace.</span>
            </h1>

            {/* Supporting Editorial Paragraph */}
            <p className="text-base sm:text-lg text-[#54524D] leading-relaxed max-w-xl font-normal">
              From hidden heritage bakeries and breezy hilltop quarries to late-night filter coffee and unhurried conversations — discover the places that fit your exact mood, budget, and afternoon hours.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="/plan"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#1E3A2F] text-[#FBF9F5] text-sm font-semibold hover:bg-[#284E3F] transition-all shadow-editorial hover:shadow-soft-lg transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4 text-[#F5F0E6]" />
                <span>Plan My Outing</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="#discover"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-[#2A2926] text-sm font-medium hover:bg-[#F5F0E6] transition-all border border-[#E8E4DA] shadow-soft-sm"
              >
                <Compass className="w-4 h-4 text-[#75726C]" />
                <span>Explore The City</span>
              </a>
            </div>

            {/* Value Indicators Strip */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E8E4DA]/80 max-w-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1917]">
                  <IndianRupee className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Real Budgets</span>
                </div>
                <p className="text-[11px] text-[#75726C] leading-snug">
                  From ₹80 bun maska to ₹900 craft brews.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1917]">
                  <Clock className="w-3.5 h-3.5 text-[#1E3A2F]" />
                  <span>Time-Smart</span>
                </div>
                <p className="text-[11px] text-[#75726C] leading-snug">
                  Honest traffic buffers and ideal windows.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1917]">
                  <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>FC Road Core</span>
                </div>
                <p className="text-[11px] text-[#75726C] leading-snug">
                  Deep Deccan & FC Road verified listings.
                </p>
              </div>
            </div>

          </div>

          {/* Right Topographic Canvas Visual (5 cols) */}
          <div className="lg:col-span-5 w-full h-[400px] sm:h-[480px]">
            <TopographicCanvas />
          </div>

        </div>
      </div>
    </section>
  );
}
