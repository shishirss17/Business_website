'use client';
import { doc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { getSdks } from '@/firebase';

// This function will be called after a user signs up.
// It creates a user profile document in Firestore.
export function createUserProfile(user: User, additionalData: { firstName: string; lastName: string; email: string; }) {
  if (!user) return;
  
  const { firestore } = getSdks(user.app);

  const userRef = doc(firestore, `users/${user.uid}`);
  
  const data = {
    id: user.uid,
    firstName: additionalData.firstName,
    lastName: additionalData.lastName,
    email: additionalData.email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  setDocumentNonBlocking(userRef, data, { merge: false });
}
