const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH7hWM41vqrffK9K86Mtntp87jD__fvYE",
  authDomain: "splix-e2410.firebaseapp.com",
  projectId: "splix-e2410",
  storageBucket: "splix-e2410.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqrstuvwxyz",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample services data based on the reviews and service structure
const servicesData = [
  {
    id: '1',
    name: 'Spotify Premium',
    description: 'Unlimited music streaming with no ads, offline downloads, and high-quality audio.',
    price: 59.99,
    originalPrice: 119.88,
    discountedPrice: 59.99,
    icon: '/icons/spotify.svg',
    category: 'Music',
    features: ['Ad-free music', 'Offline downloads', 'High-quality audio', 'Unlimited skips'],
    popular: true
  },
  {
    id: '2',
    name: 'Netflix Premium',
    description: 'Stream unlimited movies and TV shows in 4K Ultra HD on up to 4 devices.',
    price: 119.99,
    originalPrice: 239.88,
    discountedPrice: 119.99,
    icon: '/icons/netflix.svg',
    category: 'Streaming',
    features: ['4K Ultra HD', '4 simultaneous streams', 'Download for offline', 'No ads'],
    popular: true
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    description: 'Complete creative suite including Photoshop, Illustrator, Premiere Pro, and more.',
    price: 299.99,
    originalPrice: 599.88,
    discountedPrice: 299.99,
    icon: '/icons/adobe.svg',
    category: 'Creative',
    features: ['All Adobe apps', '100GB cloud storage', 'Premium fonts', 'Portfolio website'],
    popular: true
  },
  {
    id: '4',
    name: 'YouTube Premium',
    description: 'Ad-free YouTube experience with background play and YouTube Music included.',
    price: 69.99,
    originalPrice: 139.88,
    discountedPrice: 69.99,
    icon: '/icons/youtube.svg',
    category: 'Video',
    features: ['No ads', 'Background play', 'YouTube Music', 'Offline downloads'],
    popular: false
  },
  {
    id: '5',
    name: 'Microsoft Office 365',
    description: 'Complete productivity suite with Word, Excel, PowerPoint, and 1TB OneDrive storage.',
    price: 79.99,
    originalPrice: 159.88,
    discountedPrice: 79.99,
    icon: '/icons/office.svg',
    category: 'Productivity',
    features: ['All Office apps', '1TB OneDrive', 'Premium templates', 'Advanced security'],
    popular: true
  },
  {
    id: '6',
    name: 'Disney+ Premium',
    description: 'Stream Disney, Marvel, Star Wars, Pixar, and National Geographic content.',
    price: 49.99,
    originalPrice: 99.88,
    discountedPrice: 49.99,
    icon: '/icons/disney.svg',
    category: 'Streaming',
    features: ['4K streaming', 'Multiple profiles', 'Download for offline', 'Exclusive content'],
    popular: false
  },
  {
    id: '7',
    name: 'Canva Pro',
    description: 'Professional design platform with premium templates, stock photos, and brand kit.',
    price: 89.99,
    originalPrice: 179.88,
    discountedPrice: 89.99,
    icon: '/icons/canva.svg',
    category: 'Design',
    features: ['Premium templates', 'Brand kit', 'Background remover', 'Team collaboration'],
    popular: false
  },
  {
    id: '8',
    name: 'Amazon Prime',
    description: 'Free shipping, Prime Video, Prime Music, and exclusive deals on Amazon.',
    price: 99.99,
    originalPrice: 139.88,
    discountedPrice: 99.99,
    icon: '/icons/amazon.svg',
    category: 'Shopping',
    features: ['Free shipping', 'Prime Video', 'Prime Music', 'Exclusive deals'],
    popular: true
  },
  {
    id: '9',
    name: 'Grammarly Premium',
    description: 'Advanced writing assistant with grammar checking, plagiarism detection, and style suggestions.',
    price: 89.99,
    originalPrice: 179.88,
    discountedPrice: 89.99,
    icon: '/icons/grammarly.svg',
    category: 'Productivity',
    features: ['Advanced grammar check', 'Plagiarism detection', 'Style suggestions', 'Tone detector'],
    popular: false
  },
  {
    id: '10',
    name: 'Dropbox Plus',
    description: '2TB of secure cloud storage with advanced sharing and collaboration features.',
    price: 79.99,
    originalPrice: 119.88,
    discountedPrice: 79.99,
    icon: '/icons/dropbox.svg',
    category: 'Storage',
    features: ['2TB storage', 'Advanced sharing', 'Version history', 'Remote device wipe'],
    popular: false
  }
];

async function uploadServices() {
  try {
    console.log('Starting to upload services to Firestore...');
    
    // Check if services already exist
    const servicesCollection = collection(db, 'services');
    const existingServices = await getDocs(servicesCollection);
    
    if (!existingServices.empty) {
      console.log(`Found ${existingServices.size} existing services. Skipping upload.`);
      console.log('If you want to re-upload, please delete the existing services first.');
      return;
    }
    
    // Upload each service
    for (const service of servicesData) {
      const docRef = await addDoc(servicesCollection, {
        ...service,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Uploaded service: ${service.name} (ID: ${docRef.id})`);
    }
    
    console.log(`\n🎉 Successfully uploaded ${servicesData.length} services to Firestore!`);
    console.log('You can now view them in your Firebase console or in the application.');
    
  } catch (error) {
    console.error('❌ Error uploading services:', error);
    
    if (error.code === 'permission-denied') {
      console.log('\n💡 Permission denied. Please check:');
      console.log('1. Your Firebase project ID is correct');
      console.log('2. Firestore security rules allow writes');
      console.log('3. Your Firebase configuration is valid');
    }
  }
}

// Run the upload
uploadServices().then(() => {
  console.log('Upload process completed.');
  process.exit(0);
}).catch((error) => {
  console.error('Upload process failed:', error);
  process.exit(1);
});