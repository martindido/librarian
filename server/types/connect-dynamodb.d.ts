declare module 'connect-dynamodb' {
    import { session, Store } from 'express-session';

    export = (connect: session) => DynamoDBStore;

    declare type DynamoDBStoreOptions = {
        table: string;
    };

    declare class DynamoDBStore extends Store {
        constructor(DynamoDBStoreOptions);
    }
}
