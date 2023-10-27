export default class SnakeScene extends Phaser.Scene {
  public static Name = "SnakeScene";

  public create(): void {
    this.add.rectangle(400, 300, 20, 20, 0xff0000);
  }
}
