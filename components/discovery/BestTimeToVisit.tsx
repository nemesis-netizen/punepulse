import React from 'react';
import { Sun, CloudSun, Sunset, Moon, Coffee } from 'lucide-react';

export default function BestTimeToVisit() {
  const windows = [
    {
      time: '6:00 AM – 8:30 AM',
      name: 'Early Morning Calm',
      vibe: 'Brisk hill air, birdsong & piping hot Irani chai',
      description: 'Ideal for Vetal Tekdi, Taljai hill trails, and Café Goodluck bun maska before the college rush wakes up.',
      bestFor: 'Nature ridges & vintage breakfast',
      icon: <Sun className="w-5 h-5 text-[#D97706]" />,
      bg: 'bg-[#FFFBEB]',
      border: 'border-[#FEF3C7]'
    },
    {
      time: '1:30 PM – 4:30 PM',
      name: 'Weekday Afternoon Slowdown',
      vibe: 'Unrushed reading, deep conversations & shaded cool',
      description: 'While traditional Peth shops observe afternoon siesta, indie book cafés like Pagdandi and heritage spots like Pataleshwar Cave are at their most tranquil.',
      bestFor: 'Book browsing & quiet reading',
      icon: <Coffee className="w-5 h-5 text-[#854D0E]" />,
      bg: 'bg-[#FDFBF7]',
      border: 'border-[#E8E4DA]'
    },
    {
      time: '4:45 PM – 6:30 PM',
      name: 'The Golden Hour Shift',
      vibe: 'Long shadows, mild breezes & street buzz firing up',
      description: 'The golden hour over FC Road’s tree canopy and Kamala Nehru Park. Street vendors set up, aromas of roasted corn and dosa fill the air.',
      bestFor: 'Sunset viewpoints & casual street walks',
      icon: <Sunset className="w-5 h-5 text-[#C85A32]" />,
      bg: 'bg-[#FDF2F2]',
      border: 'border-[#FCECE6]'
    },
    {
      time: '7:00 PM – 10:30 PM',
      name: 'Evening Social Peak',
      vibe: 'Vibrant youth energy, outdoor courtyards & dinner queues',
      description: 'Goodluck Chowk, Vaishali, and Koregaon Park patios reach peak buzz. Plan 15–20 minute table waiting buffers on weekends.',
      bestFor: 'Group dinners, dessert runs & live gigs',
      icon: <Moon className="w-5 h-5 text-[#1E3A2F]" />,
      bg: 'bg-[#E3EDE8]',
      border: 'border-[#B9E4D0]'
    }
  ];

  return (
    <section className="py-20 bg-[#FBF9F5] border-t border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
            Local Timing Heuristics
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#141312]">
            The exact same place feels completely different at different hours.
          </h2>
          <p className="text-xs sm:text-sm text-[#75726C] leading-relaxed">
            Pune’s charm is all about timing. Here is how the city breathes across the day so you can choose the right departure window.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {windows.map((w, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border ${w.border} ${w.bg} flex flex-col justify-between space-y-4 shadow-soft-sm hover:shadow-soft transition-all`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A1917] tracking-wider uppercase font-mono">
                    {w.time}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {w.icon}
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#141312]">
                  {w.name}
                </h3>

                <p className="text-xs font-serif italic text-[#C85A32]">
                  {w.vibe}
                </p>

                <p className="text-xs text-[#54524D] leading-relaxed">
                  {w.description}
                </p>
              </div>

              <div className="pt-3 border-t border-black/5 text-[11px] font-semibold text-[#1E3A2F]">
                ★ Best for: {w.bestFor}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-[#75726C] italic text-center mt-8">
          * General city heuristics, not guarantees. Individual venue hours and seasonal weather may vary.
        </p>

      </div>
    </section>
  );
}
