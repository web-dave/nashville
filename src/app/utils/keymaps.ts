/*
-2-1-
5-43
87-6
*/
export type IKey = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export const keys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const keyMap: { [key: string]: string[] } = {
  C: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  D: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  E: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  F: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  G: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  A: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  B: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
};
