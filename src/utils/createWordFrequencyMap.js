export default function createWordFrequencyMap(text) {
  const wordRegex = /[^\s-]+/g; // Updated regex to include non-space characters and hyphens
  const words = text.match(wordRegex);
  const wordFrequency = {};

  if (!words) return [];

  for (const word of words) {
    const normalizedWord = word.toLowerCase();
    wordFrequency[normalizedWord] = (wordFrequency[normalizedWord] || 0) + 1;
  }
  return Object.entries(wordFrequency)
    .map(([word, frequency]) => ({ word, frequency }))
    .sort((a, b) => b.frequency - a.frequency);
}
