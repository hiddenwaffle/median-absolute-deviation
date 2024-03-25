import './style.css'

document.querySelector('#app').innerHTML = `
  <div>Hello World</div>
  <div id="chart_div"></div>
`

const POPULATION_SIZE = 10_000

/**
 * Returns a sorted array of random numbers for the given randomizer
 */
function doIt(rFunc) {
  const arr = []
  for (let n = 0; n < POPULATION_SIZE; n++) {
    arr.push(Math.floor(rFunc() * POPULATION_SIZE))
  }
  // for (let n = 0; n < 10_000; n++) { arr.push(POPULATION_SIZE * 2) } // injects some outliers (TODO: ensure commented)
  return arr.sort((a, b) => a - b)
}

/**
 * Based on https://gist.github.com/greim/4589675 with
 * visualizations at https://old.reddit.com/r/javascript/comments/170hm0/fun_with_mathrandom_and_probability_distributions/
 */
const arr = doIt(function(){
  // Uniform
  // return Math.random()
  // Symmetric
	// return (Math.random() + Math.random() + Math.random() + Math.random()) / 4
  // Left skew
  return Math.max(Math.random(), Math.random(), Math.random(), Math.random())
});

function drawChart() {
  const dataTable = new google.visualization.DataTable()
  dataTable.addColumn('number', 'Count')
  for (let value of arr) {
    dataTable.addRow([value])
  }
  const options = {
    'title': 'asdf',
    'width': 800,
    'height': 600
  }
  const chart = new google.visualization.Histogram(document.getElementById('chart_div'));
  chart.draw(dataTable, options);
}

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

const population_median = (arr[POPULATION_SIZE / 2 - 1] + arr[POPULATION_SIZE / 2]) / 2
const population_mean = arr.reduce((acc, n) => acc + n, 0) / POPULATION_SIZE
console.log('median:', population_median, 'mean:', population_mean)
