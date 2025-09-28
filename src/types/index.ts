export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  icon: string;
  category: string;
  features: string[];
  popular?: boolean;
}

export interface CartItem {
  service: Service;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}