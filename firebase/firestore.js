
import { collection, addDoc, getFirestore, doc, getDoc, getDocs, where, query, setDoc } from "firebase/firestore";
import app from './firebase';


// ************ get db ***********************
export const db = getFirestore(app);

// Add a new user document with a generated id.
export async function createUserProfileAnex(user) {
    const docRef = doc(db, "users", user.id);
    const data = {
        displayName: user.displayName,
        userType: user.type,
        imageUrl: user.imageUrl
    }
    const result = await setDoc(docRef, data);
    console.log("Documento creado", result);
}

// Add prompt.
export async function createPrompt(userId, description, language, mood, explicitSongs, repeatArtist, hours, minutes, prompt) {
  const collectionRef = collection(db, "prompts");
  const promptData = {
      userId: userId,
      description: description,
      language: language,
      mood: mood,
      explicitSongs: explicitSongs,
      durationInMinutes: hours*60 + minutes*1,
      repeatArtist: repeatArtist,
      completePrompt: prompt

  }
  const result = await addDoc(collectionRef, promptData);
  console.log("Prompt almacenado: ", result.id);
}



///// EXAMPLE FUNCTIONS --- WILL BE DELETED
  export async function getSingleItemFromDatabase(idItem) {
    // referencia de la colección y del documento
    const productsColectionRef = collection(db, "products");
    const docRef = doc(productsColectionRef, idItem);
  
    // getDoc -> datos
    const docSnapshot = await getDoc(docRef);
  
    // extra
    if (docSnapshot.exists() === false) throw new Error("No existe el documento");
  
    return { ...docSnapshot.data(), id: docSnapshot.id };
  }

  export async function getItemsFromDatabase() {
    const productsColectionRef = collection(db, "products");
    let snapshotProducts = await getDocs(productsColectionRef);
    const documents = snapshotProducts.docs;
  
    const dataProducts = documents.map((doc) => ({ ...doc.data(), id: doc.id }));
    return dataProducts;
  }
  
  export async function getItemsByCategoryFromDatabase(categoryURL) {
    const productsColectionRef = collection(db, "products");
  
    const q = query(productsColectionRef, where("category", "==", categoryURL));
  
    let snapshotProducts = await getDocs(q);
    const documents = snapshotProducts.docs;
    const dataProducts = documents.map((doc) => ({ ...doc.data(), id: doc.id }));
    return dataProducts;
  }

  export async function createOrder(orderData) {
    const collectionRef = collection(db, "orders");
  
    console.log(orderData);
  
    const response = await addDoc(collectionRef, orderData);
    console.log("Orden creada correctamente", response.id);
  
    return response.id;
  }