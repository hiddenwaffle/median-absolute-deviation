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
    }
  }
  const element = document.getElementById(elementId)
  const chart = new google.visualization.Histogram(element)
  chart.draw(dataTable, options)
}
