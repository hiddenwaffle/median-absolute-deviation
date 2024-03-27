export function drawChart(title, elementId, arr) {
  const dataTable = new google.visualization.DataTable()
  dataTable.addColumn('number', 'Count')
  for (let value of arr) {
    dataTable.addRow([value])
  }
  const options = {
    title,
    width: 420,
    height: 320,
    legend: {
      'position': 'none'
    },
    hAxis: {
      showTextEvery: Math.floor(10)
    }
  }
  const element = document.getElementById(elementId)
  const chart = new google.visualization.Histogram(element)
  chart.draw(dataTable, options)
}

export function drawComparisonChart(title, elementId, uniformStats, symmetricStats, skewedStats, min, max) {
  var data = google.visualization.arrayToDataTable([
    ['Distribution', 'Avg Mean Difference %', 'Avg Std Dev Difference %'],
    ['Uniform', uniformStats.mean * 100, uniformStats.stddev * 100],
    ['Symmetric', symmetricStats.mean * 100, symmetricStats.stddev * 100],
    ['Skewed', skewedStats.mean * 100, skewedStats.stddev * 100]
  ]);
  var options = {
    chart: {
      title,
      subtitle: 'Lower is better'
    },
    bars: 'horizontal', // Required for Material Bar Charts.
    hAxis: {
      format: 'decimal',
      viewWindow: {
        min,
        max
      }
    },
    width: 1280,
    height: 400,
    colors: ['#89138a', '#e6bb18']
  };
  var chart = new google.charts.Bar(document.getElementById(elementId));
  chart.draw(data, google.charts.Bar.convertOptions(options));
}
