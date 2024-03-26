import { drawChart } from './src/chart'
import { displayPopulationHistograms, getParameter, resetPage } from './src/dom'
import { randLeftSkewArray as randLeftSkewedArray, randSymmetricArray, randUniformArray } from './src/math'
import './style.css'

// Wait for Google Charts to load before allowing user to begin the simulation
google.charts.load('current', { packages: ['corechart'] })
google.charts.setOnLoadCallback(() => resetPage())

// Main orchestration here
document.getElementById('parameters-form').addEventListener('submit', (event) => {
  event.preventDefault()
  // Reset the page in case the user had already started a simulation
  resetPage()
  // Get parameters
  const populationSize = getParameter('population-size')
  const sampleSize = getParameter('sample-size')
  const sampleCount = getParameter('sample-count')
  const outliersCount = getParameter('outliers-count', false)
  // Generate populations
  const uniformArray = randUniformArray(populationSize)
  const symmetricArray = randSymmetricArray(populationSize)
  const skewedArray = randLeftSkewedArray(populationSize)
  // Draw population histograms
  drawChart('Uniform population', 'popchart-uniform', uniformArray)
  drawChart('Symmetric population', 'popchart-symmetric', symmetricArray)
  drawChart('Skewed population', 'popchart-skewed', skewedArray)
  displayPopulationHistograms()
})
