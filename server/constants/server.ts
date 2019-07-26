export const SERVER_PORT = Number(process.env.SERVER_PORT) || 5000;
export const SERVER_HOST = `http${process.env.HTTPS ? 's' : ''}://${process.env.HOST || 'www.librarian.world'}${
    SERVER_PORT !== 80 ? `:${SERVER_PORT}` : ''
}`;
export const SERVER_STATIC_PATH = process.env.PUBLIC_URL || '/public';
