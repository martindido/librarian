export const APP_PORT = Number(process.env.PORT) || 3000;
export const APP_HOST = `http${process.env.HTTPS ? 's' : ''}://${process.env.HOST || 'www.librarian.world'}${
    APP_PORT !== 80 ? `:${APP_PORT}` : ''
}`;
