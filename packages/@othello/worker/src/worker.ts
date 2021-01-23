import { Bot, MCTSBot } from 'boardgame.io/ai';
import { OthelloGame} from '@othello/game';

let bot: Bot;

const wait = (ms: number) => new Promise<void>((resolve) => {
  setTimeout(resolve, ms);
});

const handleMessage = <T = any>(type: string, handler: (payload?: T) => void) => {
  self.addEventListener('message', ({ data }: { data: { type: string, payload?: T } }) => {
    if (!data || !data.type) return;
    if (data.type !== type) return;
    handler(data.payload);
  });
};

const postBack = <T = any>(type: string, payload?: T) => {
  self.postMessage({
    type,
    payload,
  });
};

handleMessage('INITIALIZE_BOT', (payload) => {
  self.postMessage({
    type: 'INITIALIZE_BOT_START',
  });
  const iterations = 2000;
  const playoutDepth = 64;
  const async = false;
  const thinkDelay = 0;
  const minThinkTime = 1000;
  class WorkerBot extends MCTSBot {
    constructor (...args: ConstructorParameters<typeof MCTSBot>) {
      super(...args);
      this.setOpt('iterations', iterations);
      this.setOpt('playoutDepth', playoutDepth);
      this.setOpt('async', async);
      self.postMessage({
        type: 'INITIALIZE_BOT_SUCCESS',
      });
    }

    async play (...args: Parameters<MCTSBot['play']>) {
      await wait(thinkDelay);
      const move = super.play(...args);
      const time = new Promise((resolve) => {
        setTimeout(resolve, minThinkTime);
      });
      // Impose min time on move so bot doesn't play too fast
      await Promise.all([move, time]);
      return move;
    }
  }
  const game = OthelloGame;
  const enumerate = game.ai?.enumerate;
  if (!enumerate) return;
  bot = new WorkerBot({
    enumerate,
    game,
  });
});

handleMessage('PLAY', async ([state, playerId]) => {
  const result = await bot.play(state, playerId);
  postBack('PlAY_RESULT', result);
});
