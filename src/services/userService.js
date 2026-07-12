import { collection, doc, getDoc, getDocs, orderBy, query, runTransaction, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const bootstrapRef = doc(db, 'system', 'bootstrap');

export async function createUserProfile(user, name) {
  const profileRef = doc(db, 'users', user.uid);
  const profile = await runTransaction(db, async (transaction) => {
    const bootstrap = await transaction.get(bootstrapRef);
    const role = bootstrap.exists() ? 'Member' : 'Admin';
    const data = { name: name.trim(), email: user.email, role, photoURL: user.photoURL || '', createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    transaction.set(profileRef, data);
    if (!bootstrap.exists()) transaction.set(bootstrapRef, { adminUid: user.uid, createdAt: serverTimestamp() });
    return { id: user.uid, ...data };
  });
  return profile;
}

export async function getUserProfile(uid) {
  const snapshot = await getDoc(doc(db, 'users', uid));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function updateUserProfile(uid, values) {
  await updateDoc(doc(db, 'users', uid), { ...values, updatedAt: serverTimestamp() });
}

export async function listUsers() {
  const snapshot = await getDocs(query(collection(db, 'users'), orderBy('name')));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function updateUserRole(uid, role) {
  await updateDoc(doc(db, 'users', uid), { role, updatedAt: serverTimestamp() });
}
