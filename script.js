async function fetchXML() {
  const response = await fetch('./data.xml');
  const data = await response.text();
  return new DOMParser().parseFromString(data, 'text/html');
}

function handleResponse(xmlDoc) {
  const records = Array.from(xmlDoc.querySelectorAll('record'));
  records.length = 40;

  const parsedRecords = records.map((record) => {
    return Array.from(record.childNodes).reduce(
      (acc, node) => Object.assign(acc, { [node.localName]: node.textContent }),
      {}
    );
  });
  console.log(parsedRecords);

  render(parsedRecords);
}

fetchXML().then(handleResponse);

function render(list) {
  const $root = document.querySelector('.users-list');
  const fragment = document.createDocumentFragment();
  list.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.first_name} ${item.last_name} | <a href="mailto:${item.email}">${item.email}<a/>`;
    fragment.appendChild(li);
  });
  $root.appendChild(fragment);
}
