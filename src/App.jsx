import React, { useState } from 'react';

class MediaItem {
  constructor(id, title, category, rating, price, image, description) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.rating = rating;
    this.price = price;
    this.image = image;
    this.description = description;
  }
}

class MediaManager {
  constructor(items = []) {
    this.items = items;
  }

  filterItems(category, searchQuery) {
    return this.items.filter((item) => {
      const matchesCategory =
        category === 'All' || item.category.toLowerCase() === category.toLowerCase();
      const matchesQuery = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }
}

const initialMediaData = [
  new MediaItem(
    1,
    'Cyber Odyssey 2077',
    'Games',
    4.8,
    59.99,
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
    'An open-world action-adventure RPG set in a futuristic metropolis.'
  ),
  new MediaItem(
    2,
    'Live Esports Finals 2026',
    'Events',
    4.9,
    25.0,
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600',
    'Exclusive access to the annual global championship streaming event.'
  ),
  new MediaItem(
    3,
    'Starlight Cinema Stream',
    'Streaming',
    4.6,
    14.99,
    'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=600',
    'Unlimited HD streaming pass for indie film festivals and originals.'
  ),
  new MediaItem(
    4,
    'Retro Arcade Collection',
    'Games',
    4.5,
    19.99,
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
    'A nostalgia-filled bundle featuring classics restored in High Definition.'
  ),
];

export default function App() {
  const [manager] = useState(new MediaManager(initialMediaData));
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [myLibrary, setMyLibrary] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeTab, setActiveTab] = useState('catalog');

  const filteredItems = manager.filterItems(selectedCategory, searchQuery);

  const addToLibrary = (item) => {
    if (!myLibrary.some((libItem) => libItem.id === item.id)) {
      setMyLibrary([...myLibrary, item]);
    }
  };

  const removeFromLibrary = (id) => {
    setMyLibrary(myLibrary.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold tracking-wider text-indigo-400">
            NEXUS ENTERTAINMENT
          </h1>
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'catalog'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              Catalog
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2 rounded-lg font-medium transition relative ${
                activeTab === 'library'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              My Library
              {myLibrary.length > 0 && (
                <span className="ml-2 bg-indigo-400 text-slate-900 px-2 py-0.5 rounded-full text-xs font-bold">
                  {myLibrary.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        {activeTab === 'catalog' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <input
                type="text"
                placeholder="Search entertainment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-1/2 p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
              <div className="flex gap-2">
                {['All', 'Games', 'Events', 'Streaming'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      selectedCategory === cat
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider