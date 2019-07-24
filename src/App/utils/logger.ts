import createDebug from 'debug';

import { Logger, Loggers } from '../types/Logger';

createDebug.disable();
if (process.env.REACT_APP_DEBUG) {
    createDebug.enable(process.env.REACT_APP_DEBUG);
}

const LOGGER_KEY_BASE = 'librarian';
const LOGGER_KEY_SEPARATOR = ':';
const LOGGER_LEVEL_WARN = 'warn';
const LOGGER_LEVEL_ERROR = 'error';

const loggers: Loggers = {};

function generateKey(keys: string | string[], level?: string) {
    const keysArray = Array.isArray(keys) ? keys : [keys];
    let key = [LOGGER_KEY_BASE].concat(keysArray);

    if (level) {
        key = key.concat(level);
    }
    return key.join(LOGGER_KEY_SEPARATOR);
}

export default function createLogger(keys: string | string[]): Logger {
    const key = generateKey(keys);

    if (!loggers[key]) {
        loggers[key] = {
            info: createDebug(generateKey(keys)),
            warn: createDebug(generateKey(keys, LOGGER_LEVEL_WARN)),
            error: createDebug(generateKey(keys, LOGGER_LEVEL_ERROR))
        };
    }
    return loggers[key];
}
