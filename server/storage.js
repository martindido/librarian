// export class CustomCookieStorage {
//     constructor(cookies?: Object) {
//         if (cookies) this.cookies = cookies;
//     }

//     cookies = {};

//     /**
//      * This is used to set a specific item in storage
//      * @param {string} key - the key for the item
//      * @param {object} value - the value
//      * @returns {string} value that was set
//      */
//     setItem(key: string, value: any) {
//         this.cookies[key] = value;
//         return this.cookies[key];
//     }

//     /**
//      * This is used to get a specific key from storage
//      * @param {string} key - the key for the item
//      * This is used to clear the storage
//      * @returns {string} the this.cookies item
//      */
//     getItem(key: string) {
//         return Object.prototype.hasOwnProperty.call(this.cookies, key) ? this.cookies[key] : undefined;
//     }

//     /**
//      * This is used to remove an item from storage
//      * @param {string} key - the key being set
//      * @returns {string} value - value that was deleted
//      */
//     removeItem(key: string) {
//         return delete this.cookies[key];
//     }

//     /**
//      * This is used to clear the storage
//      * @returns {string} nothing
//      */
//     clear() {
//         this.cookies = {};
//         return this.cookies;
//     }
// }
