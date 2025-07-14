import { useState } from 'react';

export default function GameCard({ game, isFavorite, toggleFavorite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const getGenreColor = (genre) => {
    const colors = {
      'Adventure': 'bg-green-100 text-green-800',
      'Action': 'bg-red-100 text-red-800',
      'RPG': 'bg-purple-100 text-purple-800',
      'Action RPG': 'bg-indigo-100 text-indigo-800',
      'Superhero': 'bg-blue-100 text-blue-800',
      'Metroidvania': 'bg-orange-100 text-orange-800',
    };
    return colors[genre] || 'bg-gray-100 text-gray-800';
  };

  const getRatingColor = (rating) => {
    if (rating >= 9.0) return 'text-green-600';
    if (rating >= 8.0) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const originalPrice = game.isOnSale ? game.price / (1 - game.discountPercentage / 100) : null;

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sale Badge */}
      {game.isOnSale && (
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
          -{game.discountPercentage}%
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {!imageError ? (
          <img 
            src={game.image} 
            alt={game.title}
            className={`w-full h-full object-cover transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🎮</div>
              <div className="text-sm text-gray-600">Image unavailable</div>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } flex items-center justify-center`}>
          <div className="text-white text-center">
            <div className="text-sm font-semibold mb-2">Quick Actions</div>
            <div className="space-y-2">
              <button className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                View Details
              </button>
              <button className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <span>⭐</span>
          <span>{game.rating}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-2 flex-1 pr-2">
            {game.title}
          </h2>
          <button
            onClick={() => toggleFavorite(game.id)}
            className={`p-2 rounded-full transition-all duration-200 flex-shrink-0 ${
              isFavorite 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3">
          {game.description}
        </p>

        {/* Genre and Developer */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getGenreColor(game.genre)}`}>
            {game.genre}
          </span>
          <span className="text-xs text-gray-500">
            by {game.developer}
          </span>
        </div>

        {/* Rating and Year */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${getRatingColor(game.rating)}`}>
              ⭐ {game.rating}/10
            </span>
            <span className="text-gray-500">
              ({game.releaseYear})
            </span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            {game.isOnSale && originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
            <span className={`font-bold ${game.isOnSale ? 'text-red-600' : 'text-green-600'}`}>
              {formatPrice(game.price)}
            </span>
          </div>
          
          <div className="flex gap-2">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              onClick={() => console.log('Add to cart:', game.title)}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Platform indicators */}
        <div className="flex flex-wrap gap-1 pt-2">
          {game.platform.map((platform, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}