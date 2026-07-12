import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const assetsCollection = collection(db, 'assets');
const withId = (snapshot) => ({ id: snapshot.id, ...snapshot.data() });

export async function listAssets(uid) {
  const snapshot = await getDocs(query(assetsCollection, where('createdBy', '==', uid), orderBy('createdAt', 'desc')));
  return snapshot.docs.map(withId);
}

export async function getAsset(assetId) {
  const snapshot = await getDoc(doc(db, 'assets', assetId));
  return snapshot.exists() ? withId(snapshot) : null;
}

export async function getAssetByCode(assetCode, uid) {
  const snapshot = await getDocs(query(assetsCollection, where('createdBy', '==', uid), where('assetCode', '==', assetCode), limit(1)));
  return snapshot.empty ? null : withId(snapshot.docs[0]);
}

export async function createAsset(values, uid) {
  const reference = await addDoc(assetsCollection, { ...values, createdBy: uid, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return reference.id;
}

export async function updateAsset(assetId, values) {
  await updateDoc(doc(db, 'assets', assetId), { ...values, updatedAt: serverTimestamp() });
}

export async function removeAsset(assetId) {
  await deleteDoc(doc(db, 'assets', assetId));
}
