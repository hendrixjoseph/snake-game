import SnakeScene from "./SnakeScene";

export default class SnakeGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    this.scene.add(SnakeScene.Name, SnakeScene);
    this.scene.start(SnakeScene.Name);
  }
}

window.onload = () => {
  const gameConfig: Phaser.Types.Core.GameConfig = {
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    type: Phaser.AUTO,
    parent: "content",
    title: "Snake Game",
  };

  new SnakeGame(gameConfig);
};
