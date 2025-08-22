import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { uploadPlaceImage } from "./BucketService";

export const getCategoriesFromFirestore = async () => {
  try {
    const colRef = collection(db, "categories");
    const snapshot = await getDocs(colRef);
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    return { success: true, categories };
  } catch (error) {
    console.error("Error fetching categories from Firestore:", error);
    return { success: false, error };
  }
};
export type Place = {
  id: string;
  name: string;
  description: string;
  price: number;
  user_id: string;
  lat: number;
  long: number;
  category_name: string;
  image_url?: string;
};



export const addPlaceToFirestore = async ({
  name,
  description,
  price,
  lat,
  long,
  category_name,
  image_uri = "",
}: {
  name: string;
  description: string;
  price: string | number;
  lat: number;
  long: number;
  category_name: string;
  image_uri?: string;
}) => {
  try {
    const user_id = auth.currentUser ? auth.currentUser.uid : "anonymous";
    const colRef = collection(db, "places");

    const docRef = await addDoc(colRef, {
      name,
      description,
      price: typeof price === "string" ? parseFloat(price) || 0 : price,
      user_id,
      lat,
      long,
      category_name,
      image_url: "",
    });

    let downloadURL = "";
    if (image_uri) {
      downloadURL = await uploadPlaceImage(image_uri, docRef.id);

      if (downloadURL) {
        const placeDocRef = doc(db, "places", docRef.id);
        await updateDoc(placeDocRef, { image_url: downloadURL });
      } else {
        console.warn("No downloadURL returned from uploadPlaceImage");
      }
    }

    return { success: true, id: docRef.id, image_url: downloadURL };
  } catch (error) {
    console.error("Error adding place to Firestore:", error);
    return { success: false, error };
  }
};


// Fetch all places from Firestore
export const getAllPlacesFromFirestore = async (): Promise<{
  success: boolean;
  places?: Place[];
  error?: any;
}> => {
  try {
    const colRef = collection(db, "places");
    const snapshot = await getDocs(colRef);
    const places: Place[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Place, "id">),
    }));
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

export const addMoodToFirestore = async ({
  placeId,
  type,
  description,
}: {
  placeId: string;
  type: string;
  description: string;
}) => {
  try {
    const user_id = auth.currentUser ? auth.currentUser.uid : "anonymous";
    const colRef = collection(db, "moods");

    const moodDoc = {
      user_id,
      placeId,
      date: new Date().toISOString(),
      type,
      description,
    };

    const docRef = await addDoc(colRef, moodDoc);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding mood to Firestore:", error);
    return { success: false, error };
  }
};

type Mood = {
  id: string;
  placeId: any;
  type: any;
  description: any;
  date: any;
};

export type UserProfile = {
  user_id: string;
  username: string;
  email: string;
  bio: string;
  profile_pic: string;
  createdAt: any;
  moods: Mood[];
};

export const getUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  try {
    
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No user document found!");
      return null;
    }

    const data = docSnap.data() as Omit<UserProfile, "moods">; 

    
    const moodsQuery = query(
      collection(db, "moods"),
      where("user_id", "==", userId)
    );
    const moodsSnap = await getDocs(moodsQuery);
    const moods: Mood[] = moodsSnap.docs.map((d) => ({
      id: d.id,
      placeId: d.data().placeId,
      type: d.data().type,
      description: d.data().description,
      date: d.data().date,
    }));

    return {
      ...data,
      moods,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (uid: string, data: any) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, data);
};
export const addReviewToFirestore = async ({
  place_id,
  title,
  description,
  calm_score,
}: {
  place_id: string;
  title: string;
  description: string;
  calm_score: number;
}) => {
  try {
    const score = Math.max(1, Math.min(5, calm_score));
    const user_id = auth.currentUser ? auth.currentUser.uid : "anonymous";

    const userProfile = await getUserProfile(user_id);

    const colRef = collection(db, "reviews");

    const reviewDoc = {
      user_id,
      place_id,
      title,
      description,
      calm_score: score,
      createdAt: new Date().toISOString(),
      username: userProfile?.username || "Anonymous",
      profile_pic:
        userProfile?.profile_pic ||
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    };

    const docRef = await addDoc(colRef, reviewDoc);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding review to Firestore:", error);
    return { success: false, error };
  }
};

export type Review = {
  id: string;
  user_id: string;
  place_id: string;
  title: string;
  description: string;
  calm_score: number;
  createdAt: string;
  username?: string;
  profile_pic?: string;
};

export const getReviewsForPlace = async (
  place_id: string
): Promise<Review[]> => {
  try {
    const q = query(
      collection(db, "reviews"),
      where("place_id", "==", place_id)
    );
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Review, "id">),
    }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};


