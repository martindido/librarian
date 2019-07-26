export const APP_PORT = Number(process.env.APP_PORT) || 3000;
export const APP_HOST =
    (process.env.APP_HOST || 'http://www.librarian.world') + (APP_PORT !== 80 ? `:${APP_PORT}` : '');
