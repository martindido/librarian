export const SERVER_PORT = Number(process.env.PORT) || 5000;
export const SERVER_HOST =
    (process.env.HOST || 'http://www.librarian.world') + (SERVER_PORT !== 80 ? `:${SERVER_PORT}` : '');
export const SERVER_STATIC_PATH = '/public';
