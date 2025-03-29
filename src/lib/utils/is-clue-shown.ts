export function isClueShown(cluesShown: number, row: number, col: number) {
  return cluesShown & (1 << (row * 6 + col));
}
