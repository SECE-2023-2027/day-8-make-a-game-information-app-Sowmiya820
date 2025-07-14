'use client';

import { useEffect, useState } from 'react';
import GameCard from './components/GameCard';
import { fetchGames } from '../utils/fetchGames';

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Load games + favorites from localStorage
  useEffect(() => {
    const load = async () => {
      const data = await fetchGames();
      setGames(data);

      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };
    load();
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (gameId) => {
    if (favorites.includes(gameId)) {
      setFavorites(favorites.filter(id => id !== gameId));
    } else {
      setFavorites([...favorites, gameId]);
    }
  };

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-6">🎮 Game Explorer</h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search games..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredGames.length > 0 ? (
          filteredGames.map((game, index) => (
            <GameCard
              key={index}
              game={game}
              isFavorite={favorites.includes(game.id)}
              toggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No games found.</p>
        )}
      </div>
    </main>
  );
}
