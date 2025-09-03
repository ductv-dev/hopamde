import cookie from 'js-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

export const setCookie = (name: string, value: string, days?: number) => {
  cookie.set(name, value, { path: '/', expires: days });
};

export const removeCookie = (name: string) => {
  cookie.remove(name);
};

export const getCookie = (name: string) => {
  return cookie.get(name);
};

export const setAccessTokenCookie = (value: string) => {
  setCookie(ACCESS_TOKEN, value);
};

export const getAccessTokenCookie = () => getCookie(ACCESS_TOKEN);

export const sessionStorageSetItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(key, value);
  }
};

export const sessionStorageGetItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.sessionStorage.getItem(key) || '';
  }
  return '';
};

export const localStorageSetItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, value);
  }
};

export const localStorageGetItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key) || '';
  }
  return '';
};

export const setAccessTokenLocalStorage = (value: string) => {
  localStorageSetItem(ACCESS_TOKEN, value);
};

export const getAccessTokenLocalStorage = () =>
  localStorageGetItem(ACCESS_TOKEN);

export const setRefreshTokenLocalStorage = (value: string) => {
  localStorageSetItem(REFRESH_TOKEN, value);
};

export const getRefreshTokenLocalStorage = () =>
  localStorageGetItem(REFRESH_TOKEN);

export const clearAllStorages = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(ACCESS_TOKEN);
    window.localStorage.removeItem(REFRESH_TOKEN);
  }

  removeCookie(ACCESS_TOKEN);
};
