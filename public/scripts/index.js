/* eslint-disable import/extensions */
import {
  fetchLoggedInUser,
  getFetchOptions,
  handleFetch,
  setNav,
} from './global.js';

const listingContainer = document.querySelector('#listing-container');

const displayListing = (req) => {
  const divElement = document.createElement('div');
  const name = document.createElement('p');
  const link = document.createElement('img');
  const price = document.createElement('p');
  const city = document.createElement('p');
  name.innerText = req.name;
  link.src = req.link;
  price.innerText = req.price;
  city.innerText = req.city;
  divElement.append(name, link, price, city);
  const postId = req.id;
  divElement.setAttribute('data-listing-id', postId);
  listingContainer.append(divElement);
}

const main = async () => {
  const user = await fetchLoggedInUser();
  setNav(!!user);

  const [secret, _err] = await handleFetch('/api/logged-in-secret');
  console.log('secret, _err:', secret, _err);
  if (secret) {
    document.querySelector('#secret-message').textContent = secret.msg;
  }

  const formElement = document.querySelector('form');

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const city = document.querySelector('#city').value;
    const price = document.querySelector('#price').value;
    const link = document.querySelector('#link').value;
    console.log(name, city, price, link)

    const options = getFetchOptions({ name, city, price, link});
    const [res, _err] = await handleFetch('/api/users/listing', options);
    console.log(res)
    displayListing(res);

  });
};

main();
