import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/config';

export async function uploadFile(file, path) {
  if (!file) return '';
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}

export async function deleteFileByUrl(url) {
  if (url?.includes('firebasestorage.googleapis.com')) await deleteObject(ref(storage, url));
}
