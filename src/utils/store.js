import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
  points: 10,
  deck: [],
  favoriteCards: [],
  team: [],
  notifications: [],

  addPoints: (amount) => set((state) => ({ points: state.points + amount })),
  deductPoints: (amount) => set((state) => ({ points: state.points - amount })),

  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification]
  })),
  clearNotification: () => set((state) => ({
    notifications: state.notifications.slice(1)
  })),

  addToDeck: (pokemon) => {
    const { deck, addPoints, addNotification } = get();
    if (deck.length >= 50) {
      addPoints(2);
      addNotification({ message: `${pokemon.name} discarded (deck full) for 2 points!`, type: 'info' });
      return;
    }
    if (deck.some(card => card.id === pokemon.id)) {
      addNotification({ message: `${pokemon.name} is already in your deck!`, type: 'error' });
      return;
    }
    set((state) => ({ deck: [...state.deck, pokemon] }));
    addNotification({ message: `${pokemon.name} added to deck!`, type: 'success' });
  },

  removeFromDeck: (pokemonId) => {
    set((state) => ({
      deck: state.deck.filter((card) => card.id !== pokemonId),
      team: state.team.filter((card) => card.id !== pokemonId)
    }));
    get().addNotification({ message: 'Card removed from deck!', type: 'success' });
  },

  addToFavorites: (pokemon) => {
    const { favoriteCards, addNotification } = get();
    if (favoriteCards.length >= 10) {
      addNotification({ message: 'Favorite cards limit reached (10)!', type: 'error' });
      return;
    }
    if (favoriteCards.some(card => card.id === pokemon.id)) {
      addNotification({ message: `${pokemon.name} is already in your favorites!`, type: 'error' });
      return;
    }
    set((state) => ({ favoriteCards: [...state.favoriteCards, { ...pokemon, customName: null }] }));
    addNotification({ message: `${pokemon.name} added to favorites!`, type: 'success' });
  },

  removeFromFavorites: (pokemonId) => {
    set((state) => ({
      favoriteCards: state.favoriteCards.filter((card) => card.id !== pokemonId),
      team: state.team.filter((card) => card.id !== pokemonId)
    }));
    get().addNotification({ message: 'Card removed from favorites!', type: 'success' });
  },

  removeCardForPoints: (pokemonId) => {
    const { deck, addPoints, addNotification } = get();
    const cardToRemove = deck.find(card => card.id === pokemonId);

    if (cardToRemove) {
      set((state) => ({
        deck: state.deck.filter((card) => card.id !== pokemonId),
        team: state.team.filter((card) => card.id !== pokemonId)
      }));
      addPoints(2);
      addNotification({ message: `${cardToRemove.name} sold for 2 points!`, type: 'success' });
    }
  },

  renameFavoriteCard: (pokemonId, newName) => {
    set((state) => ({
      favoriteCards: state.favoriteCards.map((card) =>
        card.id === pokemonId ? { ...card, customName: newName } : card
      ),
      team: state.team.map((card) =>
        card.id === pokemonId ? { ...card, customName: newName } : card
      )
    }));
  },

  resetFavoriteCardName: (pokemonId) => {
    set((state) => ({
      favoriteCards: state.favoriteCards.map((card) =>
        card.id === pokemonId ? { ...card, customName: null } : card
      ),
      team: state.team.map((card) =>
        card.id === pokemonId ? { ...card, customName: null } : card
      )
    }));
  },

  addToTeam: (pokemon) => {
    const { team, addNotification } = get();
    if (team.length >= 6) {
      addNotification({ message: 'Team limit reached (6)!', type: 'error' });
      return;
    }
    if (team.some(card => card.id === pokemon.id)) {
      addNotification({ message: `${pokemon.name} is already in your team!`, type: 'error' });
      return;
    }
    set((state) => ({ team: [...state.team, pokemon] }));
    addNotification({ message: `${pokemon.name} added to team!`, type: 'success' });
  },

  removeFromTeam: (pokemonId) => {
    set((state) => ({
      team: state.team.filter((card) => card.id !== pokemonId)
    }));
    get().addNotification({ message: 'Card removed from team!', type: 'success' });
  },
}));