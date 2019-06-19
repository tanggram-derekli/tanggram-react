const localStorage = window.localStorage;

function toKey(name) {
  return `__state__${name}`;
}

export function saveState(name, value) {
  localStorage.setItem(toKey(name), JSON.stringify(value));
}

export function loadState(name) {
  const serializedState = localStorage.getItem(toKey(name));
  if (serializedState) {
    return JSON.parse(serializedState);
  }
  return null;
}

export function loadStateStore(states = []) {
  let store = {};
  states.forEach((name) => {
    const state = loadState(name);
    if (state) {
      store[name] = state;
    }
  });
  return store;
}
