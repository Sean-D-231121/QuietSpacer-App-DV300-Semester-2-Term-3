// Fetch categories from Firestore (id and name)
export const getCategoriesFromFirestore = async () => {
  try {
    const colRef = collection(db, "categories");
    const snapshot = await getDocs(colRef);
    const categories = snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }));
    return { success: true, categories };
  } catch (error) {
    console.error("Error fetching categories from Firestore:", error);
    return { success: false, error };
  }
};

import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

// Add a place to Firestore with auto-generated ID
export const addPlaceToFirestore = async ({
  name,
  description,
  price,
  lat,
  long,
  category_name,
  image_url = "",
}: {
  name: string;
  description: string;
  price: string | number;
  lat: number;
  long: number;
  category_name: string;
  image_url?: string;
}) => {
  try {
    const user_id = auth.currentUser ? auth.currentUser.uid : "anonymous";
    const colRef = collection(db, "places");
    const docRef = await addDoc(colRef, {
      // place_id will be the Firestore doc ID
      name,
      description,
      price: typeof price === "string" ? parseFloat(price) || 0 : price,
      user_id,
      lat,
      long,
      category_name,
      image_url,
    });
    // Optionally update the document to include its own ID as place_id
    // Not needed unless you want place_id in the doc
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding place to Firestore:", error);
    return { success: false, error };
  }
};

// Fetch all places from Firestore
export const getAllPlacesFromFirestore = async () => {
  try {
    const colRef = collection(db, "places");
    const snapshot = await getDocs(colRef);
    const places = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { success: true, places };
  } catch (error) {
    console.error("Error fetching places from Firestore:", error);
    return { success: false, error };
  }
};

export const addBookmarkToFirestore = async (place: any) => {
  const user_id = auth.currentUser ? auth.currentUser.uid : "anonymous";
  await addDoc(collection(db, "bookmarks"), { ...place, user_id });
};

// Remove a bookmark by place id
export const removeBookmarkFromFirestore = async (placeId: any) => {
  const user_id = auth.currentUser ? auth.currentUser.uid : "anonymous";
  const q = query(
    collection(db, "bookmarks"),
    where("user_id", "==", user_id),
    where("id", "==", placeId)
  );
  const snap = await getDocs(q);
  snap.forEach(async (d) => await deleteDoc(doc(db, "bookmarks", d.id)));
};

// Get all bookmarks for current user
export const getBookmarksFromFirestore = async () => {
  const user_id = auth.currentUser ? auth.currentUser.uid : "anonymous";
  const q = query(collection(db, "bookmarks"), where("user_id", "==", user_id));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
};