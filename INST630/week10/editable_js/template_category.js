/**
 * CATEGORY VIEW
 */

function orNotListed(value) {
  return value === "------" || value === "N/A" || value === undefined
    ? "Not listed"
    : value;
}

function countViolations(inspection) {
  return Object.values(inspection).filter((v) => v === "Out of Compliance")
    .length;
}

function showCategories(data) {
  const groups = {};
  data.forEach((item) => {
    if (!groups[orNotListed(item.category)])
      groups[orNotListed(item.category)] = [];
    groups[orNotListed(item.category)].push(item);
  });

  const sections = Object.entries(groups)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([category, items]) => {
      const list = items
        .map((item) => `
          <li class="category-item">
            <span>${item.name}</span>
            <span>Result: ${orNotListed(item.inspection_results)}</span>
            <span>Checks: ${countViolations(item) === 0 ? 'All In Compliance' : `${countViolations(item)} Out of Compliance`}</span>
          </li>
        `)
        .join('');

      return `
        <section class="category-section">
          <h3 class="category-header">${category}: ${items.length} inspections, ${items.filter((item) => countViolations(item) === 0).length} all In Compliance</h3>
          <ul class="category-items">${list}</ul>
        </section>
      `;
    })
    .join('');

  /*html*/
  return `
    <h2 class="view-title">📂 Category View</h2>
    <p class="view-description">Inspections grouped by type of business. "Result" is the inspector's overall finding; "Checks" counts the 15 key checks.</p>
    ${sections}
  `;
}

export default showCategories;
