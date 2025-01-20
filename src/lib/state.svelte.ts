import { Spring } from 'svelte/motion';

class Game {
  isPlaying = $state(true);
  wobbleEffectTimer = new Spring(0, {
    stiffness: 0.3,
    damping: 0.08
  });

  async stop() {
    this.isPlaying = false;

    // Wobble effect
    await this.wobbleEffectTimer.set(1);
    this.wobbleEffectTimer.set(0, {
      instant: true
    });
  }
}

export const game = new Game();
