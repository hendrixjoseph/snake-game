export default class SnakeScene extends Phaser.Scene {
  public static Name = "SnakeScene";

  snakeHead: Phaser.GameObjects.Rectangle;
  snakeBody: Phaser.GameObjects.Rectangle[] = [];

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  food: Phaser.GameObjects.Star;

  xVelocity = 0;
  yVelocity = 0;

  lastUpdateTime = 0;

  create(): void {
    this.cursors = this.input.keyboard!.createCursorKeys();

    this.snakeHead = this.add.rectangle(400, 300, 20, 20, 0xff0000);

    this.food = this.add.star(450, 350, 5, 5, 10, 0x00ff00);
  }

  eat(food: Phaser.GameObjects.Star) {
    food.destroy();
    
  }

  update(time: number) {
    this.setDirection();

    if (this.xVelocity !== 0 || this.yVelocity !== 0) {
      let timeDiff = time - this.lastUpdateTime;

      if (timeDiff > 500) {
        this.lastUpdateTime = time;

        this.move();

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.snakeHead.getBounds(), this.food.getBounds())) {
          this.eat(this.food);
        }
      }
    }
  }

  setDirection() {
    if (this.cursors.left.isDown) {
      this.xVelocity = -1;
      this.yVelocity = 0;
    } else if (this.cursors.right.isDown) {
      this.xVelocity = 1;
      this.yVelocity = 0;
    } else if (this.cursors.up.isDown) {
      this.xVelocity = 0;
      this.yVelocity = -1;
    } else if (this.cursors.down.isDown) {
      this.xVelocity = 0;
      this.yVelocity = 1;
    }

  }

  move() {
    this.snakeBody.unshift(this.snakeHead);

    if (this.snakeBody.length > 10) {
      let deadPart = this.snakeBody.pop();
      deadPart?.destroy();
    }

    this.snakeHead = this.add.rectangle(
      this.snakeHead.x + this.xVelocity * this.snakeHead.width,
      this.snakeHead.y + this.yVelocity * this.snakeHead.height,
      this.snakeHead.width,
      this.snakeHead.height,
      this.snakeHead.fillColor
    )
  }
}
