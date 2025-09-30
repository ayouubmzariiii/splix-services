# Firestore Setup Instructions

## Issue
The automated data upload is blocked by Firestore security rules that prevent writes without authentication.

## Solution: Manual Data Entry via Firebase Console

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `splix-services-b6b8e`
3. Navigate to **Firestore Database**

### Step 2: Create Services Collection
1. Click **"Start collection"**
2. Collection ID: `services`
3. Click **"Next"**

### Step 3: Add Sample Services
Add these documents to the `services` collection:

#### Document 1: Spotify Premium
```json
{
  "id": "1",
  "name": "Spotify Premium",
  "description": "Unlimited music streaming with no ads, offline downloads, and high-quality audio.",
  "price": 59.99,
  "originalPrice": 119.88,
  "discountedPrice": 59.99,
  "icon": "/icons/spotify.svg",
  "category": "Music",
  "features": ["Ad-free music", "Offline downloads", "High-quality audio", "Unlimited skips"],
  "popular": true,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

#### Document 2: Netflix Premium
```json
{
  "id": "2",
  "name": "Netflix Premium",
  "description": "Stream unlimited movies and TV shows in 4K Ultra HD on up to 4 devices.",
  "price": 119.99,
  "originalPrice": 239.88,
  "discountedPrice": 119.99,
  "icon": "/icons/netflix.svg",
  "category": "Streaming",
  "features": ["4K Ultra HD", "4 simultaneous streams", "Download for offline", "No ads"],
  "popular": true,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

#### Document 3: Adobe Creative Cloud
```json
{
  "id": "3",
  "name": "Adobe Creative Cloud",
  "description": "Complete creative suite including Photoshop, Illustrator, Premiere Pro, and more.",
  "price": 299.99,
  "originalPrice": 599.88,
  "discountedPrice": 299.99,
  "icon": "/icons/adobe.svg",
  "category": "Creative",
  "features": ["All Adobe apps", "100GB cloud storage", "Premium fonts", "Portfolio website"],
  "popular": true,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

#### Document 4: YouTube Premium
```json
{
  "id": "4",
  "name": "YouTube Premium",
  "description": "Ad-free YouTube experience with background play and YouTube Music included.",
  "price": 69.99,
  "originalPrice": 139.88,
  "discountedPrice": 69.99,
  "icon": "/icons/youtube.svg",
  "category": "Video",
  "features": ["No ads", "Background play", "YouTube Music", "Offline downloads"],
  "popular": false,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

#### Document 5: Microsoft Office 365
```json
{
  "id": "5",
  "name": "Microsoft Office 365",
  "description": "Complete productivity suite with Word, Excel, PowerPoint, and 1TB OneDrive storage.",
  "price": 79.99,
  "originalPrice": 159.88,
  "discountedPrice": 79.99,
  "icon": "/icons/office.svg",
  "category": "Productivity",
  "features": ["All Office apps", "1TB OneDrive", "Premium templates", "Advanced security"],
  "popular": true,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

### Step 4: Continue Adding More Services
You can add more services following the same pattern. The complete list includes:
- Disney+ Premium
- Canva Pro
- Amazon Prime
- Grammarly Premium
- Dropbox Plus

### Step 5: Update Security Rules (Optional)
If you want to allow programmatic writes in the future, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to services
    match /services/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Requires authentication
    }
    
    // Other collections...
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Verification
After adding the data:
1. Refresh your application at `http://localhost:3000`
2. Navigate to the Services page
3. You should see the services loading from Firestore

## Troubleshooting
- If services don't appear, check the browser console for errors
- Ensure the collection name is exactly `services`
- Verify the document structure matches the expected format