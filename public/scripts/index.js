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
  // const name = document.createElement('p');
  // const link = document.createElement('img');
  // const price = document.createElement('p');
  // const city = document.createElement('p');
  // const username = document.createElement('p');
  // const email = document.createElement('p');



  let images = req.link || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCDIQR868dceA4mJKLxbS7-QIgaf3ppjc46cPF8KUkhQ&s;'
  let names = req.name;
  let prices = req.price;
  let citys = req.city;
  let postId = req.id;
  let username = req.username;
  let email = req.email;
  divElement.class = 'col';

   divElement.innerHTML = `<div class="card" data-listing-id = ${postId} style="width: 18rem;">
  <img src=${images} class="card-img-top border-bottom border-dark h-25" alt="...">
  <div class="card-body bg-body-secondary">
    <h5 class="card-title">${names}</h5>
    <p class="card-text">$${prices}</p>
    <p class="card-text">${citys}</p>
    <p class="card-text">Created By: ${username}</p>
    <p class="card-text">Contact: ${email}</p>
  </div>
  <a href="#" class="btn btn-primary addBookmark bg-success">Add To Bookmark</a>
</div>`

  listingContainer.append(divElement);
}

const main = async () => {
  const user = await fetchLoggedInUser();
  setNav(!!user);

  const [listings, _err] = await handleFetch('/api/posts');
  listings.forEach(listing => displayListing(listing));

  const formElement = document.querySelector('form');
  const addToBookmark = document.querySelectorAll('.addBookmark');

  addToBookmark.forEach(button => button.addEventListener('click', async (e) =>{
    e.preventDefault();
    const postContainer = e.target.parentNode;
    const postId = postContainer.getAttribute('data-listing-id');
    const options = getFetchOptions({postId});
    console.log(options)
    const [res, _err] = await handleFetch('/api/bookmarks', options);
    console.log(res)
  }))

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const city = document.querySelector('#city').value;
    const price = document.querySelector('#price').value;
    const link = document.querySelector('#link').value;
    
    console.log(name, city, price, link)

    const options = getFetchOptions({ name, city, price, link});
    const [res, _err] = await handleFetch('/api/posts', options);
    console.log(res)
    displayListing(res);

  });


};

main();
