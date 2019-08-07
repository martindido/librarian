declare module 'util' {
    function promisify<T1, T2, T3, TResult>(
        fn: (arg1: T1, arg2: T2, arg3: T3, callback: (err: any, result?: TResult) => void) => void
    ): () => Promise<TResult>;
}
