const getRandomIds = (count, min = 1, max = 1000) => {
  const ids = new Set();

  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    ids.add(randomId);
  }

  return Array.from(ids);
};

export default getRandomIds;
