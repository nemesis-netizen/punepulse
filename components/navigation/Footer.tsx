import React from 'react';
import { MapPin, Compass, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#141312] text-[#E8E6E1] pt-16 pb-12 border-t border-[#2A2926]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2A2926]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#1E3A2F] text-[#FBF9F5] flex items-center justify-center font-serif text-sm font-bold">
                P
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FBF9F5]">
                Pune<span className="text-[#C85A32]">Pulse</span>
              </span>
            </div>
            <p className="font-serif italic text-lg text-[#C7C4BC]">
              “Find your kind of Pune. Less planning. More living.”
            </p>
            <p className="text-xs text-[#9E9A92] leading-relaxed max-w-sm">
              An independent, premium city guide and outing planning engine crafted for college students, young professionals, and urban explorers. Built to make exploring Pune effortless, honest, and unforgettable.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#A0EAC9] bg-[#1E3A2F]/60 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Independent & Unbiased — No Paid Placements</span>
            </div>
          </div>

          {/* Explore Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FBF9F5]">
              Explore Areas
            </h4>
            <ul className="space-y-2 text-xs text-[#9E9A92]">
              <li><a href="/#areas" className="hover:text-white transition-colors">FC Road & Deccan (Full Guide)</a></li>
              <li><a href="/#areas" className="hover:text-white transition-colors">JM Road & Riverside</a></li>
              <li><a href="/#areas" className="hover:text-white transition-colors">Koregaon Park & Lanes</a></li>
              <li><a href="/#areas" className="hover:text-white transition-colors">Kalyani Nagar</a></li>
              <li><a href="/#areas" className="hover:text-white transition-colors">Kothrud & Mayur Colony</a></li>
              <li><a href="/#areas" className="hover:text-white transition-colors">Vetal Tekdi & Pashan</a></li>
              <li><a href="/#areas" className="hover:text-white transition-colors">Camp & MG Road</a></li>
            </ul>
          </div>

          {/* Discovery by Mood */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FBF9F5]">
              By Mood
            </h4>
            <ul className="space-y-2 text-xs text-[#9E9A92]">
              <li><a href="/#moods" className="hover:text-white transition-colors">Slow Morning & Chai</a></li>
              <li><a href="/#moods" className="hover:text-white transition-colors">Coffee & Deep Talks</a></li>
              <li><a href="/#moods" className="hover:text-white transition-colors">Golden Hour & Sunsets</a></li>
              <li><a href="/#moods" className="hover:text-white transition-colors">Friends & Chaotic Food Runs</a></li>
              <li><a href="/#moods" className="hover:text-white transition-colors">Nature & Hill Ridges</a></li>
              <li><a href="/#moods" className="hover:text-white transition-colors">Solo Sanctuary & Reading</a></li>
            </ul>
          </div>

          {/* Ethics & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FBF9F5]">
              Integrity & Data
            </h4>
            <ul className="space-y-2 text-xs text-[#9E9A92]">
              <li><a href="#accuracy" className="hover:text-white transition-colors">Data Accuracy Policy</a></li>
              <li><a href="#corrections" className="hover:text-white transition-colors">Suggest a Correction</a></li>
              <li><a href="#traffic-model" className="hover:text-white transition-colors">Traffic Guidance Heuristics</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Local-Only Storage (Privacy)</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Experience</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#75726C] gap-4">
          <p>
            © {new Date().getFullYear()} PunePulse. Built for the lovers of Pune.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-[#C85A32] fill-current" />
              <span>in Maharashtra, India</span>
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="text-[11px] text-[#9E9A92]">
              Travel times & budgets are verified heuristics. Always check live conditions.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
