
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
function orNotListed(value) {
  return value === '------' || value === 'N/A' || value === undefined ? 'Not listed' : value;
}


function buildRows(data) {
  return data
    .map((inspection) => `
      <tr>
        <th scope="row">${inspection.name}</th>
        <td>${orNotListed(inspection.category)}</td>
        <td>${inspection.address_line_1}, ${inspection.city}</td>
        <td>${formatDate(inspection.inspection_date)}</td>
        <td>${orNotListed(inspection.inspection_results)}</td>
      </tr>
    `)
    .join('');
}

let tableData = [];


function showTable(data) {
  tableData = data;
  // TODO: Students implement this function
  // Requirements:
  // - Use a real HTML <table>, with <th> header cells and a <caption> saying what the table shows
  // - Include the 4-6 most useful fields
  // - Show "Not listed" instead of undefined when a value is missing
  // - Optional: add sorting
  /*html*/ 


return `
    <h2 class="view-title">📊 Table View</h2>
    <p class="view-description">
      Scan inspections: where each business is, what the inspector found.
    </p>
    <div class="table-wrap">
    <table class="restaurant-table">
      <caption>${data.length} food safety inspections in Prince George's County, newest inspection date first. Use the Business Name button to sort by name.
      </caption>
      <thead>
        <tr>
          <th scope="col"><button data-sort="name">Business Name <span aria-hidden="true">♢</span></button></th>
          <th scope="col">Type</th>
          <th scope="col">Address</th>
          <th scope="col">Inspection Date</th>
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody id="table-body">${buildRows(data)}</tbody>
    </table>
    </div>
  `;



  return `
                <h2 class="view-title">📊 Table View</h2>
                <div class="todo-implementation">
                    <h3>TODO: Implement Table View</h3>
                    <p><strong>Your task:</strong> Display the data as a real HTML table, with header cells and a caption</p>
                    <p><strong>Good for:</strong> Scanning specific data points, comparing values, finding specific information</p>
                    <p><strong>Consider:</strong> Which columns are most important? How can you make scanning easy?</p>
                    <p><strong>Data available:</strong> ${data.length} items loaded</p>
                </div>
            `;
}
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-sort="name"]');
  if (!button) return;

  const th = button.parentElement;
  const direction = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';

  const sorted = [...tableData].sort((a, b) => a.name.localeCompare(b.name));
  if (direction === 'descending') sorted.reverse();

  th.setAttribute('aria-sort', direction);
  button.querySelector('span').textContent = direction === 'ascending' ? '▲' : '▼';
  document.querySelector('#table-body').innerHTML = buildRows(sorted);
});
export default showTable;