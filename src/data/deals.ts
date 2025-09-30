import { DealsService } from '@/lib/firestore';

export interface Deal {
  id: string;
  name: string;
  description: string;
  badge: string;
  serviceIds: string[];
  originalPrice: number;
  dealPrice: number;
  discountPercentage: number;
  promoCode: string;
  features: string[];
  priority: number;
  isActive: boolean;
  validUntil: Date;
  createdAt: Date;
}

// Cache for deals data
let dealsCache: Deal[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getDealsData(): Promise<Deal[]> {
  // Check if cache is valid
  if (dealsCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return dealsCache;
  }

  try {
    const result = await DealsService.getActiveDeals();
    
    if (!result.success || !result.data) {
      return [];
    }
    
    // Convert Firestore timestamps to Date objects
    const processedDeals = result.data.map((deal: Record<string, unknown>) => ({
      ...deal,
      validUntil: deal.validUntil instanceof Date ? deal.validUntil : new Date(deal.validUntil as string),
      createdAt: deal.createdAt instanceof Date ? deal.createdAt : new Date(deal.createdAt as string)
    })) as Deal[];

    // Update cache
    dealsCache = processedDeals;
    cacheTimestamp = Date.now();
    
    return processedDeals;
  } catch (error) {
    console.error('Error fetching deals:', error);
    return [];
  }
}

export async function getHotDeal(): Promise<Deal | null> {
  try {
    const result = await DealsService.getHotDeal();
    if (!result.success || !result.data) return null;
    
    const deal = result.data as Record<string, unknown>;
    return {
      ...deal,
      validUntil: deal.validUntil instanceof Date ? deal.validUntil : new Date(deal.validUntil as string),
      createdAt: deal.createdAt instanceof Date ? deal.createdAt : new Date(deal.createdAt as string)
    } as Deal;
  } catch (error) {
    console.error('Error fetching hot deal:', error);
    return null;
  }
}

export async function getDealById(id: string): Promise<Deal | null> {
  try {
    const result = await DealsService.getDealById(id);
    if (!result.success || !result.data) return null;
    
    const deal = result.data as Record<string, unknown>;
    return {
      ...deal,
      validUntil: deal.validUntil instanceof Date ? deal.validUntil : new Date(deal.validUntil as string),
      createdAt: deal.createdAt instanceof Date ? deal.createdAt : new Date(deal.createdAt as string)
    } as Deal;
  } catch (error) {
    console.error('Error fetching deal by ID:', error);
    return null;
  }
}