import { Spring } from 'svelte/motion';
import { pubs } from './pubs';

const { managedSubscriber, publish } = pubs([
  'gameStarted',
  'gameLost',
  'gameRestarted'
]);

class Game {
  status: 'idle' | 'playing' | 'lost' = $state('idle');

  wobbleEffectTimer = new Spring(0, {
    stiffness: 0.3,
    damping: 0.08
  });

  start() {
    this.status = 'playing';
    publish('gameStarted');
  }

  restart() {
    this.status = 'playing';
    publish('gameRestarted');
  }

  async stop() {
    setTimeout(() => {
      this.status = 'lost';
    }, 100);

    publish('gameLost');

    // Wobble effect
    await this.wobbleEffectTimer.set(1);
    this.wobbleEffectTimer.set(0, {
      instant: true
    });
  }

  on = managedSubscriber().on;
}

export const game = new Game();
