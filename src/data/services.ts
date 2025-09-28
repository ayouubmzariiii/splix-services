import { Service } from '@/types';
import servicesConfig from '@/config/services-config.json';

export const services: Service[] = servicesConfig.services.map(service => ({
  id: service.id,
  name: service.name,
  description: service.description,
  price: service.discountedPrice,
  originalPrice: service.originalPrice,
  icon: service.icon,
  category: service.category,
  features: service.features,
  popular: service.popular || false
}));