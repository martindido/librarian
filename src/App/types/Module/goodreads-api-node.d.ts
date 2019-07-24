declare module 'goodreads-api-node' {
    export type Goodreads = any;

    export type Credentials = {
        key: string;
        secret: string;
    };

    export default (credentials: Credentials, callback: string) => Goodreads;
}
