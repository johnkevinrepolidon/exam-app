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

  const figmaLink = "https://www.figma.com/design/HOmQClOofxlKSWVaOPaLeN/Repolidon_Nexus-Entertainment-UI?node-id=0-1&t=Iqx5Fshd7RTWk8cJ-1";

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
          <nav className="flex items-center gap-3">
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
            <a
              href={figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1 shadow-md"
            >
              Figma Wireframe ↗
            </a>
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
                        <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-xs text-amber-400 font-bold">
                          ★ {item.rating}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                        {item.description}
                      </p>
                    </div>
                    <div>
                      <div className="text-xl font-bold mb-3">${item.price}</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedMedia(item)}
                          className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => addToLibrary(item)}
                          className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Booked Library</h2>
            {myLibrary.length === 0 ? (
              <p className="text-slate-400">
                Your library is currently empty. Browse the catalog to add items!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myLibrary.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex gap-4 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-xs text-indigo-400 uppercase">
                        {item.category}
                      </p>
                      <p className="text-sm font-bold text-slate-300 mt-1">
                        ${item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromLibrary(item.id)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedMedia && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full p-6 relative">
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl"
              >
                ✕
              </button>
              <img
                src={selectedMedia.image}
                alt={selectedMedia.title}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                {selectedMedia.category}
              </span>
              <h2 className="text-2xl font-bold mt-1 mb-2">
                {selectedMedia.title}
              </h2>
              <p className="text-slate-300 text-sm mb-4">
                {selectedMedia.description}
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                <span className="text-2xl font-bold">${selectedMedia.price}</span>
                <button
                  onClick={() => {
                    addToLibrary(selectedMedia);
                    setSelectedMedia(null);
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold"
                >
                  Book / Add to Library
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}