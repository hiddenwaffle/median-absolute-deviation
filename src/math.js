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

/**
 * Returns a sorted array of random numbers for the given randomizer
 * Based on https://gist.github.com/greim/4589675 with
 * visualizations at https://old.reddit.com/r/javascript/comments/170hm0/fun_with_mathrandom_and_probability_distributions/
 */
function randArray(size, rFunc) {
  const arr = []
  for (let n = 0; n < size; n++) {
    arr.push(Math.floor(rFunc() * size))
  }
  // for (let n = 0; n < 10_000; n++) { arr.push(POPULATION_SIZE * 2) } // injects some outliers (TODO: ensure commented)
  return arr.sort((a, b) => a - b)
}

export function randUniformArray(size) {
  return randArray(
    size,
    () => Math.random()
  )
}

export function randSymmetricArray(size) {
  return randArray(
    size,
    () => (Math.random() + Math.random() + Math.random() + Math.random()) / 4
  )
}

export function randLeftSkewArray(size) {
  return randArray(
    size,
    () => Math.max(Math.random(), Math.random(), Math.random(), Math.random())
  )
}
