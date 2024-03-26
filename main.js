import { drawChart } from './src/chart'
import { showPopulationChartSection, getParameter, resetPage, writeStats } from './src/dom'
import { calculateStats, randLeftSkewArray as randLeftSkewedArray, randSymmetricArray, randUniformArray } from './src/math'
import './style.css'

// Wait for Google Charts to load before allowing user to begin the simulation
google.charts.load('current', { packages: ['corechart'] })
google.charts.setOnLoadCallback(() => resetPage())

// Main orchestration here
document.getElementById('parameters-form').addEventListener('submit', (event) => {
  event.preventDefault()
  // Reset the page in case the user had already started a simulation
  resetPage()
  setTimeout(() => {
    // Get parameters
    const populationSize = getParameter('population-size')
    const sampleSize = getParameter('sample-size')
    const sampleCount = getParameter('sample-count')
    const outliersCount = getParameter('outliers-count', false)
    // Generate populations
    const uniformArray = randUniformArray(populationSize, outliersCount)
    const symmetricArray = randSymmetricArray(populationSize, outliersCount)
    const skewedArray = randLeftSkewedArray(populationSize, outliersCount)
    // Draw population histograms
    drawChart('Uniform population', 'popchart-uniform', uniformArray)
    drawChart('Symmetric population', 'popchart-symmetric', symmetricArray)
    drawChart('Skewed population', 'popchart-skewed', skewedArray)
    writeStats('population-uniform-stats', calculateStats(uniformArray, true))
    writeStats('population-symmetric-stats', calculateStats(symmetricArray, true))
    writeStats('population-skewed-stats', calculateStats(skewedArray, true))
    showPopulationChartSection()
  }, 33) // 33 is arbitrary
})
