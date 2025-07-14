export async function fetchGames() {
  // Remove duplicates and add unique IDs
  const uniqueGames = [];
  const seenTitles = new Set();
  
  const rawGames = [
    {
      title: 'The Legend of Zelda: Breath of the Wild',
      description: 'Explore the vast kingdom of Hyrule in this critically acclaimed open-world adventure.',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png',
      rating: 9.5,
      genre: 'Adventure',
    },
    {
      title: 'God of War: Ragnarok',
      description: 'Kratos and Atreus venture through the Nine Realms in this action-packed Norse saga.',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6t5v.png',
      rating: 9.3,
      genre: 'Action',
    },
    {
      title: 'Cyberpunk 2077',
      description: 'Dive into the neon-lit streets of Night City in this futuristic RPG.',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r0n.png',
      rating: 8.2,
      genre: 'RPG',
    },
    {
      title: 'Elden Ring',
      description: 'Unravel the mysteries of the Lands Between in this open-world dark fantasy RPG.',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p8u.png',
      rating: 9.7,
      genre: 'Action RPG',
    },
    {
      title: 'Spider-Man: Miles Morales',
      description: 'Swing through New York as Miles Morales and take on new threats.',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6t4i.png',
      rating: 8.8,
      genre: 'Superhero',
    },
    {
      title: 'Red Dead Redemption 2',
      description: 'Follow Arthur Morgan and the Van der Linde gang across the dying Wild West.',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r84.png',
      rating: 9.6,
      genre: 'Adventure',
    },
    {
      title: 'Hollow Knight',
      description: 'Battle your way through the ruined kingdom of Hallownest in this indie classic.',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r3h.png',
      rating: 9.0,
      genre: 'Metroidvania',
    },
    {
      title: 'The Witcher 3: Wild Hunt',
      description: 'Become Geralt of Rivia and explore a vast open world full of monsters and magic.',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rgn.png',
      rating: 9.4,
      genre: 'RPG',
    },
    {
      title: 'Assassin\'s Creed Valhalla',
      description: 'Lead your Viking clan to glory as Eivor in this historical action RPG.',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rj4.png',
      rating: 8.6,
      genre: 'Action RPG',
    },
  ];

  // Add unique IDs and additional properties while removing duplicates
  rawGames.forEach((game, index) => {
    if (!seenTitles.has(game.title)) {
      seenTitles.add(game.title);
      uniqueGames.push({
        id: index + 1,
        ...game,
        price: generatePrice(game.rating),
        releaseYear: generateReleaseYear(game.title),
        platform: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
        developer: getDeveloper(game.title),
        isOnSale: Math.random() > 0.7,
        discountPercentage: Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 10 : 0,
      });
    }
  });

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return uniqueGames;
}

function generatePrice(rating) {
  // Higher rated games tend to be more expensive
  const basePrice = Math.floor(rating * 7) + 15;
  return Math.floor(basePrice / 5) * 5 - 0.01; // Round to nearest $5 and add .99
}

function generateReleaseYear(title) {
  const yearMap = {
    'The Legend of Zelda: Breath of the Wild': 2017,
    'God of War: Ragnarok': 2022,
    'Cyberpunk 2077': 2020,
    'Elden Ring': 2022,
    'Spider-Man: Miles Morales': 2020,
    'Red Dead Redemption 2': 2018,
    'Hollow Knight': 2017,
    'The Witcher 3: Wild Hunt': 2015,
    'Assassin\'s Creed Valhalla': 2020,
  };
  return yearMap[title] || 2020;
}

function getDeveloper(title) {
  const devMap = {
    'The Legend of Zelda: Breath of the Wild': 'Nintendo',
    'God of War: Ragnarok': 'Santa Monica Studio',
    'Cyberpunk 2077': 'CD Projekt Red',
    'Elden Ring': 'FromSoftware',
    'Spider-Man: Miles Morales': 'Insomniac Games',
    'Red Dead Redemption 2': 'Rockstar Games',
    'Hollow Knight': 'Team Cherry',
    'The Witcher 3: Wild Hunt': 'CD Projekt Red',
    'Assassin\'s Creed Valhalla': 'Ubisoft',
  };
  return devMap[title] || 'Unknown Developer';
}

export async function fetchGamesByGenre(genre) {
  const allGames = await fetchGames();
  return allGames.filter(game => game.genre === genre);
}

export async function fetchFeaturedGames() {
  const allGames = await fetchGames();
  return allGames.filter(game => game.rating >= 9.0);
}

export async function searchGames(query) {
  const allGames = await fetchGames();
  return allGames.filter(game => 
    game.title.toLowerCase().includes(query.toLowerCase()) ||
    game.description.toLowerCase().includes(query.toLowerCase()) ||
    game.genre.toLowerCase().includes(query.toLowerCase())
  );
}