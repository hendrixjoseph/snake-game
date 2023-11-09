type Food = "faster" | "scorer";

type Direction = keyof Omit<
  Phaser.Types.Input.Keyboard.CursorKeys,
  "space" | "shift"
>;

export default class SnakeScene extends Phaser.Scene {
  public static Name = "SnakeScene";

  readonly INITIAL_SPEED = 10;
  readonly MAX_SPEED = 500;

  foodTypes: Record<Food, number> = {
    faster: 0xff0000,
    scorer: 0x00ff00,
  };

  snakeHead: Phaser.GameObjects.Rectangle;
  snakeBody: Phaser.GameObjects.Rectangle[] = [];

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  food: Phaser.GameObjects.Star[];

  xVelocity = 0;
  yVelocity = 0;

  snakeLength = 10;

  lastUpdateTime = 0;

  speed = this.INITIAL_SPEED;
  score = 0;

  gameOver = false;

  create(): void {
    this.snakeHead = this.add.rectangle(400, 300, 20, 20, 0xff0000);

    this.food = [
      this.createFood("scorer", 450, 350),
      this.createFood("faster", 350, 250),
    ];

    this.setupFullScreen();
    this.setupControls();
  }

  setupControls() {
    let directions: Direction[] = ["up", "down", "left", "right"];
    let cursors = this.input.keyboard!.createCursorKeys();

    directions.forEach((direction) => {
      let button = document.querySelector<HTMLButtonElement>(
        `.d-pad .${direction}`,
      )!;
      button.addEventListener("click", () => this.setDirection(direction));

      let cursor = cursors[direction];
      cursor.addListener("down", () => this.setDirection(direction));
    });
  }

  setupFullScreen() {
    let toggleFullScreen = () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    };

    const fKey = this.input.keyboard!.addKey("F");
    fKey.on("down", toggleFullScreen);

    let fullScreenButton = document.getElementById(
      "fullScreenButton",
    ) as HTMLElement;
    fullScreenButton.addEventListener("click", toggleFullScreen);
  }

  createFood(type: Food, x: number, y: number) {
    let food = this.add.star(x, y, 5, 5, 10, this.foodTypes[type]);
    food.setData("type", type);
    return food;
  }

  eat(food: Phaser.GameObjects.Star) {
    let eatenFoodType = food.getData("type") as Food;

    if (eatenFoodType === "scorer") {
      this.score += 10 + (this.speed - this.INITIAL_SPEED) / 2;
      document.getElementById("score")!.innerText = this.score.toString();
    } else if (eatenFoodType === "faster") {
      this.speed = Math.min(this.speed + 10, this.MAX_SPEED);
      document.getElementById("speed")!.innerText = this.speed.toString();
    }

    let x = Phaser.Math.RND.between(10, 790);
    let y = Phaser.Math.RND.between(10, 590);

    this.food = this.food.filter((f) => f !== food);
    this.food.push(this.createFood(eatenFoodType, x, y));

    this.snakeLength++;

    food.destroy();
  }

  update(time: number) {
    if (!this.gameOver) {
      if (this.xVelocity !== 0 || this.yVelocity !== 0) {
        let timeDiff = time - this.lastUpdateTime;

        if (timeDiff > this.MAX_SPEED - this.speed) {
          this.lastUpdateTime = time;

          this.move();

          this.food
            .filter((f) => this.intersects(this.snakeHead, f))
            .forEach((f) => this.eat(f));
        }
      }

      if (this.gameOver) {
        this.add
          .text(400, 300, "Game Over\n\ntap anywhere to start a new game", {
            fontSize: 30,
            align: "center",
          })
          .setOrigin(0.5);
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

  setDirection(direction: Direction) {
    if (direction === "left" && this.xVelocity !== 1) {
      this.xVelocity = -1;
      this.yVelocity = 0;
    } else if (direction === "right" && this.xVelocity !== -1) {
      this.xVelocity = 1;
      this.yVelocity = 0;
    } else if (direction === "up" && this.yVelocity !== 1) {
      this.xVelocity = 0;
      this.yVelocity = -1;
    } else if (direction === "down" && this.yVelocity !== -1) {
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
