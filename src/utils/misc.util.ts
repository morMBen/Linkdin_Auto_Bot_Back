

export function getRandomTimeInterval(rangeMiliSecs: number): number {
  return Math.random() * rangeMiliSecs + 750;
};
