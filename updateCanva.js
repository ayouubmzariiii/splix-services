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

// Canva updated data
const canvaUpdatedData = {
  price: 120.00,
  originalPrice: 79.99,
  discountedPrice: 120.00,
  updatedAt: new Date()
};

async function updateCanva() {
  try {
    console.log('🚀 Starting Canva pricing update...');
    
    // Update Canva pricing
    console.log('🎨 Updating Canva pricing...');
    const servicesCollection = collection(db, 'services');
    const canvaQuery = query(servicesCollection, where('name', '==', 'Canva Pro'));
    const canvaSnapshot = await getDocs(canvaQuery);
    
    if (!canvaSnapshot.empty) {
      const canvaDoc = canvaSnapshot.docs[0];
      await updateDoc(doc(db, 'services', canvaDoc.id), canvaUpdatedData);
      console.log('✅ Canva pricing updated successfully');
      console.log(`   Price: $${canvaUpdatedData.price}`);
      console.log(`   Original Price: $${canvaUpdatedData.originalPrice}`);
      
      // Calculate discount percentage
      const discountPercent = Math.round(((canvaUpdatedData.originalPrice - canvaUpdatedData.price) / canvaUpdatedData.originalPrice) * 100);
      console.log(`   Discount: ${discountPercent}% OFF`);
    } else {
      console.log('⚠️  Canva Pro service not found');
      
      // Try alternative names
      const alternativeNames = ['Canva', 'Canva Premium', 'Canva Business'];
      for (const name of alternativeNames) {
        console.log(`🔍 Searching for "${name}"...`);
        const altQuery = query(servicesCollection, where('name', '==', name));
        const altSnapshot = await getDocs(altQuery);
        
        if (!altSnapshot.empty) {
          const altDoc = altSnapshot.docs[0];
          await updateDoc(doc(db, 'services', altDoc.id), canvaUpdatedData);
          console.log(`✅ Found and updated "${name}" pricing successfully`);
          break;
        }
      }
    }
    
    console.log('🎉 Canva update completed!');
    
  } catch (error) {
    console.error('💥 Error updating Canva:', error);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔒 PERMISSION DENIED ERROR');
      console.log('Please check your Firestore security rules allow writes.');
    }
  }
}

// Run the update
updateCanva().then(() => {
  console.log('Update process completed.');
  process.exit(0);
}).catch((error) => {
  console.error('Update process failed:', error);
  process.exit(1);
});