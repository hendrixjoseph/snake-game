export default class SnakeScene extends Phaser.Scene {
  public static Name = "SnakeScene";

  snakeHead: Phaser.GameObjects.Rectangle;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  create(): void {
    this.cursors = this.input.keyboard!.createCursorKeys();

    this.snakeHead = this.add.rectangle(400, 300, 20, 20, 0xff0000);
  }

  update() {
    if (this.cursors.left.isDown) {

    } else if (this.cursors.right.isDown) {

    } else {

    }
  }
}
