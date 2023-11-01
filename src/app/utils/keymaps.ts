/*
-2-1-
5-43
87-6
*/
export type IKey = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export const keys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const keyMap: { [key: string]: string[] } = {
  C: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'B'],
  D: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#'],
  E: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#'],
  F: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'E'],
  G: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#'],
  A: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#'],
  B: ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#'],
};
