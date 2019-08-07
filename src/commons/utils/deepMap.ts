export type MapFunction = (value: any, key: string | number) => any;

export interface Options {
    this?: any;
    inPlace?: boolean;
    shouldMapArray?: (value: any) => boolean;
    shouldMapObject?: (value: any) => boolean;
}

export default function deepMap(object: any, mapFunction: MapFunction, options: Options = {}): any {
    return new DeepMap(mapFunction, options).map(object);
}

class DeepMap {
    constructor(private mapFunction: MapFunction, private options: Options) {}

    private cache = new WeakMap<object, any>();

    public map(value: any, key: string | number = ''): any {
        return (this.options.shouldMapArray || this.shouldMapArray)(value)
            ? this.mapArray(value)
            : (this.options.shouldMapObject || this.shouldMapObject)(value)
            ? this.mapObject(value)
            : this.mapFunction.call(this.options.this, value, key);
    }

    private shouldMapArray(value: any): boolean {
        return Array.isArray(value);
    }

    private shouldMapObject(value: any): boolean {
        return typeof value === 'object';
    }

    private mapArray(array: any[]): any[] {
        if (this.cache.has(array)) {
            return this.cache.get(array);
        }

        const length = array.length;
        const result = this.options.inPlace ? array : [];
        this.cache.set(array, result);

        for (let i = 0; i < length; i++) {
            result[i] = this.map(array[i], i);
        }

        return result;
    }

    private mapObject(object: { [key: string]: any }): object {
        if (this.cache.has(object)) {
            return this.cache.get(object);
        }

        const result = this.options.inPlace ? object : ({} as { [key: string]: any });
        this.cache.set(object, result);

        for (const key in object as any) {
            if (object.hasOwnProperty(key)) {
                result[key] = this.map(object[key], key);
            }
        }

        return result;
    }
}
