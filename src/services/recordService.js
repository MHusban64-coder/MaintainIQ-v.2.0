import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const mapDocs = (snapshot) => snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
const collectionFor = (name) => collection(db, name);

export async function listRecords(name, uid, assetId) {
  const constraints = [where('createdBy', '==', uid)];
  if (assetId) constraints.push(where('assetId', '==', assetId));
  constraints.push(orderBy(name === 'maintenance' ? 'maintenanceDate' : 'createdAt', 'desc'));
  return mapDocs(await getDocs(query(collectionFor(name), ...constraints)));
}

export async function createRecord(name, values, uid) {
  const reference = await addDoc(collectionFor(name), { ...values, createdBy: uid, createdAt: serverTimestamp() });
  return reference.id;
}

export async function removeRecord(name, id) {
  await deleteDoc(doc(db, name, id));
}
