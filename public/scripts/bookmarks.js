/* eslint-disable import/extensions */
import {
    fetchLoggedInUser,
    signupAndLoginHandler,
    setNav,
    handleFetch,
  } from './global.js';

const bookmarkContainer = document.querySelector('#bookmark-container');

const displayListing = (req) => {
  const divElement = document.createElement('div');
  const name = document.createElement('p');
  const link = document.createElement('img');
  const price = document.createElement('p');
  const city = document.createElement('p');
  const deleteButton = document.createElement('button');


  name.innerText = req.name;
  link.src = req.link || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCDIQR868dceA4mJKLxbS7-QIgaf3ppjc46cPF8KUkhQ&s;'
  link.width = 300;
  price.innerText = req.price;
  city.innerText = req.city;
  divElement.append(name, link, price, city);
//   const postId = req.id;
//   divElement.setAttribute('data-listing-id', postId);
  deleteButton.setAttribute('class', 'deleteButton')

  deleteButton.innerText = 'remove'
  divElement.append(deleteButton);
  bookmarkContainer.append(divElement);
}
  
  const main = async () => {
    const user = await fetchLoggedInUser();  
    setNav(!!user);

    const [bookmarks, _err] = await handleFetch('/api/bookmarks', {method: "GET"});
    bookmarks.forEach(bookmark => displayListing(bookmark));
    console.log(bookmarks);

};

  main();