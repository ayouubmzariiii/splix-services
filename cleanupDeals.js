const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc, query, where } = require('firebase/firestore');

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

async function cleanupDeals() {
  try {
    console.log('🚀 Starting deals cleanup...');
    
    // Get all deals
    const dealsCollection = collection(db, 'deals');
    const dealsSnapshot = await getDocs(dealsCollection);
    
    console.log(`📊 Found ${dealsSnapshot.size} deals in database`);
    
    let deletedCount = 0;
    let keptCount = 0;
    
    // Process each deal
    for (const dealDoc of dealsSnapshot.docs) {
      const dealData = dealDoc.data();
      const dealName = dealData.name || dealData.id || 'Unknown';
      
      // Check if this is the Netflix-Spotify combo deal
      const isNetflixSpotifyCombo = (
        dealName.toLowerCase().includes('netflix') && dealName.toLowerCase().includes('spotify')
      ) || (
        dealName.toLowerCase().includes('entertainment') && dealName.toLowerCase().includes('combo')
      ) || (
        dealData.serviceIds && 
        dealData.serviceIds.includes('1') && // Spotify
        dealData.serviceIds.includes('2')    // Netflix
      );
      
      if (isNetflixSpotifyCombo) {
        console.log(`✅ Keeping deal: "${dealName}"`);
        keptCount++;
      } else {
        console.log(`🗑️  Deleting deal: "${dealName}"`);
        await deleteDoc(doc(db, 'deals', dealDoc.id));
        deletedCount++;
      }
    }
    
    console.log(`\n🎉 Deals cleanup completed!`);
    console.log(`📈 Kept: ${keptCount} deal(s)`);
    console.log(`🗑️  Deleted: ${deletedCount} deal(s)`);
    
  } catch (error) {
    console.error('💥 Error during deals cleanup:', error);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔒 PERMISSION DENIED ERROR');
      console.log('Please check your Firestore security rules allow deletes.');
    }
  }
}

// Run the cleanup
cleanupDeals().then(() => {
  console.log('Cleanup process completed.');
  process.exit(0);
}).catch((error) => {
  console.error('Cleanup process failed:', error);
  process.exit(1);
});