import { drawChart } from './src/chart'
import { showPopulationChartSection, getParameter, resetPage, writeStats, enableStartButton, showComparisonSections } from './src/dom'
import { calculateStats, compareStats, getSample, randLeftSkewArray as randLeftSkewedArray, randSymmetricArray, randUniformArray } from './src/math'
import './style.css'

// Wait for Google Charts to load before allowing user to begin the simulation
google.charts.load('current', { packages: ['corechart'] })
google.charts.setOnLoadCallback(() => {
  resetPage()
  // TODO: Remove this (autorunner with default values)
  setTimeout(() => {
    document.getElementById('start-button').click()
  }, 1)
})

// Handle when the user clicks the start button
document.getElementById('parameters-form').addEventListener('submit', (event) => {
  event.preventDefault()
  // Reset the page in case the user had already started a simulation
  resetPage()
  setTimeout(() => start(), 33) // 33 is arbitrary
})

/**
 * Main orchestration here
 */
function start() {
  enableStartButton(false)
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
  const populationUniformStats = calculateStats(uniformArray, true)
  const populationSymmetricStats = calculateStats(symmetricArray, true)
  const populationSkewedStats = calculateStats(skewedArray, true)
  writeStats('population-uniform-stats', populationUniformStats)
  writeStats('population-symmetric-stats', populationSymmetricStats)
  writeStats('population-skewed-stats', populationSkewedStats)
  showPopulationChartSection()
  setTimeout(() => {
    // TODO: Loop such that 10 times a second, drawChart a sample for each distribution.
    // TODO: To do this, loop calculating samples until 100ms pass, then requestAnimationFrame.
    // TODO: Do this until there are sampleSize samples.
    const uniformSamplesStats = []
    const symmetricSamplesStats = []
    const skewedSamplesStats = []
    for (let i = 0; i < sampleCount; i++) {
      const uniformSampleStats = calculateStats(getSample(uniformArray, sampleSize))
      uniformSamplesStats.push(uniformSampleStats)
      const symmetricSampleStats = calculateStats(getSample(symmetricArray, sampleSize))
      symmetricSamplesStats.push(symmetricSampleStats)
      const skewedSampleStats = calculateStats(getSample(skewedArray, sampleSize))
      skewedSamplesStats.push(skewedSampleStats)
    }
    // Compare the sample stats to the population stats
    const uniformComparison = compareStats(populationUniformStats, uniformSamplesStats)
    const symmetricComparison = compareStats(populationSymmetricStats, symmetricSamplesStats)
    const skewedComparison = compareStats(populationSkewedStats, skewedSamplesStats)
    // Standard Deviation % Difference
    writeStats('stddev-uniform-stats', uniformComparison.stddevPercentDiffStats)
    writeStats('stddev-symmetric-stats', symmetricComparison.stddevPercentDiffStats)
    writeStats('stddev-skewed-stats', skewedComparison.stddevPercentDiffStats)
    // Median Absolute Deviation #1 % Difference
    writeStats('mad1-uniform-stats', uniformComparison.mad1PercentDiffStats)
    writeStats('mad1-symmetric-stats', symmetricComparison.mad1PercentDiffStats)
    writeStats('mad1-skewed-stats', skewedComparison.mad1PercentDiffStats)
    // Median Absolute Deviation #2 % Difference
    writeStats('mad2-uniform-stats', uniformComparison.mad2PercentDiffStats)
    writeStats('mad2-symmetric-stats', symmetricComparison.mad2PercentDiffStats)
    writeStats('mad2-skewed-stats', skewedComparison.mad2PercentDiffStats)
    // Housekeeping
    showComparisonSections()
    enableStartButton(true)
  }, 33) // 33 is arbitrary
}

// TODO: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
