export interface EventPackage {
  id: string;
  category: string;
  image: string;
  info: string[];
  cost: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryMetadata {
  title: string;
  description: string;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PastEvent {
  id: string;
  name: string;
  date: string;
  image: string;
  createdAt?: Date;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName?: string;
  packageId: string;
  packageCategory: string;
  packageName: string;
  packageCost: string;
  packageInfo: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  adminNotes?: string;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  isAdmin?: boolean;
  createdAt: Date;
}

export interface Feedback {
  id: string;
  userId?: string;
  name: string;
  email: string;
  eventType: string;
  rating: string;
  feedback: string;
  createdAt: Date;
}

