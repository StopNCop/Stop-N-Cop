/* eslint-disable import/extensions */
import {
    fetchLoggedInUser,
    signupAndLoginHandler,
    setNav,
  } from './global.js';

  
  const main = async () => {
    const user = await fetchLoggedInUser();  
    setNav(!!user);
};

  main();