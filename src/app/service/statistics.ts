export interface IStatsResult {
  low: number;
  q1: number;
  median: number;
  q3: number;
  high: number;
  mean: number;
  elements: number;
}


export class Statistics {

  static filter(arr: number[], dropoff_sds: number, sort?: boolean) {
    if (sort) {
      arr.sort(function (a, b) { return a - b; });
    }

    let sum = arr.reduce((p, c) => p + c, 0);
    const mean = sum / arr.length;

    let diffs = [];
    for (let v of arr) {
      diffs.push(Math.pow(v - mean, 2));
    }
    let d = diffs.reduce((a, b, ) => a + b, 0);
    let sd = Math.sqrt(d / (arr.length - 1));

    let min_value = arr[0] + (sd * dropoff_sds);

    let pos = 0;
    for (let n of arr) {
      if (n > min_value) {
        break;
      }
      pos++;
    }

    return arr.slice(0, pos + 1);
  }

  static percentile(arr: number[], p: number, sort?: boolean): number {

    if (arr.length === 0) {
      return 0;
    }

    if (sort) {
      arr.sort(function (a, b) { return a - b; });
    }

    if (p <= 0) {
      return arr[0];
    }
    if (p >= 1) {
      return arr[arr.length - 1];
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

  static calculateStats(results: number[]): IStatsResult {
    let high = Number.MIN_SAFE_INTEGER;
    let low = Number.MAX_SAFE_INTEGER;
    let sum = 0;

    for (const count of results) {
      if (count < low) {
        low = count;
      }
      if (count > high) {
        high = count;
      }
      sum += count;
    }

    const mean = sum / results.length;

    const q1 = Statistics.percentile(results, 0.25);
    const q3 = Statistics.percentile(results, 0.75);
    const median = Statistics.percentile(results, 0.5);

    return { low: low, q1: q1, median: median, q3: q3, high: high, mean: mean, elements: results.length };
  }

}
