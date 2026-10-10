'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import { Compass, Search, MapPin, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { PUNE_AREAS } from '../../data/areas';
import { Neighborhood } from '../../types/place';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>('FC Road & Deccan');
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8E4DA] shadow-soft-sm py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="group flex items-center gap-2.5 focus:outline-none">
            <span className="w-8 h-8 rounded-full bg-[#1E3A2F] text-[#FBF9F5] flex items-center justify-center font-serif text-lg font-bold shadow-sm group-hover:scale-105 transition-transform">
              P
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1A1917]">
                Pune<span className="text-[#C85A32]">Pulse</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#75726C] -mt-1 font-medium hidden sm:inline">
                Local Discovery & Planner
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-[#3D3B37]">
            <a
              href="/#discover"
              className="hover:text-[#1E3A2F] transition-colors py-1 hover:border-b-2 hover:border-[#1E3A2F]"
            >
              Discover
            </a>
            <a
              href="/#moods"
              className="hover:text-[#1E3A2F] transition-colors py-1 hover:border-b-2 hover:border-[#1E3A2F]"
            >
              Explore by Mood
            </a>
            <a
              href="/plan"
              className="hover:text-[#1E3A2F] transition-colors py-1 hover:border-b-2 hover:border-[#1E3A2F]"
            >
              Plan an Outing
            </a>
            <a
              href="/#hidden-gems"
              className="hover:text-[#1E3A2F] transition-colors py-1 hover:border-b-2 hover:border-[#1E3A2F]"
            >
              Hidden Gems
            </a>
          </nav>

          {/* Area Selector & Quick Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Area Pill */}
            <div className="relative">
              <button
                onClick={() => setAreaDropdownOpen(!areaDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#F5F0E6] text-[#3D3B37] hover:bg-[#EBE3D3] transition-colors border border-[#E8E4DA]"
                title="Select active area"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>{selectedArea}</span>
              </button>

              {areaDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-editorial border border-[#E8E4DA] py-2 z-50 animate-fadeIn">
                  <div className="px-3 py-1 text-[11px] font-semibold text-[#75726C] uppercase tracking-wider">
                    Browse Areas
                  </div>
                  {PUNE_AREAS.map(area => (
                    <button
                      key={area.id}
                      onClick={() => {
                        setSelectedArea(area.name);
                        setAreaDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-[#2A2926] hover:bg-[#F5F0E6] flex items-center justify-between"
                    >
                      <span>{area.name}</span>
                      {area.isMvpFocus && (
                        <span className="text-[10px] bg-[#E3EDE8] text-[#1E3A2F] px-1.5 py-0.5 rounded font-medium">
                          Deep Guide
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Plan Outing CTA */}
            <a
              href="/plan"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#1E3A2F] text-[#FBF9F5] hover:bg-[#284E3F] transition-all shadow-soft hover:shadow-soft-lg transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5F0E6]" />
              <span>Plan My Day</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="/plan"
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1E3A2F] text-white"
            >
              Plan
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#3D3B37] hover:bg-[#F5F0E6] focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-4 pb-6 px-4 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E8E4DA] shadow-editorial space-y-4">
            <div className="flex flex-col space-y-3 font-medium text-sm text-[#2A2926]">
              <a
                href="/#discover"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#F5F0E6]"
              >
                Discover Places
              </a>
              <a
                href="/#moods"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#F5F0E6]"
              >
                Explore by Mood
              </a>
              <a
                href="/plan"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#F5F0E6] text-[#C85A32] font-semibold"
              >
                Personalized Outing Planner
              </a>
              <a
                href="/#hidden-gems"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#F5F0E6]"
              >
                Pune Hidden Gems
              </a>
              <a
                href="/#areas"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1"
              >
                Explore Neighborhoods
              </a>
            </div>

            <div className="pt-2 border-t border-[#E8E4DA] flex items-center justify-between">
              <span className="text-xs text-[#75726C]">Active Area:</span>
              <span className="text-xs font-semibold text-[#1E3A2F]">{selectedArea}</span>
            </div>

            <a
              href="/plan"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1E3A2F] text-white text-sm font-semibold shadow-soft"
            >
              <span>Launch Outing Planner</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

      </div>
    </header>
  );
}
