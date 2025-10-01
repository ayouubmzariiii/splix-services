const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyDH7hWM41vqrffK9K86Mtntp87jD__fvYE',
  authDomain: 'splix-e2410.firebaseapp.com',
  projectId: 'splix-e2410',
  storageBucket: 'splix-e2410.firebasestorage.app',
  messagingSenderId: '17711659255',
  appId: '1:17711659255:web:ce437815aff02105a33bf2',
  measurementId: 'G-L3DZJVN2ST'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkServices() {
  try {
    console.log('🔍 Checking services in database...\n');
    
    const servicesCollection = collection(db, 'services');
    const snapshot = await getDocs(servicesCollection);
    
    console.log('📋 Services in database:');
    console.log('========================');
    
    const services = [];
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      services.push({
        name: data.name,
        icon: data.icon,
        price: data.price,
        originalPrice: data.originalPrice
      });
    });
    
    // Sort by name for better readability
    services.sort((a, b) => a.name.localeCompare(b.name));
    
    services.forEach(service => {
      console.log(`📱 ${service.name}`);
      console.log(`   Icon: ${service.icon}`);
      console.log(`   Price: $${service.price} (was $${service.originalPrice || 'N/A'})`);
      console.log('');
    });
    
    console.log(`\n✅ Total services found: ${services.length}`);
    
    // Check for missing icons
    console.log('\n🔍 Checking for missing icons...');
    const fs = require('fs');
    const path = require('path');
    
    const iconsDir = path.join(__dirname, 'public', 'icons');
    const existingIcons = fs.readdirSync(iconsDir);
    
    console.log('\n📁 Available icons:');
    existingIcons.forEach(icon => {
      console.log(`   ✅ ${icon}`);
    });
    
    console.log('\n⚠️  Services with potentially missing icons:');
    services.forEach(service => {
      const iconFileName = service.icon.split('/').pop();
      if (!existingIcons.includes(iconFileName)) {
        console.log(`   ❌ ${service.name}: ${service.icon} (file not found)`);
      }
    });
    
  } catch (error) {
    console.error('💥 Error checking services:', error);
  }
}

checkServices().then(() => {
  console.log('\nCheck completed.');
  process.exit(0);
}).catch(error => {
  console.error('Check failed:', error);
  process.exit(1);
});