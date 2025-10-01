const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc } = require('firebase/firestore');

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

// Discord Nitro service data
const discordNitroData = {
  id: '11',
  name: 'Discord Nitro',
  description: 'Premium Discord experience with enhanced features, custom emojis, and server boosts.',
  price: 53.00,
  originalPrice: 100.00,
  discountedPrice: 53.00,
  icon: '/icons/discord.svg',
  category: 'Gaming',
  features: [
    'One Year Subscription',
    '$4.50 Per Month',
    '50% Cheaper',
    'Custom emojis and stickers',
    'HD video and screen share',
    'Server boosts included',
    'Larger file uploads'
  ],
  popular: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Netflix updated data
const netflixUpdatedData = {
  price: 59.99,
  originalPrice: 300.00,
  discountedPrice: 59.99,
  features: [
    'One Year Subscription',
    '$5.00 Per Month', 
    '85% Cheaper',
    '4K Ultra HD streaming',
    '4 simultaneous streams',
    'Download for offline',
    'No ads'
  ],
  updatedAt: new Date()
};

async function updateServices() {
  try {
    console.log('🚀 Starting services update...');
    
    // Add Discord Nitro
    console.log('📱 Adding Discord Nitro...');
    const servicesCollection = collection(db, 'services');
    const discordRef = await addDoc(servicesCollection, discordNitroData);
    console.log(`✅ Discord Nitro added with ID: ${discordRef.id}`);
    
    // Update Netflix pricing
    console.log('🎬 Updating Netflix pricing...');
    const netflixQuery = query(servicesCollection, where('name', '==', 'Netflix Premium'));
    const netflixSnapshot = await getDocs(netflixQuery);
    
    if (!netflixSnapshot.empty) {
      const netflixDoc = netflixSnapshot.docs[0];
      await updateDoc(doc(db, 'services', netflixDoc.id), netflixUpdatedData);
      console.log('✅ Netflix pricing updated successfully');
    } else {
      console.log('⚠️  Netflix service not found');
    }
    
    console.log('🎉 Services update completed!');
    
  } catch (error) {
    console.error('💥 Error updating services:', error);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔒 PERMISSION DENIED ERROR');
      console.log('Please check your Firestore security rules allow writes.');
    }
  }
}

// Run the update
updateServices().then(() => {
  console.log('Update process completed.');
  process.exit(0);
}).catch((error) => {
  console.error('Update process failed:', error);
  process.exit(1);
});