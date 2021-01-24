/// <reference types="react-scripts" />

declare module 'workerize-loader!*' {
  class WorkerizeLoader extends Worker {
    constructor();
  }

  export = WorkerizeLoader;
}
