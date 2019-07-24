import * as xmlJs from 'xml-js';

declare module 'xml-js' {
    export function xml2js<Element>(xml: string, options?: Options.XML2JS): Element;
}
