import React, { useState } from 'react';

class MediaItem {
  constructor(id, title, category, rating, price, image, description, status) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.rating = rating;
    this.price = price;
    this.image = image;
    this.description = description;
    this.status = status;
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
    'Orbitfall',
    'Games',
    4.8,
    'PHP 39.00',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    'A last signal. An uncharted world. Step into the suit of a lone explorer and uncover what remains at the edge of the solar system. Traverse breathtaking landscapes, solve ancient mysteries, and test your will to survive.',
    'Ready to play'
  ),
  new MediaItem(
    2,
    'Afterhours Festival',
    'Events',
    4.9,
    'PHP 65.00',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    'Exclusive global music and immersive art festival streaming live from London.',
    'Booking confirmed'
  ),
  new MediaItem(
    3,
    'Signal+',
    'Streaming',
    4.7,
    'PHP 12.00',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    'Independent films, cutting-edge documentaries, and underground sci-fi series.',
    'Subscription active'
  ),
  new MediaItem(
    4,
    'Driftline',
    'Games',
    4.6,
    'PHP 29.00',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    'High-speed cyberpunk street racing across neon-lit dystopian highways.',
    'Ready to play'
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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#CCFF00] selection:text-black">
      <header className="border-b border-zinc-800 px-6 py-4 sticky top-0 z-10 bg-black/90 backdrop-blur">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="bg-[#CCFF00] text-black font-black px-2.5 py-1 rounded text-lg tracking-wider">
              N
            </span>
            <span className="font-bold tracking-widest text-lg">NEXUS ENTERTAINMENT</span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`transition hover:text-[#CCFF00] ${
                activeTab === 'catalog' ? 'text-white font-semibold' : 'text-zinc-400'
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`transition flex items-center gap-1.5 hover:text-[#CCFF00] ${
                activeTab === 'library' ? 'text-white font-semibold' : 'text-zinc-400'
              }`}
            >
              My Library
              <span className="bg-zinc-800 text-white px-2 py-0.5 rounded-full text-xs">
                {myLibrary.length}
              </span>
            </button>
            <a
              href={figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-full text-xs font-medium transition border border-zinc-700"
            >
              Figma ↗
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {activeTab === 'catalog' && (
          <div>
            <div className="mb-12">
              <p className="text-xs uppercase tracking-widest text-[#CCFF00] font-semibold mb-2">
                YOUR NEXT OBSESSION
              </p>
              <h1 className="text-5xl font-extrabold tracking-tight mb-8">
                Good times. On demand.
              </h1>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                  <input
                    type="text"
                    placeholder="Search games, events, streaming..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#CCFF00]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-3 text-zinc-500 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                  {['All', 'Games', 'Events', 'Streaming'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                        selectedCategory === cat
                          ? 'bg-[#CCFF00] text-black'
                          : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xs text-zinc-400 uppercase tracking-wider">
                Curated for your downtime
              </span>
              <span className="text-xs text-zinc-500">
                {filteredItems.length} experiences
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMedia(item)}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden group cursor-pointer hover:border-zinc-700 transition flex flex-col"
                >
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-[#CCFF00]">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1 group-hover:text-[#CCFF00] transition">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-zinc-400 mb-4">
                        <span>★ {item.rating}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-zinc-800/80 flex justify-between items-center">
                      <div>
                        <div className="text-sm font-extrabold text-white">{item.price}</div>
                        <div className="text-[10px] text-zinc-500">One-time purchase</div>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs group-hover:bg-[#CCFF00] group-hover:text-black transition">
                        ↗
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#CCFF00] font-semibold mb-2">
                MAKE TIME FOR WHAT MOVES YOU
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight">My Booked Library</h1>
            </div>
            {myLibrary.length === 0 ? (
              <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
                <p>Your library is currently empty. Explore the catalog to book experiences!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myLibrary.map((item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#CCFF00] tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-lg text-white">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="text-xs text-zinc-400">{item.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800">
                      <div className="text-right">
                        <div className="text-base font-extrabold text-white">{item.price}</div>
                        <div className="text-[10px] text-zinc-500">Verified purchase</div>
                      </div>
                      <button
                        onClick={() => removeFromLibrary(item.id)}
                        className="bg-zinc-800 hover:bg-rose-950/50 hover:text-rose-400 text-zinc-300 px-3 py-1.5 rounded-lg text-xs font-medium transition border border-zinc-700"
                      >
                        Remove ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedMedia && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full overflow-hidden relative shadow-2xl">
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition z-10 text-sm font-bold"
              >
                ✕
              </button>
              <div className="h-72 w-full relative">
                <img
                  src={selectedMedia.image}
                  alt={selectedMedia.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-wider">
                    GAMES • Open world adventure
                  </span>
                  <span className="text-xs text-zinc-400">★ {selectedMedia.rating}</span>
                </div>
                <h2 className="text-3xl font-black text-white mb-2">{selectedMedia.title}</h2>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  {selectedMedia.description}
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-zinc-800 gap-4">
                  <div>
                    <div className="text-2xl font-black text-white">{selectedMedia.price}</div>
                    <div className="text-xs text-zinc-500">One-time purchase</div>
                  </div>
                  <button
                    onClick={() => {
                      addToLibrary(selectedMedia);
                      setSelectedMedia(null);
                    }}
                    className="w-full sm:w-auto bg-[#CCFF00] hover:bg-[#b3e600] text-black px-8 py-3 rounded-xl font-bold text-sm transition shadow-lg flex items-center justify-center gap-2"
                  >
                    Add / Book Now +
                  </button>
                </div>
                <div className="text-center mt-4">
                  <span className="text-[10px] text-zinc-500">🔒 Secure checkout • Nexus Gateway</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}