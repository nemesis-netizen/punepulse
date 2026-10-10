import { Place, Neighborhood, Category, Mood } from '../types/place';

export interface FilterState {
  searchQuery: string;
  selectedNeighborhood: Neighborhood | 'all';
  selectedCategory: Category | 'all';
  selectedMood: Mood | 'all';
  priceTier: 'all' | 'under-200' | '200-500' | '500-1000' | '1000-plus';
  verifiedOnly: boolean;
  indoorOutdoor: 'all' | 'indoor' | 'outdoor';
}

export function filterPlaces(places: Place[], filters: FilterState): Place[] {
  return places.filter(place => {
    // 1. Search Query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchesName = place.name.toLowerCase().includes(q);
      const matchesDesc = place.shortDescription.toLowerCase().includes(q) || place.fullDescription.toLowerCase().includes(q);
      const matchesSubcategory = place.subcategory.toLowerCase().includes(q);
      const matchesTags = place.tags.some(t => t.toLowerCase().includes(q));
      const matchesNeighborhood = place.neighborhood.toLowerCase().includes(q);
      if (!matchesName && !matchesDesc && !matchesSubcategory && !matchesTags && !matchesNeighborhood) {
        return false;
      }
    }

    // 2. Neighborhood
    if (filters.selectedNeighborhood !== 'all') {
      if (place.neighborhood !== filters.selectedNeighborhood) {
        return false;
      }
    }

    // 3. Category
    if (filters.selectedCategory !== 'all') {
      if (place.category !== filters.selectedCategory) {
        return false;
      }
    }

    // 4. Mood
    if (filters.selectedMood !== 'all') {
      if (!place.moods.includes(filters.selectedMood)) {
        return false;
      }
    }

    // 5. Price Tier
    if (filters.priceTier !== 'all') {
      const cost = place.averageVisitCost;
      if (filters.priceTier === 'under-200' && cost > 200) return false;
      if (filters.priceTier === '200-500' && (cost < 200 || cost > 500)) return false;
      if (filters.priceTier === '500-1000' && (cost < 500 || cost > 1000)) return false;
      if (filters.priceTier === '1000-plus' && cost < 1000) return false;
    }

    // 6. Verified Only
    if (filters.verifiedOnly && !place.isVerified) {
      return false;
    }

    // 7. Indoor / Outdoor
    if (filters.indoorOutdoor !== 'all') {
      if (place.indoorOutdoor !== filters.indoorOutdoor && place.indoorOutdoor !== 'both') {
        return false;
      }
    }

    return true;
  });
}
