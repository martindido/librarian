import { Debugger } from 'debug';

export type Logger = {
    info: Debugger;
    warn: Debugger;
    error: Debugger;
};

export type Loggers = {
    [key: string]: Logger;
};
