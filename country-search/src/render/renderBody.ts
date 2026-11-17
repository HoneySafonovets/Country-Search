export function renderody() {
  document.body.classList.add('body');

  // 
  const container = document.createElement('main');
  const title = document.createElement('h1');
  const btn = document.createElement('div');
  const input = document.createElement('input');

  // Add classes
  container.classList.add('container');
  btn.classList.add('main__btn');
  input.classList.add('main__input');
  title.classList.add('main__title');

  // Content
  input.type = 'search';
  btn.innerText = 'Search';
  title.innerText = 'Country-search';

  // Add to page
  document.body.append(container);
  container.append(input, btn);
}