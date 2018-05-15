declare type callback = (err: any, ...args: any[]) => void;
declare type SrcFunc = (...args: any[]) => void;
declare type Thunk = (done: callback) => void;