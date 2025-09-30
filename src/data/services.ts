import { Service } from '@/types';
import { getServices } from '@/lib/firestore';

// Cache for services data
let servicesCache: Service[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getServicesData(): Promise<Service[]> {
  // Check if we have valid cached data
  if (servicesCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return servicesCache;
  }

  try {
    const firestoreServices = await getServices();
    
    // Check if firestoreServices is valid before mapping
    if (!firestoreServices || !Array.isArray(firestoreServices)) {
      throw new Error('Invalid services data received from Firestore');
    }
    
    // Transform Firestore data to match the Service interface
    servicesCache = firestoreServices.map((service: Record<string, unknown>) => ({
      id: service.id as string,
      name: service.name as string,
      description: service.description as string,
      price: service.discountedPrice as number,
      originalPrice: service.originalPrice as number,
      icon: service.icon as string,
      category: service.category as string,
      features: service.features as string[],
      popular: (service.popular as boolean) || false
    }));
    
    cacheTimestamp = Date.now();
    return servicesCache;
  } catch (error) {
    console.error('Error loading services from Firestore:', error);
    
    // Fallback to empty array or throw error based on your preference
    throw new Error('Failed to load services data');
  }
}

// For backward compatibility, export a promise that resolves to services
export const services = getServicesData();