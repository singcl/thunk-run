/// <reference path="../typings/index.d.ts" />
declare function run(gen: (...args: any[]) => IterableIterator<Thunk>): void;
export = run;
