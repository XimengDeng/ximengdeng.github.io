/**
 * CHARTS VIEW - STUDENTS IMPLEMENT
 * Show patterns in your data as charts, using Chart.js
 *
 * This view has two parts:
 *   showCharts(data) returns the HTML: one <canvas> per chart, with a text alternative under each
 *   drawCharts(data) runs after that HTML is on the page, and draws a chart into each <canvas>
 *
 * Chart.js docs: https://www.chartjs.org/docs/latest/getting-started/
 */


function orNotListed(value) {
  return value === '------' || value === 'N/A' || value === undefined ? 'Not listed' : value;
}


function countBy(data, field) {
  const counts = {};
  data.forEach((item) => {
    counts[orNotListed(item[field])] = (counts[orNotListed(item[field])] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}


function showCharts(data) {
  // TODO: Replace each TODO sentence below with text that says what that chart shows.
  // Charts are drawn as pictures, so screen readers can't read them.

  const topType = countBy(data, 'category')[0];
  const topResult = countBy(data, 'inspection_results')[0];

  /*html*/
  return `
    <h2 class="view-title">📈 Charts View</h2>
    <p class="view-description">Which types of business were inspected most, and what are the inspection results?</p>
    <div class="charts-grid">
      <figure class="chart-figure">
        <canvas id="chart-one"></canvas>
        <figcaption class="chart-summary">"${topType[0]}" had the most inspections: ${topType[1]} of ${data.length} in this dataset.</figcaption>
      </figure>
      <figure class="chart-figure">
        <canvas id="chart-two"></canvas>
        <figcaption class="chart-summary">The most common result was "${topResult[0]}": ${topResult[1]} of ${data.length} inspections.</figcaption>
      </figure>
    </div>
  `;
}


function drawCharts(data) {
  // Chart.js is loaded by a <script> tag in index.html. If it didn't load, say so instead of breaking.
  if (typeof Chart === 'undefined') {
    document.querySelector('.charts-grid').innerHTML =
      '<p class="error">Chart.js did not load, so the charts can\'t be drawn. Check the &lt;script&gt; tag in index.html.</p>';
    return;
  }


  // TODO 2
  const types = countBy(data, 'category');
  new Chart(document.querySelector('#chart-one'), {
    type: 'bar',
    data: {
      labels: types.map((t) => t[0]),
      datasets: [{ label: 'Number of inspections', data: types.map((t) => t[1]) }],
    },
    options: {
      plugins: { title: { display: true, text: 'Inspections by type of business' } },
      scales: {
        x: { title: { display: true, text: 'Type of business' } },
        y: { title: { display: true, text: 'Inspections' }, beginAtZero: true },
      },
    },
  });

  // Chart 2
  const results = countBy(data, 'inspection_results');
  new Chart(document.querySelector('#chart-two'), {
    type: 'pie',
    data: {
      labels: results.map((r) => r[0]),
      datasets: [{ label: 'Number of inspections', data: results.map((r) => r[1]) }],
    },
    options: {
      plugins: { title: { display: true, text: 'Frequency of inspection results' } },
    },
  });
}

export { showCharts, drawCharts };