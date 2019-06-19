import Cookies from 'universal-cookie';

export function createCookieStorage(config) {
  const cookies = new Cookies();

  function save(name, value, options = {}) {
    cookies.set(name, value, {...config, ...options});
  }

  function load(name) {
    return cookies.get(name);
  }

  return {
    save,
    load,
  };
}

export function createLocalStorage(toLocalKey) {
  const localStorage = window.localStorage;

  function save(name, value) {
    localStorage.setItem(toLocalKey(name), value);
  }

  function load(name) {
    return localStorage.getItem(toLocalKey(name));
  }

  return {
    save,
    load,
  };
}
