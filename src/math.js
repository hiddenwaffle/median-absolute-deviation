/**
 * Fisher-Yates, from: https://javascript.info/array-methods#shuffle-an-array
 */
export function shuffle(prev) {
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

function generateOutlier(size) {
  return size * 1.25 + (Math.random() * size / 3) // arbitrary
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

export function calculateStats(arr, population = false) {
  const median = (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2
  const mean = arr.reduce((acc, n) => acc + n, 0) / (population ? arr.length : arr.length - 1)
  return { median, mean }
}
