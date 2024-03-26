function generateOutlier(size) {
  return Math.floor(size * 1.25 + (Math.random() * size / 3)) // arbitrary
}

/**
 * Returns a sorted array of random numbers for the given randomizer
 * Based on https://gist.github.com/greim/4589675 with
 * visualizations at https://old.reddit.com/r/javascript/comments/170hm0/fun_with_mathrandom_and_probability_distributions/
 */
function randArray(size, rFunc, outliersCount) {
  const arr = []
  for (let n = 0; n < size; n++) {
    arr.push(Math.floor(rFunc() * size))
  }
  for (let n = 0; n < outliersCount; n++) { arr.push(generateOutlier(size)) }
  return arr.sort((a, b) => a - b)
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

function calculateMAD1(arr, median) {
  return 111
}

function calculateMAD2(arr, median) {
  return 222
}

export function calculateStats(arr, population = false) {
  const mean = arr.reduce((acc, n) => acc + n, 0) / (population ? arr.length : arr.length - 1)
  const stddev = calculateStandardDeviation(arr, mean)
  const median = isOdd(arr.length)
    ? arr[Math.floor(arr.length / 2)]
    : (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2
  const mad1 = calculateMAD1(arr, median)
  const mad2 = calculateMAD2(arr, median)
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
