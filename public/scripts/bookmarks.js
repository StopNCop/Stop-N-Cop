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
  
  let images = req.link || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCDIQR868dceA4mJKLxbS7-QIgaf3ppjc46cPF8KUkhQ&s;'
  
  let names = req.name;
  link.width = 300;
  let prices = req.price;
  let citys = req.city;
  const postId = req.id;
  divElement.class = 'col';

  
  divElement.innerHTML = `<div class="card" data-listing-id = ${postId} style="width: 18rem;">
  <img src=${images} class="card-img-top" alt="...">
  <div class="card-body bg-body-secondary">
    <h5 class="card-title">${names}</h5>
    <p class="card-text">$${prices}</p>
    <p class="card-text">${citys}</p>
  </div>
  <a href="#" class="btn btn-primary deleteButton bg-danger">Delete</a>
</div>`

  bookmarkContainer.append(divElement);
}
  
  const main = async () => {
    const user = await fetchLoggedInUser();  
    setNav(!!user);

    const [bookmarks, _err] = await handleFetch('/api/bookmarks', {method: "GET"});
    bookmarks.forEach(bookmark => displayListing(bookmark));
    // const [deletedBookmark, error] = await handleFetch('/api/bookmarks/:id', {method: 'DELETE'});

    const deleteButton = document.querySelectorAll('.deleteButton');

    deleteButton.forEach(deleted => deleted.addEventListener('click', async (e) => {
      const postContainer = e.target.parentNode;
      postContainer.style.display = "none";
      const postId = postContainer.getAttribute('data-listing-id');
      const options = getFetchOptions({postId}, "DELETE");
      console.log(options)
      const [res, _err] = await handleFetch('/api/bookmarks/delete', options);

    }))


};

  main();