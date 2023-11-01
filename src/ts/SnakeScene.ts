type Food = "faster" | "scorer";

type FoodTypes = [Food, number];

export default class SnakeScene extends Phaser.Scene {
  public static Name = "SnakeScene";

  foodTypes: FoodTypes[] = [
    ["faster", 0xff0000],
    ["scorer", 0x00ff00],
  ];

  snakeHead: Phaser.GameObjects.Rectangle;
  snakeBody: Phaser.GameObjects.Rectangle[] = [];

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  food: Phaser.GameObjects.Star;

  xVelocity = 0;
  yVelocity = 0;

  snakeLength = 10;

  speed = 500;

  lastUpdateTime = 0;

  score = 0;

  gameOver = false;

  create(): void {
    this.cursors = this.input.keyboard!.createCursorKeys();

    this.snakeHead = this.add.rectangle(400, 300, 20, 20, 0xff0000);

    this.food = this.add.star(450, 350, 5, 5, 10, 0x00ff00);
    this.food.setData("type", "scorer" satisfies Food);
  }

  eat(food: Phaser.GameObjects.Star) {
    let eatenFoodType = food.getData("type") as Food;

    if (eatenFoodType === "scorer") {
      this.score += 10;
      document.getElementById("score")!.innerText = this.score.toString();
    } else if (eatenFoodType === "faster") {
      this.speed = Math.max(this.speed - 10, 0);
    }

    let x = Phaser.Math.RND.between(10, 790);
    let y = Phaser.Math.RND.between(10, 590);

    let foodType = Phaser.Math.RND.pick(this.foodTypes);

    this.food = this.add.star(x, y, 5, 5, 10, foodType[1]);
    this.food.setData("type", foodType[0]);

    this.snakeLength++;

    food.destroy();
  }

  update(time: number) {
    if (!this.gameOver) {
      this.setDirection();

      if (this.xVelocity !== 0 || this.yVelocity !== 0) {
        let timeDiff = time - this.lastUpdateTime;

        if (timeDiff > this.speed) {
          this.lastUpdateTime = time;

          this.move();

          if (this.intersects(this.snakeHead, this.food)) {
            this.eat(this.food);
          }
        }
      }
    }
  }

  intersects(
    object1: Phaser.GameObjects.Shape,
    object2: Phaser.GameObjects.Shape,
  ) {
    return Phaser.Geom.Intersects.RectangleToRectangle(
      object1.getBounds(),
      object2.getBounds(),
    );
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

    if (this.snakeBody.length > this.snakeLength) {
      let deadPart = this.snakeBody.pop();
      deadPart?.destroy();
    }

    this.snakeHead = this.add.rectangle(
      this.snakeHead.x + this.xVelocity * this.snakeHead.width,
      this.snakeHead.y + this.yVelocity * this.snakeHead.height,
      this.snakeHead.width,
      this.snakeHead.height,
      this.snakeHead.fillColor,
    );

    this.gameOver = this.isGameOver();
  }

  isGameOver() {
    return (
      this.snakeBody.some(
        (part) => this.snakeHead.x === part.x && this.snakeHead.y === part.y,
      ) ||
      this.snakeHead.x < 0 ||
      this.snakeHead.y < 0 ||
      this.snakeHead.x > 800 ||
      this.snakeHead.y > 600
    );
  }
}
