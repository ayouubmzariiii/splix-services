const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, updateDoc, doc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH7hWM41vqrffK9K86Mtntp87jD__fvYE",
  authDomain: "splix-e2410.firebaseapp.com",
  projectId: "splix-e2410",
  storageBucket: "splix-e2410.firebasestorage.app",
  messagingSenderId: "17711659255",
  appId: "1:17711659255:web:ce437815aff02105a33bf2",
  measurementId: "G-L3DZJVN2ST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Minimalistic Canva data structure
const canvaUpdatedData = {
  name: 'Canva Pro',
  price: 79.99,
  originalPrice: 120.00,
  discountedPrice: 79.99,
  icon: '/icons/canva.svg',
  category: 'Design',
  features: ['Premium templates', 'Brand kit', 'Background remover'],
  popular: false,
  updatedAt: new Date()
};

async function updateCanvaService() {
  try {
    console.log('Updating Canva Pro service...');
    
    // Find Canva Pro service
    const servicesCollection = collection(db, 'services');
    const canvaQuery = query(servicesCollection, where('name', '==', 'Canva Pro'));
    const canvaSnapshot = await getDocs(canvaQuery);
    
    if (canvaSnapshot.empty) {
      console.log('❌ Canva Pro service not found');
      return;
    }
    
    // Update the first matching document
    const canvaDoc = canvaSnapshot.docs[0];
    const canvaRef = doc(db, 'services', canvaDoc.id);
    
    await updateDoc(canvaRef, canvaUpdatedData);
    
    console.log('✅ Successfully updated Canva Pro service with new pricing and minimalistic structure');
    console.log('New pricing: $79.99 (was $89.99)');
    console.log('Original price: $120.00 (was $179.88)');
    console.log('Features reduced to essential items only');
    
  } catch (error) {
    console.error('❌ Error updating Canva service:', error);
  }
}

// Run the update
updateCanvaService().then(() => {
  console.log('Update process completed.');
  process.exit(0);
}).catch((error) => {
  console.error('Update process failed:', error);
  process.exit(1);
});