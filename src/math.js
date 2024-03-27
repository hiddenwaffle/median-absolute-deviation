function generateOutlier(size) {
  return Math.floor(size * 2.25 + (Math.random() * size / 3)) // arbitrary
}

/**
 * Returns an array of random numbers for the given randomizer
 * Based on https://gist.github.com/greim/4589675 with
 * visualizations at https://old.reddit.com/r/javascript/comments/170hm0/fun_with_mathrandom_and_probability_distributions/
 */
function randArray(size, rFunc, outliersCount) {
  const arr = []
  for (let n = 0; n < size; n++) {
    arr.push(Math.floor(rFunc() * size))
  }
  for (let n = 0; n < outliersCount; n++) { arr.push(generateOutlier(size)) }
  return arr
}

export function randUniformArray(size, outliersCount) {
  return randArray(
    size,
    () => Math.random(),
    outliersCount
  )
}

export function randSymmetricArray(size, outliersCount) {
  return randArray(
    size,
    () => (Math.random() + Math.random() + Math.random() + Math.random()) / 4,
    outliersCount
  )
}

export function randLeftSkewArray(size, outliersCount) {
  return randArray(
    size,
    () => Math.max(Math.random(), Math.random(), Math.random(), Math.random()),
    outliersCount
  )
}

/**
 * https://stackoverflow.com/a/5016327
 */
function isOdd(n) {
  return n % 2
}

function calculateStandardDeviation(arr, mean) {
  return Math.sqrt(arr.map(n => (n - mean) ** 2).reduce((acc, n) => acc + n, 0) / arr.length)
}

/**
 * The median of the absolute values of (elements minus the given median)
 */
function calculateMad1(arr, median) {
  return calculateMedian(arr.map(x => Math.abs(x - median)))
}

/**
 * The sum of (the absolute value of an array element minus the median),
 * all divided by the number of elements
 */
function calculateMad2(arr, median) {
  return arr.map(x => Math.abs(x - median)).reduce((acc, n) => acc + n, 0) / arr.length
}

/**
 * TODO: Should probably write a comprehensive test for this function
 */
function calculateMedian(arrUnsorted) {
  const arr = arrUnsorted.sort((a, b) => a - b)
  return isOdd(arr.length)
    ? arr[Math.floor(arr.length / 2)]
    : (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2
}

export function calculateStats(arr, population = false) {
  const mean = arr.reduce((acc, n) => acc + n, 0) / (population ? arr.length : arr.length - 1)
  const stddev = calculateStandardDeviation(arr, mean)
  const median = calculateMedian(arr)
  const mad1 = calculateMad1(arr, median)
  const mad2 = calculateMad2(arr, median)
  return { median, mean, stddev, mad1, mad2 }
}
/**
 * Fisher-Yates, from: https://javascript.info/array-methods#shuffle-an-array
 */
function shuffle(prev) {
  const next = [...prev]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const x = next[j]
    const y = next[i]
    next[i] = x
    next[j] = y
  }
  return next
}

export function getSample(arr, sampleSize) {
  return shuffle(arr).slice(0, sampleSize)
}

/**
 * Calculate % difference between the sample values and the population values
 */
function calculatePercentageDiff(sampleValues, populationValue) {
  return sampleValues.map(x => Math.abs(x - populationValue) / populationValue)
}

export function compareStats(populationStats, samplesStats) {
  const samplesStddevArray = samplesStats.map(sampleStat => sampleStat.stddev)
  const samplesMad1Array = samplesStats.map(sampleStat => sampleStat.mad1)
  const samplesMad2Array = samplesStats.map(sampleStat => sampleStat.mad2)
  const stddevPercentDiffs = calculatePercentageDiff(samplesStddevArray, populationStats.stddev)
  const mad1PercentDiffs = calculatePercentageDiff(samplesMad1Array, populationStats.mad1)
  const mad2PercentDiffs = calculatePercentageDiff(samplesMad2Array, populationStats.mad2)
  const stddevPercentDiffStats = calculateStats(stddevPercentDiffs)
  const mad1PercentDiffStats = calculateStats(mad1PercentDiffs)
  const mad2PercentDiffStats = calculateStats(mad2PercentDiffs)
  return {
    stddevPercentDiffStats,
    mad1PercentDiffStats,
    mad2PercentDiffStats
  }
}

/**
 * Hacky solution to having visually comparable sections
 */
export function findMinMaxTimes100(uniformStats, symmetricStats, skewedStats) {
  let minFound = Number.MAX_SAFE_INTEGER
  let maxFound = 0
  for (let dist of [uniformStats, symmetricStats, skewedStats]) {
    for (let name of ['stddevPercentDiffStats', 'mad1PercentDiffStats', 'mad2PercentDiffStats']) {
      const stats = dist[name]
      const min = Math.min(stats.mean, stats.stddev)
      const max = Math.max(stats.mean, stats.stddev)
      if (min < minFound) {
        minFound = min
      }
      if (max > maxFound) {
        maxFound = max
      }
    }
  }
  return [Math.floor(minFound * 100), Math.ceil(maxFound * 100)]
}
