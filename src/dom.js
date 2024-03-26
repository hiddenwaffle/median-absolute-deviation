function el(elementId) {
  return document.getElementById(elementId)
}

export function getParameter(elementId, nonZero = true) {
  const element = el(elementId)
  const str = element.value
  if (str.trim().length === 0) {
    alert('Parameters must be numbers')
    throw 'abort'
  }
  let result = Math.floor(Math.abs(parseInt(str)))
  if (isNaN(result) || result < 0) {
    result = 0
  }
  if (nonZero && result === 0) {
    alert(`Invalid value: ${str}`)
    throw 'abort'
  }
  element.value = result
  return result
}

export function resetPage() {
  // Show the start button
  el('start-button').style.display = 'block'
  // Hide all of the sections
  ;[
    // See showPopulationChartSection(), showComparisonSections(), etc
    'population-chart-section',
    'mean-section',
    'sd-section',
    'median-section',
    'mad1-section',
    'mad2-section'
  ].forEach((elementId) => {
    el(elementId).style.display = 'none'
  })
  // TODO: Clear any timers
}

/**
 * Reset in resetPage()
 */
export function showPopulationChartSection() {
  el('population-chart-section').style.display = 'flex'
}

/**
 * Reset in resetPage()
 */
export function showComparisonSections() {
  el('mean-section').style.display = 'flex'
  el('sd-section').style.display = 'flex'
  el('median-section').style.display = 'flex'
  el('mad1-section').style.display = 'flex'
  el('mad2-section').style.display = 'flex'
}

export function enableStartButton(enabled) {
  if (enabled) {
    el('start-button').disabled = ''
  } else {
    el('start-button').disabled = 'disabled'
  }
}

export function writeStats(elementId, stats) {
  el(elementId).value =
    `Mean     ${stats.mean.toFixed(2)}\n` +
    `SD       ${stats.stddev.toFixed(2)}\n` +
    `\n` +
    `Median   ${stats.median.toFixed(2)}\n` +
    `MAD1     ${stats.mad1.toFixed(2)}\n` +
    `MAD2     ${stats.mad2.toFixed(2)}`
}
