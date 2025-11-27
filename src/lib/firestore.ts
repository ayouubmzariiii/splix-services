import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '@/config/firebase';

// Generic Firestore operations
export class FirestoreService {
  
  // Add a document to a collection
  static async addDocument(collectionName: string, data: Record<string, unknown>) {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding document:', error);
      return { success: false, error };
    }
  }

  // Get a document by ID
  static async getDocument(collectionName: string, docId: string) {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
      } else {
        return { success: false, error: 'Document not found' };
      }
    } catch (error) {
      console.error('Error getting document:', error);
      return { success: false, error };
    }
  }

  // Get all documents from a collection
  static async getCollection(collectionName: string, constraints: QueryConstraint[] = []) {
    try {
      const collectionRef = collection(db, collectionName);
      const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef;
      const querySnapshot = await getDocs(q);
      
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: documents };
    } catch (error) {
      console.error('Error getting collection:', error);
      return { success: false, error };
    }
  }

  // Update a document
  static async updateDocument(collectionName: string, docId: string, data: Record<string, unknown>) {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating document:', error);
      return { success: false, error };
    }
  }

  // Delete a document
  static async deleteDocument(collectionName: string, docId: string) {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting document:', error);
      return { success: false, error };
    }
  }
}

// Specific collections and operations
export const Collections = {
  ORDERS: 'orders',
  USERS: 'users',
  SERVICES: 'services',
  REVIEWS: 'reviews',
  CONTACTS: 'contacts',
  DEALS: 'deals'
};

// Order-specific operations
export const OrderService = {
  async createOrder(orderData: Record<string, unknown>) {
    return FirestoreService.addDocument(Collections.ORDERS, orderData);
  },

  async getOrder(orderId: string) {
    return FirestoreService.getDocument(Collections.ORDERS, orderId);
  },

  async updateOrderStatus(orderId: string, status: string) {
    return FirestoreService.updateDocument(Collections.ORDERS, orderId, { status });
  }
};

// Contact form operations
export const ContactService = {
  async submitContact(contactData: Record<string, unknown>) {
    return FirestoreService.addDocument(Collections.CONTACTS, contactData);
  },

  async getContacts() {
    return FirestoreService.getCollection(Collections.CONTACTS, [
      orderBy('createdAt', 'desc')
    ]);
  }
};

// Review operations
export const ReviewService = {
  async addReview(reviewData: Record<string, unknown>) {
    return await FirestoreService.addDocument(Collections.REVIEWS, reviewData);
  },

  async getReviews(limitCount: number = 10) {
    const constraints = [orderBy('createdAt', 'desc'), limit(limitCount)];
    const result = await FirestoreService.getCollection(Collections.REVIEWS, constraints);
    return result.success ? result.data : [];
  }
};

// Services operations
export const getServices = async (): Promise<Service[]> => {
  const result = await FirestoreService.getCollection(Collections.SERVICES);
  return result.success ? (result.data as Service[]) : [];
};

// Deals operations
export const DealsService = {
  async getActiveDeals() {
    return FirestoreService.getCollection(Collections.DEALS, [
      where('isActive', '==', true),
      orderBy('priority', 'asc')
    ]);
  },

  async getDealById(dealId: string) {
    return FirestoreService.getDocument(Collections.DEALS, dealId);
  },

  async getHotDeal() {
    // Get the highest priority active deal (priority 1 is highest)
    const result = await FirestoreService.getCollection(Collections.DEALS, [
      where('isActive', '==', true),
      orderBy('priority', 'asc'),
      limit(1)
    ]);
    
    if (result.success && result.data && result.data.length > 0) {
      return { success: true, data: result.data[0] };
    }
    
    return { success: false, data: null };
  }
};

export { db };
import { Service } from '@/types';
