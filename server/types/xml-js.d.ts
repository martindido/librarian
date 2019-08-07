import * as xmlJs from 'xml-js';

declare module 'xml-js' {
    namespace Options {
        interface XML2JS {
            nativeTypeAttributes?: boolean;
        }
    }

    export function xml2js<Element>(xml: string, options?: Options.XML2JS): Element;
}
