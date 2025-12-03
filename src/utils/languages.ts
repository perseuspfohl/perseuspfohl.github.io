const languages = [
  "Java",
  "C#",
  "CSS",
  "Python",
];

export default shuffleArray(languages);

export function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}
