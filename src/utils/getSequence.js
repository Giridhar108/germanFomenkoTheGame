import genRandom from './genRandom.js';

export default (round) => {
  const iter = (currentTerm, acc) => {
    const el = genRandom(1, 4);
    if (acc.length === round) {
      return acc;
    }
    return iter(currentTerm + el, [...acc, el]);
  };
  return iter(0, []);
};
