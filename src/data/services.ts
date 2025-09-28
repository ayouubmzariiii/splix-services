import { Service } from '@/types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Spotify Premium',
    description: 'Ad-free music streaming',
    price: 4.99,
    originalPrice: 9.99,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg',
    category: 'Music',
    features: ['Ad-free listening', 'Offline downloads', 'High-quality audio', 'Unlimited skips'],
    popular: true
  },
  {
    id: '2',
    name: 'Netflix Premium',
    description: '4K movies and series',
    price: 8.99,
    originalPrice: 15.99,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    category: 'Entertainment',
    features: ['4K Ultra HD', 'Multiple screens', 'Download for offline', 'No ads'],
    popular: true
  },
  {
    id: '3',
    name: 'YouTube Premium',
    description: 'Ad-free videos with background play',
    price: 5.99,
    originalPrice: 11.99,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png',
    category: 'Entertainment',
    features: ['Ad-free videos', 'Background play', 'YouTube Music', 'Offline downloads']
  },
  {
    id: '4',
    name: 'Disney+ Premium',
    description: 'Disney, Marvel & Star Wars content',
    price: 3.99,
    originalPrice: 7.99,
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiMxMTNDQ0YiLz4KPHN2ZyB4PSIxNSIgeT0iMjAiIHdpZHRoPSI3MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDcwIDYwIiBmaWxsPSJub25lIj4KPHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA3MCA2MCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMCAzMEM4IDMwIDYgMzIgNiAzNFY0NkM2IDQ4IDggNTAgMTAgNTBIMjBDMjIgNTAgMjQgNDggMjQgNDZWMzRDMjQgMzIgMjIgMzAgMjAgMzBIMTBaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzAgMTBDMjggMTAgMjYgMTIgMjYgMTRWNDZDMjYgNDggMjggNTAgMzAgNTBINDBDNDIgNTAgNDQgNDggNDQgNDZWMTRDNDQgMTIgNDIgMTAgNDAgMTBIMzBaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNTAgMjBDNDggMjAgNDYgMjIgNDYgMjRWNDZDNDYgNDggNDggNTAgNTAgNTBINjBDNjIgNTAgNjQgNDggNjQgNDZWMjRDNjQgMjIgNjIgMjAgNjAgMjBINTBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+Cjwvc3ZnPgo=',
    category: 'Entertainment',
    features: ['Disney classics', 'Marvel movies', 'Star Wars series', '4K streaming']
  },
  {
    id: '5',
    name: 'Adobe Creative Cloud',
    description: 'Professional design suite',
    price: 19.99,
    originalPrice: 52.99,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg',
    category: 'Creative',
    features: ['Photoshop', 'Illustrator', 'Premiere Pro', 'Cloud storage']
  },
  {
    id: "6",
    name: "Microsoft Office 365",
    description: "Word, Excel & PowerPoint suite",
    price: 4.99,
    originalPrice: 8.99,
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiNGRjZEMDAiLz4KPHN2ZyB4PSIxNSIgeT0iMTUiIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgdmlld0JveD0iMCAwIDcwIDcwIiBmaWxsPSJub25lIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjRkY2RDAwIi8+CjxyZWN0IHg9IjM1IiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiMwMDc4RDQiLz4KPHJlY3QgeT0iMzUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzAwQkM2QyIvPgo8cmVjdCB4PSIzNSIgeT0iMzUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI0ZGQjkwMCIvPgo8L3N2Zz4KPC9zdmc+",
    category: "Productivity",
    features: ["Word", "Excel", "PowerPoint", "OneDrive storage"],
    popular: false
  },
  {
    id: '7',
    name: 'Amazon Prime',
    description: 'Free shipping & Prime Video',
    price: 7.99,
    originalPrice: 14.99,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg',
    category: 'Shopping',
    features: ['Free shipping', 'Prime Video', 'Prime Music', 'Exclusive deals']
  },
  {
    id: "8",
    name: "Canva Pro",
    description: "Design tools & premium templates",
    price: 3.99,
    originalPrice: 7.99,
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiMwMEMzRjciLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIiBmaWxsPSJub25lIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjUiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMCAzMEMyMCAyNCAyNCAyMCAzMCAyMFM0MCAyNCA0MCAzMFMzNiA0MCAzMCA0MFMyMCAzNiAyMCAzMFoiIGZpbGw9IiMwMEMzRjciLz4KPC9zdmc+Cjwvc3ZnPg==",
    category: "Design",
    features: ["Premium templates", "Brand kit", "Background remover", "Team collaboration"],
    popular: false
  },
  {
    id: "9",
    name: "Grammarly Premium",
    description: "AI writing assistant & grammar checker",
    price: 5.99,
    originalPrice: 11.99,
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiMxNUMzOUEiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIiBmaWxsPSJub25lIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjUiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yNSAyNUgzNVYzNUgyNVYyNVoiIGZpbGw9IiMxNUMzOUEiLz4KPHBhdGggZD0iTTIwIDQwSDQwVjQ1SDIwVjQwWiIgZmlsbD0iIzE1QzM5QSIvPgo8L3N2Zz4KPC9zdmc+",
    category: "Productivity",
    features: ["Grammar check", "Style suggestions", "Plagiarism detection", "Tone detector"],
    popular: false
  }
];