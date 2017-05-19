const helpTable = `
<style>
.selected {
  background: #ff660080;
}
#hackernews-enhancement-help {
  background: #777;
  color: white;
  float: right;
  position: fixed;
  top: 15px;
  right: 15px;
  border-spacing: 10px;
  border-collapse: separate;
  width: 300px;
  display: none;
}
#hackernews-enhancement-help th {
  text-align: left;
  font-weight: bold;
  vertical-align: top;
}
#hackernews-enhancement-help th:first-of-type {
  text-align: right;
}
#hackernews-enhancement-help td {
  text-align: left;
  vertical-align: top;
  color: white;
}
#hackernews-enhancement-help td:first-of-type {
  font-family: "Courier New";
  font-weight: bold;
  color: #ff6600;
  font-size: 120%;
  text-align: right;
}
</style>
<table id='hackernews-enhancement-help'>
  <tr>
    <th>Key</th>
    <th>Function</th>
  </tr>
  <tr>
    <td>?</td>
    <td>Show this help message</td>
  </tr>
  <tr>
    <td>c</td>
    <td>Open the comments for the currently selected story in a background tab</td>
  </tr>
  <tr>
    <td>j</td>
    <td>Select the next story</td>
  </tr>
  <tr>
    <td>k</td>
    <td>Select the previous story</td>
  </tr>
  <tr>
    <td>&lt;Enter&gt;</td>
    <td>Open the currently selected story in a background tab</td>
  </tr>
</table>
`;

let things = null;
let cur = -1;

function isScrolledIntoView(el) {
  const { top, bottom } = el.getBoundingClientRect();
  return (top >= 0) && (bottom <= window.innerHeight);
}

function clear() {
  const selected = document.getElementsByClassName('selected');
  // iterate backwards since the list changes as we go.
  for (let sel=selected.length-1; sel>=0; sel--) {
    selected[sel].classList.remove('selected');
  }
}

function setNum(num) {
  clear();
  cur = num;
  const curt = things[cur];
  curt.classList.add('selected');
  if (!isScrolledIntoView(curt)) {
    curt.scrollIntoView(false);
  }
  if (!isScrolledIntoView(curt.nextElementSibling.nextElementSibling)) {
    curt.nextElementSibling.nextElementSibling.scrollIntoView(false);
  }
}

function setNumWrap(num) {
  return () => setNum(num);
}

function selectFirst() {
  things = document.getElementsByClassName('athing');
  Array.from(things).forEach((thing, num) => {
    thing.addEventListener('click', setNumWrap(num));
    thing.nextElementSibling.addEventListener('click', setNumWrap(num));
  });
  setNum(0);
  if (!document.getElementById('hackernews-enhancement-help')) {
    const div = document.createElement('div');
    div.innerHTML = helpTable;
    document.body.appendChild(div);
  }
}

function selectNext() {
  if (cur < things.length - 1) {
    setNum(cur+1);
  } else {
    const more = document.querySelector('.morelink');
    more.classList.add('selected');
    more.click();
  }
}

function selectPrev() {
  const num = (cur <= 0) ? cur : cur - 1;
  setNum(num);
}

function openUrl(url) {
  return browser.runtime.sendMessage(url);
}

document.addEventListener('keypress', (e) => {
  switch (e.key) {
    case 'c':
      openUrl(things[cur].nextElementSibling.querySelectorAll('a')[3].href);
      break;
    case 'j':
      selectNext();
      break;
    case 'k':
      selectPrev();
      break;
    case '?':
    case '/':
      const tab = document.getElementById('hackernews-enhancement-help');
      tab.style.display = (tab.style.display === 'none') ? 'block' : 'none';
      break;
    case 'Enter':
      openUrl(things[cur].querySelector(".storylink").href);
      break;
    // default:
    //   console.log('KEY', e);
    //   break;
  }
});

selectFirst();
