import './style.css'
import Statistics from 'statistics.js'

document.querySelector('#app').innerHTML = `
  <div>Hello World</div>
  <div id="chart_div"></div>
`;
var data = [
	{ ID: 1, age: 33 },
	{ ID: 2, age: 42 },
	{ ID: 3, age: 27 }
];

var columns = {
	ID: 'ordinal',
	age: 'interval'
};

var settings = { };

var stats = new Statistics(data, columns, settings);

var meanAge = stats.arithmeticMean("age");
var stdDevAge = stats.standardDeviation("age");

console.log('test', meanAge, stdDevAge);

// Charts Test
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['Mushrooms', 3],
    ['Onions', 1],
    ['Olives', 1],
    ['Zucchini', 1],
    ['Pepperoni', 2]
  ]);
  var options = {'title':'How Much Pizza I Ate Last Night',
                 'width':400,
                 'height':300};
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
