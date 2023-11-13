# Snake Game

A simple Snake game built with Phaser 3 on top of TypeScript + Webpack.

## Introduction

This is a basic implementation of the classic Snake game using the Phaser 3 game framework. The game features a snake that grows longer or faster as it consumes different types of food. The goal is to eat as much as possible without colliding with the walls or yourself.

## Installation

To run the game locally, follow these steps:

Clone the repository:

```bash
git clone https://github.com/yourusername/snake-game.git
```

Navigate into the repository and run `npm install`:

```bash
cd snake-game
npm install
```

Finally, run `npm run start:dev`:

```bash
npm run start:dev
```

After the game compiles, you should be able to navigate to <http://localhost:8080/> and play the game.

## Usage

## Controls

- Arrow Keys: Navigate the snake (Up, Down, Left, Right)
- On-screen buttons: Click to set the snake's direction
- Click anywhere (on Game Over): Restart the game
- F Key or "Full Screen" button: Toggle fullscreen mode

## Gameplay

The snake starts with an initial length and speed.

Different types of food appear, each with a unique color:

- Red (faster): Increases the snake's speed
- Green (scorer): Increases the score and length of th snake

The game ends if the snake collides with itself or the walls.

Enjoy playing Snake! 🐍
