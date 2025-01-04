import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export async function handleAddBookmarkManga(uid: string, mangaId: string) {
  try {
    const userFormRef = doc(db, "Users", uid);
    await updateDoc(userFormRef, {
      bookmarked: arrayUnion(mangaId),
    });
    console.log("added");
  } catch (error) {
    console.error(`Could not add manga ${mangaId}. Error: ${error}`);
    throw new Error(`Could not remove assessor ${mangaId}. Error: ${error}`);
  }
}

export async function handleRemoveBookmarkManga(uid: string, mangaId: string) {
  try {
    const userFormRef = doc(db, "Users", uid);
    await updateDoc(userFormRef, {
      bookmarked: arrayRemove(mangaId),
    });
    console.log("removed");
  } catch (error) {
    console.error(`Could not remove manga ${mangaId}. Error: ${error}`);
    throw new Error(`Could not remove assessor ${mangaId}. Error: ${error}`);
  }
}

export async function isMangaBookmarked(uid: string, mangaId: string) {
  try {
    const userFormRef = doc(db, "Users", uid);
    const userDoc = (await getDoc(userFormRef)).data();
    return userDoc ? userDoc.bookmarked.includes(mangaId) : false;
  } catch (error) {
    console.error(`Could not add manga ${mangaId}. Error: ${error}`);
    throw new Error(`Could not remove assessor ${mangaId}. Error: ${error}`);
  }
}

export async function fetchBookmarked(uid: string): Promise<string[]> {
  try {
    const userFormRef = doc(db, "Users", uid);
    const userDoc = (await getDoc(userFormRef)).data();
    return userDoc ? userDoc.bookmarked : [];
  } catch (error) {
    console.error(`Could not fetch bookmarked ${uid}. Error: ${error}`);
    throw new Error(`Could not fetch bookmarked ${uid}. Error: ${error}`);
  }
}
