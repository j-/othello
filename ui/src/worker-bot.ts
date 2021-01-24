import { MCTSBot } from 'boardgame.io/ai';
// eslint-disable-next-line import/no-webpack-loader-syntax
import WorkerClass from 'workerize-loader!@othello/worker';

const worker = new WorkerClass();

const handleMessageOnce = <T = any>(messageType: string, handler: (payload?: T) => void) => {
  const listener = ({ data }: { data: { type: string, payload: T } }) => {
    if (!data || !data.type) return;
    const { type, payload } = data;
    if (messageType !== type) return;
    handler(payload);
    window.removeEventListener('message', listener);
  };
  worker.addEventListener('message', listener);
};

const postMessage = <T = any>(type: string, payload?: T) => {
  worker.postMessage({
    type,
    payload,
  });
};

export class WorkerBot extends MCTSBot {
  constructor (...args: ConstructorParameters<typeof MCTSBot>) {
    super(...args);
    postMessage('INITIALIZE_BOT');
  }

  async play (...args: Parameters<MCTSBot['play']>) {
    const promise = new Promise((resolve) => {
      handleMessageOnce('PLAY_RESULT', resolve);
    });
    postMessage('PLAY', args);
    return await promise as ReturnType<MCTSBot['play']>;
  }
}
