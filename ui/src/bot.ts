import { MCTSBot } from 'boardgame.io/ai';

export interface GetBotOptions {
  iterations: number;
  playoutDepth: number;
  minThinkTime?: number;
  thinkDelay?: number;
}

export const wait = (ms: number) => new Promise<void>((resolve) => {
  setTimeout(resolve, ms);
});

export const getBot = ({
  iterations,
  playoutDepth,
  minThinkTime = 600,
  thinkDelay = 400,
}: GetBotOptions) => (
  class extends MCTSBot {
    constructor (...args: ConstructorParameters<typeof MCTSBot>) {
      super(...args);
      const self = this as any;
      self.setOpt('iterations', iterations);
      self.setOpt('playoutDepth', playoutDepth);
      self.setOpt('async', true);
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
);
