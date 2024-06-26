import { drawChart, drawComparisonChart } from './src/chart'
import { closeCSV, openCSV, writeArrayToCSV, writeBlankLineToCSV, writeStatsToCSV } from './src/csv-writer'
import { showPopulationChartSection, getParameter, resetPage, writeStats, resetUIElements, showComparisonSections, updateProgressBar, showSamplesProgressBarSection, isChecked } from './src/dom'
import { calculateStats, compareStats, findMinMaxTimes100, getSample, randLeftSkewArray as randLeftSkewedArray, randSymmetricArray, randUniformArray } from './src/math'
import './style.css'

window.onerror = (message, source, lineno, colno, error) => {
  closeCSV()
  alert(
    `Program Error! Please report the following information, and refresh this page to try again:\n`+
    `message: ${message}\n` +
    `source:  ${source}\n` +
    `lineno:  ${lineno}\n` +
    `error:   ${error}\n`
  )
  console.error(message, source, lineno, colno, error)
}

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
  setTimeout(() => startDataGeneration(), 33) // 33 is arbitrary
})

/**
 * Main orchestration here
 */
function startDataGeneration() {
  const csvRequested = isChecked('save-checkbox') // Get this before the form is reset
  resetUIElements(false)
  // Get parameters
  const populationSize = getParameter('population-size')
  const sampleSize = getParameter('sample-size')
  const sampleCount = getParameter('sample-count')
  const outliersCount = getParameter('outliers-count', false)
  const outlierDistance = getParameter('outlier-distance')
  const outlierSpread = getParameter('outlier-spread')
  // Generate populations
  const uniformArray = randUniformArray(populationSize, outliersCount, outlierDistance, outlierSpread)
  const symmetricArray = randSymmetricArray(populationSize, outliersCount, outlierDistance, outlierSpread)
  const skewedArray = randLeftSkewedArray(populationSize, outliersCount, outlierDistance, outlierSpread)
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
  if (csvRequested) {
    openCSV()
    writeArrayToCSV('Uniform Population', uniformArray)
    writeStatsToCSV(populationUniformStats)
    writeBlankLineToCSV()
    writeArrayToCSV('Symmetric Population', symmetricArray)
    writeStatsToCSV(populationSymmetricStats)
    writeBlankLineToCSV()
    writeArrayToCSV('Skewed Population', skewedArray)
    writeStatsToCSV(populationSkewedStats)
    writeBlankLineToCSV()
  }
  showPopulationChartSection()
  showSamplesProgressBarSection()
  setTimeout(() => {
    const uniformSamplesStats = []
    const symmetricSamplesStats = []
    const skewedSamplesStats = []
    function calculateOneSampleSet() {
      const uniformSample = getSample(uniformArray, sampleSize)
      const uniformSampleStats = calculateStats(uniformSample)
      uniformSamplesStats.push(uniformSampleStats)
      if (csvRequested) {
        writeArrayToCSV('Uniform Sample', uniformSample)
        writeStatsToCSV(uniformSampleStats)
        writeBlankLineToCSV()
      }
      const symmetricSample = getSample(symmetricArray, sampleSize)
      const symmetricSampleStats = calculateStats(symmetricSample)
      symmetricSamplesStats.push(symmetricSampleStats)
      if (csvRequested) {
        writeArrayToCSV('Symmetric Sample', symmetricSample)
        writeStatsToCSV(symmetricSampleStats)
        writeBlankLineToCSV()
      }
      const skewedSample = getSample(skewedArray, sampleSize)
      const skewedSampleStats = calculateStats(skewedSample)
      skewedSamplesStats.push(skewedSampleStats)
      if (csvRequested) {
        writeArrayToCSV('Skewed Sample', skewedSample)
        writeStatsToCSV(skewedSampleStats)
        writeBlankLineToCSV()
      }
    }
    // This section creates samples and pauses every few times per
    // second to update the progress bar
    let count = 0
    function calculateAllSampleSets() {
      const startTime = Date.now()
      while (count < sampleCount) {
        count += 1
        calculateOneSampleSet()
        const currentTime = Date.now()
        if (currentTime - startTime > 100) {
          break
        }
      }
      updateProgressBar(count, sampleCount)
      if (count >= sampleCount) {
        updateProgressBar(count, sampleCount, true)
        closeCSV() // No more data to write to the CSV at this point, so close it
        startComparisons(
          populationUniformStats,
          populationSymmetricStats,
          populationSkewedStats,
          uniformSamplesStats,
          symmetricSamplesStats,
          skewedSamplesStats
        )
      } else {
        setTimeout(calculateAllSampleSets, 1)
      }
    }
    calculateAllSampleSets()
  }, 33) // 33 is arbitrary
}

function startComparisons(
  populationUniformStats,
  populationSymmetricStats,
  populationSkewedStats,
  uniformSamplesStats,
  symmetricSamplesStats,
  skewedSamplesStats) {
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
  resetUIElements(true)
}
