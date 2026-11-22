// Large jumps use one transition instead of allocating a tween for every integer.
export function getNumberSteps(from: number, to: number, maxSteps = 60): number[] {
  if (!Number.isSafeInteger(from) || !Number.isSafeInteger(to) || from === to) return [];
  const difference = Math.abs(to - from);
  if (difference > maxSteps) return [to];
  const increment = to > from ? 1 : -1;
  return Array.from({ length: difference }, (_, index) => from + increment * (index + 1));
}
