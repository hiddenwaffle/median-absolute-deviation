import { POPULATION_SIZE } from './src/constants'
import { randLeftSkewArray } from './src/math'
import './style.css'

// document.querySelector('#app').innerHTML = `
//   <div>MATH-M 368 - Median Absolute Deviation - Simulator</div>
//   <div id="chart_div"></div>
// `

// const arr = randLeftSkewArray(POPULATION_SIZE);

// function drawChart() {
//   const dataTable = new google.visualization.DataTable()
//   dataTable.addColumn('number', 'Count')
//   for (let value of arr) {
//     dataTable.addRow([value])
//   }
//   const options = {
//     title: 'asdf',
//     width: 420,
//     height: 320,
//     legend: {
//       'position': 'none'
//     }
//   }
//   const chart = new google.visualization.Histogram(document.getElementById('chart_div'))
//   chart.draw(dataTable, options)
// }

// google.charts.load('current', { packages: ['corechart'] })
// google.charts.setOnLoadCallback(drawChart)

// const population_median = (arr[POPULATION_SIZE / 2 - 1] + arr[POPULATION_SIZE / 2]) / 2
// const population_mean = arr.reduce((acc, n) => acc + n, 0) / POPULATION_SIZE
// console.log('median:', population_median, 'mean:', population_mean)
