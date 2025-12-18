const users = [
    {
        "username": "alex",
        "password": "$2a$10$TNTi4yN4Rm2U0UIwascp/OsjcQ81mrpZJAN.8lVxNDMYlpgVclYN."
    },
    {
        "username": "user",
        "password": "$2a$10$obGG7Ae2hXK4Gfb.buy.re6pn8BdAXx/wO3S/DVzrK0cDZ9dotD4."
    },
    {
        "username": "ivan",
        "password": "$2a$10$aOFNowutqHmEJD2VEpVHruPkEVXS/qMbbMq4r5XW.gJuHIqc2.AIy"
    }
  ];

const favorites = {};

const User = {
  create: (username, password) => {
    const user = { username, password };
    users.push(user);
    favorites[username] = [];
    return user;
  },

  find: (username) => {
    return users.find((user) => user.username === username);
  },

  addFavorite: (username, trackId) => {
    if (favorites[username] && !favorites[username].includes(trackId)) {
      favorites[username].push(trackId);
    }
  },

  removeFavorite: (username, trackId) => {
    const index = favorites[username].indexOf(trackId);
    if (index > -1) {
      favorites[username].splice(index, 1);
    }
  },

  getFavorites: (username) => {
    return favorites[username] || [];
  },
};

module.exports = User;
