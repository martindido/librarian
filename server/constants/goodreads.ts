import { APP_HOST } from './app';
import { SERVER_HOST } from './server';

export const GOODREADS_KEY = '4DgGUgFPJmVjrIPYGaDRWQ';
export const GOODREADS_SECRET = 'ZaSi2UU7w8KVp6yUyl8cJImFrd31Vat1KdDSn3C3uA';

export const GOODREADS_CALLBACK = `${SERVER_HOST}/auth/goodreads/callback`;
export const GOODREADS_REDIRECTION = `${APP_HOST}/`;

export const GOODREADS_OAUTH_VERSION = '1.0';
export const GOODREADS_OAUTH_ENCRYPTION = 'HMAC-SHA1';

export const GOODREADS_HOST = 'https://www.goodreads.com';
export const GOODREADS_URL_REQUEST_TOKEN = `${GOODREADS_HOST}/oauth/request_token`;
export const GOODREADS_URL_ACCESS_TOKEN = `${GOODREADS_HOST}/oauth/access_token`;
export const GOODREADS_URL_GET_AUTH_USER = `${GOODREADS_HOST}/api/auth_user`;
export const GOODREADS_URL_GET_BOOK_BY_ISBN = `${GOODREADS_HOST}/book/isbn/:isbn?key=:key`;
