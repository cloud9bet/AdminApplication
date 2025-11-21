import { expect, beforeEach } from "vitest";

beforeEach(() => {
  const store = {};

  global.sessionStorage = {
    getItem: (key) => store[key],
    setItem: (key, value) => store[key] = value,
    removeItem: (key) => delete store[key],
    clear: () => {
      for (const key in store) delete store[key];
    }
  };
});
