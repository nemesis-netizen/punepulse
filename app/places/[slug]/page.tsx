import React from 'react';
import { notFound } from 'next/navigation';
import { PUNE_PLACES } from '../../../data/places';
import { PUNE_TRAFFIC_PATTERNS } from '../../../data/traffic-guidance';
import { MapPin, Clock, IndianRupee, Car, ShieldCheck, ExternalLink, Sparkles, Footprints, Train } from 'lucide-react';

export function generateStaticParams() {
  return PUNE_PLACES.map(place => ({
    slug: place.slug,
  }));
}

export default function PlaceDetailPage({ params }: { params: { slug: string } }) {
  const place = PUNE_PLACES.find(p => p.slug === params.slug);

  if (!place) {
    notFound();
  }

  const traffic = PUNE_TRAFFIC_PATTERNS[place.neighborhood] || PUNE_TRAFFIC_PATTERNS['FC Road & Deccan'];

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Hero Banner */}
      <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full rounded-3xl overflow-hidden shadow-editorial bg-[#141312]">
        <img
          src={place.imageUrl}
          alt={place.name}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1E3A2F]">
              {place.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
              {place.neighborhood}
            </span>
            {place.isVerified && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#A0EAC9]/30 text-[#A0EAC9] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Local Spot
              </span>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            {place.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#E8E6E1] max-w-xl font-normal">
            {place.shortDescription}
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left 8 cols: Editorial Description */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DA] shadow-soft-sm space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32] block mb-2">
                Editorial Overview
              </span>
              <p className="text-sm sm:text-base text-[#2A2926] leading-relaxed">
                {place.fullDescription}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F0E6] border border-[#E8E4DA] flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-sm text-[#1A1917] block">Why Visit</strong>
                <p className="text-xs text-[#54524D] mt-0.5 leading-relaxed">{place.whyVisit}</p>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-[#75726C] block mb-2">Best Suited For</span>
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
          </section>

          {/* Timing & Optimal Windows */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DA] shadow-soft-sm space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A2F] block">
              Optimal Visiting Windows & Crowd Guidance
            </span>
            <p className="text-xs sm:text-sm text-[#2A2926] leading-relaxed">
              {place.bestTimeNote}
            </p>

            <div className="p-4 rounded-2xl bg-[#E3EDE8]/50 border border-[#B9E4D0] space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-[#1E3A2F]">
                <Car className="w-4 h-4" />
                <span>Typical Neighborhood Traffic Advice</span>
              </div>
              <p className="text-[#3D3B37]">
                {traffic.weekdayEveningPeak} can slow traffic at {traffic.keyBottlenecks.join(', ')}.
              </p>
              <p className="text-[#54524D]">
                <strong>Suggested window:</strong> {traffic.recommendedDepartureWindows.afternoon} or {traffic.recommendedDepartureWindows.evening}.
              </p>
            </div>
          </section>
        </div>

        {/* Right 4 cols: Practical Fast Facts & Planning Action */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E8E4DA] shadow-soft-sm space-y-5 text-xs">
            <h3 className="font-serif text-lg font-bold text-[#141312]">
              Practical Information
            </h3>

            <div className="space-y-4 divide-y divide-[#F5F0E6]">
              <div className="space-y-1">
                <span className="text-[#75726C] text-[11px] block">Average Spend</span>
                <span className="font-serif text-xl font-bold text-[#1E3A2F]">
                  {place.priceBasis === 'free' ? 'Free Entry' : `₹${place.averageVisitCost} / person`}
                </span>
                <span className="text-[11px] text-[#75726C] block">
                  Range: {place.priceBasis === 'free' ? '₹0' : `₹${place.priceMin} – ₹${place.priceMax}`}
                </span>
              </div>

              <div className="pt-3 space-y-1">
                <span className="text-[#75726C] text-[11px] block">Operating Hours</span>
                <span className="font-semibold text-[#1A1917]">{place.openingHours}</span>
              </div>

              <div className="pt-3 space-y-1">
                <span className="text-[#75726C] text-[11px] block">Address</span>
                <span className="text-[#3D3B37] leading-relaxed block">{place.address}</span>
              </div>

              <div className="pt-3 space-y-1">
                <span className="text-[#75726C] text-[11px] block">Transit & Parking</span>
                <span className="text-[#54524D] block">
                  {place.transportAccessibility.nearestMetroOrBus}. Two-wheeler: {place.transportAccessibility.twoWheelerParking}; Car: {place.transportAccessibility.carParking}.
                </span>
              </div>
            </div>

            <div className="pt-3 space-y-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full border border-[#E8E4DA] text-xs font-semibold text-[#2A2926] hover:bg-[#F5F0E6] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`/plan?startingArea=${encodeURIComponent(place.neighborhood)}`}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#284E3F] transition-all shadow-soft"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Plan Outing Around This</span>
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
