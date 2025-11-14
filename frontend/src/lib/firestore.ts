import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  updateDoc,
  setDoc,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { EventPackage, CategoryMetadata, PastEvent, Order, Feedback } from '@/app/types/firestore';

// Event Packages
export async function getEventPackages(category?: string): Promise<EventPackage[]> {
  try {
    const packagesRef = collection(db, 'eventPackages');
    let q = query(packagesRef, orderBy('createdAt', 'desc'));
    
    if (category) {
      q = query(packagesRef, where('category', '==', category), orderBy('createdAt', 'desc'));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as EventPackage;
    });
  } catch (error) {
    console.error('Error fetching event packages:', error);
    throw error;
  }
}

export async function getEventPackageById(id: string): Promise<EventPackage | null> {
  try {
    const docRef = doc(db, 'eventPackages', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { 
        id: docSnap.id, 
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as EventPackage;
    }
    return null;
  } catch (error) {
    console.error('Error fetching event package:', error);
    throw error;
  }
}

export async function addEventPackage(pkg: Omit<EventPackage, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const packagesRef = collection(db, 'eventPackages');
    const docRef = await addDoc(packagesRef, {
      ...pkg,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding event package:', error);
    throw error;
  }
}

export async function updateEventPackage(id: string, updates: Partial<EventPackage>): Promise<void> {
  try {
    const docRef = doc(db, 'eventPackages', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating event package:', error);
    throw error;
  }
}

export async function deleteEventPackage(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'eventPackages', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting event package:', error);
    throw error;
  }
}

// Categories
export async function getCategoryMetadata(): Promise<Record<string, CategoryMetadata>> {
  try {
    const categoriesRef = collection(db, 'categories');
    const snapshot = await getDocs(categoriesRef);
    const metadata: Record<string, CategoryMetadata> = {};
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      metadata[data.category || doc.id] = {
        title: data.title,
        description: data.description,
        category: data.category || doc.id,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    });
    
    return metadata;
  } catch (error) {
    console.error('Error fetching category metadata:', error);
    throw error;
  }
}

export async function updateCategoryMetadata(category: string, metadata: Partial<CategoryMetadata>): Promise<void> {
  try {
    const docRef = doc(db, 'categories', category);
    await updateDoc(docRef, {
      ...metadata,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating category metadata:', error);
    throw error;
  }
}

// Past Events
export async function getPastEvents(): Promise<PastEvent[]> {
  try {
    const pastEventsRef = collection(db, 'pastEvents');
    const q = query(pastEventsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
      } as PastEvent;
    });
  } catch (error) {
    console.error('Error fetching past events:', error);
    throw error;
  }
}

export async function addPastEvent(event: Omit<PastEvent, 'id' | 'createdAt'>): Promise<string> {
  try {
    const pastEventsRef = collection(db, 'pastEvents');
    const docRef = await addDoc(pastEventsRef, {
      ...event,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding past event:', error);
    throw error;
  }
}

// Orders
export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const ordersRef = collection(db, 'orders');
    const docRef = await addDoc(ordersRef, {
      ...order,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getOrders(userId?: string, status?: Order['status']): Promise<Order[]> {
  try {
    const ordersRef = collection(db, 'orders');
    const constraints: any[] = [];
    
    if (userId) {
      constraints.push(where('userId', '==', userId));
    }
    if (status) {
      constraints.push(where('status', '==', status));
    }
    constraints.push(orderBy('createdAt', 'desc'));
    
    const q = query(ordersRef, ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Order;
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export async function updateOrderStatus(orderId: string, status: Order['status'], adminNotes?: string): Promise<void> {
  try {
    const docRef = doc(db, 'orders', orderId);
    const updateData: any = {
      status,
      updatedAt: Timestamp.now(),
    };
    
    // Only add adminNotes if it's provided and not empty
    if (adminNotes && adminNotes.trim() !== '') {
      updateData.adminNotes = adminNotes.trim();
    }
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

// Users
export async function getUser(userId: string) {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export async function createOrUpdateUser(userId: string, userData: { email: string; displayName?: string; isAdmin?: boolean }) {
  try {
    const docRef = doc(db, 'users', userId);
    const userDoc = await getDoc(docRef);
    
    if (userDoc.exists()) {
      await updateDoc(docRef, {
        ...userData,
        updatedAt: Timestamp.now(),
      });
    } else {
      await setDoc(docRef, {
        ...userData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  }
}

// Feedback
export async function submitFeedback(feedbackData: Omit<Feedback, 'id' | 'createdAt'>): Promise<string> {
  try {
    const feedbackRef = collection(db, 'feedback');
    const docRef = await addDoc(feedbackRef, {
      ...feedbackData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
}

export async function getFeedback(): Promise<Feedback[]> {
  try {
    const feedbackRef = collection(db, 'feedback');
    const q = query(feedbackRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
      } as Feedback;
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
}

