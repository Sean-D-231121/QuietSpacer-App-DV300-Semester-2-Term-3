// services/bucket.ts
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";



export const uploadProfileImage = async (uri: string, userId: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    //  Put inside user folder
    const storageRef = ref(storage, `profilePics/${userId}/avatar.jpg`);

    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export const uploadPlaceImage = async (uri: string, placeId: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    // Save into /places/{placeId}/timestamp.jpg
    const storageRef = ref(storage, `places/${placeId}/${Date.now()}.jpg`);

    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading place image:", error);
    throw error;
  }
};


