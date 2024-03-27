function el(elementId) {
  return document.getElementById(elementId)
}

export function getParameter(elementId, nonZero = true) {
  const element = el(elementId)
  const str = element.value
  let result = Math.floor(Math.abs(parseInt(str)))
  if (isNaN(result) || result < 0) {
    result = 0
  }
  if (nonZero && result === 0) {
    result = 1
  }
  element.value = result
  return result
}

export function resetPage() {
  // Show the start button
  el('start-button').style.display = 'block'
  // TODO: Clear the textareas?
  // Hide all of the sections
  ;[
    // See showPopulationChartSection(), showComparisonSections(), etc
    'population-chart-section',
    'comparison-section'
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

export function updateProgressBar(current, total, complete=false) {
  console.log('here:', current, '/', total)
  if (complete) { console.log('complete') }
}

/**
 * Reset in resetPage()
 */
export function showComparisonSections() {
  el('comparison-section').style.display = 'block'
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
