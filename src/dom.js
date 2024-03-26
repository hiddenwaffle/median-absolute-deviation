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
    'population-chart-section'
  ].forEach((elementId) => {
    el(elementId).style.display = 'none'
  })
  // TODO: Clear any timers
}

export function showPopulationChartSection() {
  el('population-chart-section').style.display = 'flex'
}