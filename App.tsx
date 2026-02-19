
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import PlaceCard from './components/PlaceCard';
import AIChat from './components/AIChat';
import { MOCK_PLACES, CATEGORIES } from './constants';
import { Place, Category, TripPlan } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [myTrip, setMyTrip] = useState<TripPlan>({
    id: 'trip-1',
    destination: '',
    startDate: '',
    endDate: '',
    places: []
  });

  // Filtering Logic
  const filteredPlaces = useMemo(() => {
    return MOCK_PLACES.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           place.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? place.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const addToTrip = (place: Place) => {
    if (!myTrip.places.find(p => p.id === place.id)) {
      setMyTrip(prev => ({ ...prev, places: [...prev.places, place] }));
      alert(`Added ${place.name} to your trip!`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center bg-blue-900 overflow-hidden">
               <div className="absolute inset-0 opacity-40">
                  <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" alt="Travel" className="w-full h-full object-cover" />
               </div>
               <div className="relative z-10 text-center px-4 max-w-4xl">
                 <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                    Plan Better Trips with <span className="text-red-500 underline decoration-white underline-offset-8">Real Reviews</span>
                 </h1>
                 <p className="text-lg md:text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
                    Discover destinations, hotels, restaurants, and attractions with trusted traveler reviews.
                 </p>
                 <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row max-w-2xl mx-auto gap-2">
                    <input 
                      type="text" 
                      placeholder="Where to? (e.g. Paris, Tokyo)" 
                      className="flex-grow px-6 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button 
                      onClick={() => setActiveTab('destinations')}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-4 rounded-xl transition"
                    >
                      Explore Now
                    </button>
                 </div>
               </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setSelectedCategory(cat.value);
                      setActiveTab(cat.value.toLowerCase() + 's');
                    }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center border border-gray-100"
                  >
                    <span className="text-4xl mb-3">{cat.icon}</span>
                    <span className="font-bold text-blue-900">{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Popular Destinations */}
            <section className="max-w-7xl mx-auto px-4 py-16">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-black text-blue-900">Popular Destinations</h2>
                  <p className="text-slate-500">Explore the world's most visited cities and wonders.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('destinations')}
                  className="text-red-600 font-bold hover:underline"
                >
                  View all
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_PLACES.filter(p => p.category === Category.DESTINATION).slice(0, 3).map(place => (
                  <PlaceCard key={place.id} place={place} onClick={() => { setSelectedPlace(place); setActiveTab('details'); }} />
                ))}
              </div>
            </section>

            {/* AI Callout */}
            <section className="bg-gray-100 py-16">
              <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">New Feature</span>
                  <h2 className="text-4xl font-black text-blue-900 mb-6">Let AI Plan Your Next Big Adventure</h2>
                  <p className="text-lg text-slate-600 mb-8">
                    Get custom itineraries, local tips, and packing lists powered by the latest AI technology. Just start a chat!
                  </p>
                  <button 
                    className="bg-blue-900 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-800 transition"
                    onClick={() => {
                      const chatBtn = document.querySelector('.bg-red-600.text-white.p-4.rounded-full.shadow-xl') as HTMLElement;
                      chatBtn?.click();
                    }}
                  >
                    Try Smart Advisor
                  </button>
                </div>
                <div className="flex-1 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 rotate-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-500"></div>
                    <div>
                      <h4 className="font-bold text-slate-800">TRIP-IN AI</h4>
                      <p className="text-xs text-slate-500">Travel Guru</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-slate-700 italic border-l-4 border-red-500">
                      "I recommend checking out Oia for sunset, then dinner at The French Bistro..."
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-sm text-slate-700">
                      "Should I pack a rain jacket for Tokyo in October?"
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-slate-700 italic border-l-4 border-red-500">
                      "Yes, Tokyo gets about 7 days of rain in October. A light waterproof layer is ideal."
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case 'destinations':
      case 'hotels':
      case 'restaurants':
        const currentCategory = 
          activeTab === 'hotels' ? Category.HOTEL : 
          activeTab === 'restaurants' ? Category.RESTAURANT : 
          activeTab === 'destinations' ? Category.DESTINATION : null;

        const displayPlaces = MOCK_PLACES.filter(p => currentCategory ? p.category === currentCategory : true);

        return (
          <div className="max-w-7xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl font-black text-blue-900 mb-2 capitalize">{activeTab}</h2>
            <p className="text-slate-500 mb-8">Find the highest rated {activeTab} worldwide.</p>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters Sidebar */}
              <aside className="w-full md:w-64 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-4">Search</h3>
                  <input 
                    type="text" 
                    placeholder={`Search ${activeTab}...`} 
                    className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-4">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3].map(stars => (
                      <label key={stars} className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="rounded text-red-600 focus:ring-red-500" />
                        <span>{stars} Stars & up</span>
                      </label>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Grid */}
              <div className="flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayPlaces.length > 0 ? (
                    displayPlaces.map(place => (
                      <PlaceCard 
                        key={place.id} 
                        place={place} 
                        showPrice={activeTab === 'hotels' || activeTab === 'restaurants'}
                        onClick={() => { setSelectedPlace(place); setActiveTab('details'); }} 
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center text-slate-500">
                      No results found. Try a different search!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'details':
        if (!selectedPlace) {
           setActiveTab('home');
           return null;
        }
        return (
          <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in duration-500">
            <button 
              onClick={() => setActiveTab('home')}
              className="text-slate-500 hover:text-red-600 font-bold flex items-center mb-6"
            >
              ← Back to explore
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-[400px] object-cover rounded-3xl shadow-xl" />
                <div className="grid grid-cols-3 gap-4">
                  <img src="https://picsum.photos/seed/d1/400/400" className="rounded-xl aspect-square object-cover" />
                  <img src="https://picsum.photos/seed/d2/400/400" className="rounded-xl aspect-square object-cover" />
                  <img src="https://picsum.photos/seed/d3/400/400" className="rounded-xl aspect-square object-cover" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{selectedPlace.category}</span>
                  <div className="flex items-center text-amber-500 font-bold">
                    <span className="mr-1">★</span>
                    <span className="text-slate-700">{selectedPlace.rating}</span>
                  </div>
                </div>
                <h2 className="text-4xl font-black text-blue-900 mb-4">{selectedPlace.name}</h2>
                <p className="text-slate-600 leading-relaxed mb-8">{selectedPlace.description}</p>
                
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm mb-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Location</span>
                    <span className="font-bold text-blue-900">{selectedPlace.location}</span>
                  </div>
                  {selectedPlace.pricePerNight && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Price per night</span>
                      <span className="font-black text-2xl text-slate-900">${selectedPlace.pricePerNight}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button 
                    onClick={() => addToTrip(selectedPlace)}
                    className="flex-grow bg-blue-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-800 transition"
                  >
                    Add to Trip
                  </button>
                  <button className="bg-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-red-700 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Review Section */}
            <section className="mt-16 border-t pt-16">
               <div className="flex justify-between items-center mb-10">
                 <h3 className="text-3xl font-black text-blue-900">Traveler Reviews</h3>
                 <button className="bg-white border-2 border-slate-200 hover:border-red-600 text-slate-800 px-6 py-2 rounded-xl font-bold transition">
                   Write a Review
                 </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {selectedPlace.reviews.length > 0 ? (
                   selectedPlace.reviews.map(review => (
                     <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                       <div className="flex justify-between mb-4">
                         <div>
                           <div className="font-bold text-slate-800">{review.userName}</div>
                           <div className="text-xs text-slate-400">{review.date}</div>
                         </div>
                         <div className="text-amber-500">
                           {Array(review.rating).fill('★').join('')}
                         </div>
                       </div>
                       <p className="text-slate-600 text-sm leading-relaxed">"{review.comment}"</p>
                     </div>
                   ))
                 ) : (
                   <div className="col-span-full py-12 text-center bg-gray-50 rounded-2xl text-slate-500">
                     No reviews yet. Be the first to share your experience!
                   </div>
                 )}
               </div>
            </section>
          </div>
        );

      case 'planner':
        return (
          <div className="max-w-4xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4">
             <div className="bg-blue-900 text-white p-10 rounded-[40px] shadow-2xl mb-12 relative overflow-hidden">
                <div className="relative z-10">
                   <h2 className="text-4xl font-black mb-4">Your Trip Plan</h2>
                   <p className="text-blue-100 mb-8 max-w-md">Everything you've saved for your next big adventure.</p>
                   <div className="flex flex-wrap gap-4">
                     <div className="bg-blue-800/50 backdrop-blur px-6 py-3 rounded-2xl">
                       <span className="block text-xs uppercase font-bold text-blue-300 mb-1">Items</span>
                       <span className="text-xl font-bold">{myTrip.places.length}</span>
                     </div>
                     <div className="bg-blue-800/50 backdrop-blur px-6 py-3 rounded-2xl">
                       <span className="block text-xs uppercase font-bold text-blue-300 mb-1">Status</span>
                       <span className="text-xl font-bold">Drafting</span>
                     </div>
                   </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full -mr-20 -mt-20 opacity-20"></div>
             </div>

             <div className="space-y-6">
                {myTrip.places.length > 0 ? (
                  myTrip.places.map(place => (
                    <div key={place.id} className="bg-white flex items-center p-4 rounded-3xl shadow-sm border border-gray-100 group">
                      <img src={place.image} className="w-24 h-24 rounded-2xl object-cover mr-6" />
                      <div className="flex-grow">
                        <h4 className="font-black text-blue-900 text-lg">{place.name}</h4>
                        <p className="text-slate-500 text-sm">{place.location}</p>
                      </div>
                      <button 
                        onClick={() => setMyTrip(prev => ({ ...prev, places: prev.places.filter(p => p.id !== place.id) }))}
                        className="p-3 text-slate-300 hover:text-red-600 transition"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-24">
                     <div className="text-6xl mb-6">🧳</div>
                     <h3 className="text-2xl font-bold text-slate-800 mb-2">Your planner is empty</h3>
                     <p className="text-slate-500 mb-8">Start exploring destinations and add them to your trip.</p>
                     <button 
                       onClick={() => setActiveTab('home')}
                       className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-red-700 transition"
                     >
                       Find Places
                     </button>
                  </div>
                )}
             </div>

             {myTrip.places.length > 0 && (
               <div className="mt-12 p-8 bg-gray-100 rounded-3xl text-center">
                 <p className="text-slate-600 mb-6">Want to finalize this plan?</p>
                 <button className="bg-blue-900 text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-blue-800 transition">
                   Export as PDF / Calendar
                 </button>
               </div>
             )}
          </div>
        );

      case 'support':
        return (
          <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in">
            <h2 className="text-4xl font-black text-blue-900 mb-8">Support Center</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Contact Us</h3>
                  <form className="space-y-4">
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
                        <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500" placeholder="John Doe" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                        <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500" placeholder="john@example.com" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Message</label>
                        <textarea className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 min-h-[150px]" placeholder="How can we help?"></textarea>
                     </div>
                     <button className="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-700 transition">
                        Send Message
                     </button>
                  </form>
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">FAQs</h3>
                  <div className="space-y-4">
                    {[
                      { q: "How do I book a hotel?", a: "Find your hotel, click 'Book Now', and follow the payment instructions." },
                      { q: "Are reviews verified?", a: "Yes, we prioritize reviews from users with confirmed bookings." },
                      { q: "Refund Policy", a: "Policies vary by provider, but we help facilitate disputes within 48 hours." },
                      { q: "Safety Information", a: "Check our Global Safety Guide for the latest travel advisories." }
                    ].map((faq, i) => (
                      <div key={i} className="border-b border-gray-100 pb-4">
                        <h4 className="font-bold text-blue-900 mb-2">{faq.q}</h4>
                        <p className="text-sm text-slate-600">{faq.a}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        );
      
      default:
        return <div>404 Page Not Found</div>;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
      <AIChat />
    </Layout>
  );
};

export default App;
