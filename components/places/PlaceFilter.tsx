'use client';

import React from 'react';
import { FilterState } from '../../lib/filters';
import { Neighborhood, Category, Mood } from '../../types/place';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { PUNE_AREAS } from '../../data/areas';

interface PlaceFilterProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalMatches: number;
}

const CATEGORIES: Category[] = [
  'Cafés & Bakeries',
  'Iconic Eateries',
  'Bars & Nightlife',
  'Nature & Hills',
  'Heritage & Culture',
  'Quiet & Books'
];

export default function PlaceFilter({ filters, onChange, onReset, totalMatches }: PlaceFilterProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E8E4DA] shadow-soft-sm space-y-5">
      
      {/* Top Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#75726C] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name, dish, street, or vibe (e.g. SPDP, bun maska, sunset, quiet)..."
          value={filters.searchQuery}
          onChange={e => onChange({ ...filters, searchQuery: e.target.value })}
          className="w-full pl-11 pr-10 py-3 rounded-full border border-[#E8E4DA] bg-[#FBF9F5] text-xs text-[#1A1917] placeholder-[#9E9A92] focus:outline-none focus:border-[#1E3A2F] focus:bg-white transition-all"
        />
        {filters.searchQuery && (
          <button
            onClick={() => onChange({ ...filters, searchQuery: '' })}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#75726C] hover:text-[#1A1917]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Row: Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onChange({ ...filters, selectedCategory: 'all' })}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
            filters.selectedCategory === 'all'
              ? 'bg-[#1E3A2F] text-white border-[#1E3A2F]'
              : 'bg-[#FBF9F5] text-[#54524D] border-[#E8E4DA] hover:bg-white'
          }`}
        >
          All Categories
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onChange({ ...filters, selectedCategory: cat })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              filters.selectedCategory === cat
                ? 'bg-[#1E3A2F] text-white border-[#1E3A2F]'
                : 'bg-[#FBF9F5] text-[#54524D] border-[#E8E4DA] hover:bg-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Secondary Controls: Neighborhood, Price Tier, Verified */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#F5F0E6] text-xs">
        
        {/* Neighborhood Selector */}
        <div>
          <label className="text-[11px] font-semibold text-[#75726C] block mb-1">
            Neighborhood
          </label>
          <select
            value={filters.selectedNeighborhood}
            onChange={e => onChange({ ...filters, selectedNeighborhood: e.target.value as any })}
            className="w-full px-3 py-2 rounded-xl border border-[#E8E4DA] bg-[#FBF9F5] text-xs text-[#2A2926] focus:outline-none focus:border-[#1E3A2F]"
          >
            <option value="all">All Pune Neighborhoods</option>
            {PUNE_AREAS.map(a => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Tier */}
        <div>
          <label className="text-[11px] font-semibold text-[#75726C] block mb-1">
            Spend Per Person
          </label>
          <select
            value={filters.priceTier}
            onChange={e => onChange({ ...filters, priceTier: e.target.value as any })}
            className="w-full px-3 py-2 rounded-xl border border-[#E8E4DA] bg-[#FBF9F5] text-xs text-[#2A2926] focus:outline-none focus:border-[#1E3A2F]"
          >
            <option value="all">Any Price</option>
            <option value="under-200">Pocket Friendly (Under ₹200)</option>
            <option value="200-500">Casual Café (₹200 – ₹500)</option>
            <option value="500-1000">Gourmet / Bistro (₹500 – ₹1,000)</option>
            <option value="1000-plus">Premium / Craft (₹1,000+)</option>
          </select>
        </div>

        {/* Setting & Quick Reset */}
        <div className="flex items-end justify-between gap-2">
          <div className="flex items-center gap-2 pb-2">
            <input
              type="checkbox"
              id="verifiedOnly"
              checked={filters.verifiedOnly}
              onChange={e => onChange({ ...filters, verifiedOnly: e.target.checked })}
              className="rounded text-[#1E3A2F] focus:ring-0"
            />
            <label htmlFor="verifiedOnly" className="cursor-pointer text-xs font-medium text-[#2A2926]">
              Verified Only
            </label>
          </div>

          <button
            onClick={onReset}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-[#75726C] hover:text-[#1A1917] hover:bg-[#F5F0E6] transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

      </div>

      {/* Active Count Result Pill */}
      <div className="flex items-center justify-between text-[11px] text-[#75726C] pt-2 border-t border-[#F5F0E6]">
        <span>Showing <strong>{totalMatches}</strong> places matching your criteria</span>
        {filters.selectedNeighborhood === 'FC Road & Deccan' && (
          <span className="text-[#1E3A2F] font-semibold">★ Core MVP Verified Zone</span>
        )}
      </div>

    </div>
  );
}
