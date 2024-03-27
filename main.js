import { drawChart, drawComparisonChart } from './src/chart'
import { showPopulationChartSection, getParameter, resetPage, writeStats, enableStartButton, showComparisonSections } from './src/dom'
import { calculateStats, compareStats, findMinMaxTimes100, getSample, randLeftSkewArray as randLeftSkewedArray, randSymmetricArray, randUniformArray } from './src/math'
import './style.css'

// Wait for Google Charts to load before allowing user to begin the simulation
google.charts.load('current', { packages: ['corechart', 'bar'] })
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
  drawChart('Uniform Population', 'popchart-uniform', uniformArray)
  drawChart('Symmetric Population', 'popchart-symmetric', symmetricArray)
  drawChart('Skewed Population', 'popchart-skewed', skewedArray)
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
      const uniformSample = getSample(uniformArray, sampleSize)
      const uniformSampleStats = calculateStats(uniformSample)
      uniformSamplesStats.push(uniformSampleStats)
      const symmetricSample = getSample(symmetricArray, sampleSize)
      const symmetricSampleStats = calculateStats(symmetricSample)
      symmetricSamplesStats.push(symmetricSampleStats)
      const skewedSample = getSample(skewedArray, sampleSize)
      const skewedSampleStats = calculateStats(skewedSample)
      skewedSamplesStats.push(skewedSampleStats)
    }
    // Compare the sample stats to the population stats
    const uniformComparison = compareStats(populationUniformStats, uniformSamplesStats)
    const symmetricComparison = compareStats(populationSymmetricStats, symmetricSamplesStats)
    const skewedComparison = compareStats(populationSkewedStats, skewedSamplesStats)
    // Hacky way to get chart bounds
    const [min, max] = findMinMaxTimes100(uniformComparison, symmetricComparison, skewedComparison)
    // Standard Deviation % Difference
    drawComparisonChart(
      'Standard Deviation Percent Difference',
      'stddev-comparison-chart',
      uniformComparison.stddevPercentDiffStats,
      symmetricComparison.stddevPercentDiffStats,
      skewedComparison.stddevPercentDiffStats,
      min,
      max
    )
    drawComparisonChart(
      'Median Absolute Deviation #1 Percent Difference',
      'mad1-comparison-chart',
      uniformComparison.mad1PercentDiffStats,
      symmetricComparison.mad1PercentDiffStats,
      skewedComparison.mad1PercentDiffStats,
      min,
      max
    )
    drawComparisonChart(
      'Median Absolute Deviation #2 Percent Difference',
      'mad2-comparison-chart',
      uniformComparison.mad2PercentDiffStats,
      symmetricComparison.mad2PercentDiffStats,
      skewedComparison.mad2PercentDiffStats,
      min,
      max
    )
    // Housekeeping
    showComparisonSections()
    enableStartButton(true)
  }, 33) // 33 is arbitrary
}
