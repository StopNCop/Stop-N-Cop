// Fetch Helpers
const handleFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const { status, statusText, ok } = response;
    if (!ok) return [null, { status, statusText }];

    const content = (status === 204) || await response.json();
    return [content, null];
  } catch (error) {
    return [null, error];
  }
};

const getFetchOptions = (body, method = 'POST') => ({
  method,
  credentials: 'include', // IMPORTANT, this tells fetch to include cookies
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

// CREATE USER
const signupAndLoginHandler = async (url, form) => {
  const formData = new FormData(form);
  const options = getFetchOptions(Object.fromEntries(formData.entries()));
  const [_response, err] = await handleFetch(url, options);
  if (err) {
    form.reset();
    return alert('Something went wrong');
  }
  window.location.assign('/user.html');
};

// READ USER
const fetchLoggedInUser = async () => {
  const [response, _err] = await handleFetch('/api/me', { credentials: 'include' });
  return response;
};

// UPDATE USER
const updateUsernameHandler = async (form) => {
  const formData = new FormData(form);
  const username = formData.get('username');
  if (!username) return alert('Username is required');

  const url = `/users/${form.dataset.userId}`;
  const options = getFetchOptions({ username }, 'PATCH');

  const [response, err] = await handleFetch(url, options);
  return [response, err];
};

// DELETE USER
const logOutHandler = async () => {
  const [_response, err] = await handleFetch('/api/users/logout', { method: 'DELETE' });
  if (err) return alert('Something went wrong');
  window.location.assign('/');
};

// Nav Helper
const setNav = (hasLoggedInUser) => {
  const loggedOutNavHtml = ` <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">STOP N COP</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">HOME</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./create.html">SIGN UP</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./login.html">LOGIN</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;

  const loggedInNavHtml = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">STOP N COP</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">HOME</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./user.html">PROFILE</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./bookmarks.html">BOOOKMARKS</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;

  const navHtml = hasLoggedInUser ? loggedInNavHtml : loggedOutNavHtml;
  document.querySelector('nav').innerHTML = navHtml;
};

// This is wonky. Once you learn about bundlers we won't have to
// explicitly create globals. We just lack the tools right now.
Object.assign(window, {
  handleFetch,
  getFetchOptions,
  fetchLoggedInUser,
  signupAndLoginHandler,
  setNav,
  logOutHandler,
  updateUsernameHandler,
});

export {
  handleFetch,
  getFetchOptions,
  fetchLoggedInUser,
  signupAndLoginHandler,
  setNav,
  logOutHandler,
  updateUsernameHandler,
};
