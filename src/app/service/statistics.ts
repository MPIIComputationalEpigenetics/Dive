


export class Statistics {
  static percentile(arr: number[], p: number, sort?: boolean): number {
    if (arr.length === 0) {
      return 0;
    }
    if (typeof p !== 'number') {
      throw new TypeError('p must be a number');
    }

    if (p <= 0) {
      return arr[0];
    }
    if (p >= 1) {
      return arr[arr.length - 1];
    }

    if (sort) {
      arr.sort(function (a, b) { return a - b; });
    }

    const index = (arr.length - 1) * p;
    const lower = Math.floor(index);
    const upper = lower + 1;
    const weight = index % 1;

    if (upper >= arr.length) {
      return arr[lower];
    }

    return arr[lower] * (1 - weight) + arr[upper] * weight;
  }
}
