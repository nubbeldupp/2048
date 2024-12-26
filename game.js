class Game2048 {
  constructor() {
    this.grid = Array(4).fill().map(() => Array(4).fill(0));
    this.score = 0;
    this.bestScore = localStorage.getItem('bestScore') || 0;
    this.gridElement = document.querySelector('.grid');
    this.scoreElement = document.getElementById('score');
    this.bestScoreElement = document.getElementById('best-score');
    this.newGameButton = document.getElementById('new-game');

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateScoreDisplay();
    this.spawnTile();
    this.spawnTile();
    this.renderGrid();
  }

  setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.move('up');
          break;
        case 'ArrowDown':
          this.move('down');
          break;
        case 'ArrowLeft':
          this.move('left');
          break;
        case 'ArrowRight':
          this.move('right');
          break;
      }
    });

    this.newGameButton.addEventListener('click', () => this.resetGame());
  }

  spawnTile() {
    const emptyCells = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.grid[r][c] === 0) {
          emptyCells.push({ r, c });
        }
      }
    }

    if (emptyCells.length > 0) {
      const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      this.grid[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  move(direction) {
    const originalGrid = JSON.parse(JSON.stringify(this.grid));
    let moved = false;

    switch (direction) {
      case 'up':
        moved = this.moveUp();
        break;
      case 'down':
        moved = this.moveDown();
        break;
      case 'left':
        moved = this.moveLeft();
        break;
      case 'right':
        moved = this.moveRight();
        break;
    }

    if (moved) {
      this.spawnTile();
      this.renderGrid();
      this.checkGameStatus();
    }
  }

  moveUp() {
    let moved = false;
    for (let c = 0; c < 4; c++) {
      const column = [this.grid[0][c], this.grid[1][c], this.grid[2][c], this.grid[3][c]];
      const newColumn = this.mergeTiles(column);

      for (let r = 0; r < 4; r++) {
        if (this.grid[r][c] !== newColumn[r]) {
          moved = true;
        }
        this.grid[r][c] = newColumn[r];
      }
    }
    return moved;
  }

  moveDown() {
    let moved = false;
    for (let c = 0; c < 4; c++) {
      const column = [this.grid[0][c], this.grid[1][c], this.grid[2][c], this.grid[3][c]];
      const newColumn = this.mergeTiles(column.reverse()).reverse();

      for (let r = 0; r < 4; r++) {
        if (this.grid[r][c] !== newColumn[r]) {
          moved = true;
        }
        this.grid[r][c] = newColumn[r];
      }
    }
    return moved;
  }

  moveLeft() {
    let moved = false;
    for (let r = 0; r < 4; r++) {
      const row = this.grid[r];
      const newRow = this.mergeTiles(row);

      for (let c = 0; c < 4; c++) {
        if (this.grid[r][c] !== newRow[c]) {
          moved = true;
        }
        this.grid[r][c] = newRow[c];
      }
    }
    return moved;
  }

  moveRight() {
    let moved = false;
    for (let r = 0; r < 4; r++) {
      const row = this.grid[r];
      const newRow = this.mergeTiles(row.reverse()).reverse();

      for (let c = 0; c < 4; c++) {
        if (this.grid[r][c] !== newRow[c]) {
          moved = true;
        }
        this.grid[r][c] = newRow[c];
      }
    }
    return moved;
  }

  mergeTiles(line) {
    line = line.filter(tile => tile !== 0);

    for (let i = 0; i < line.length - 1; i++) {
      if (line[i] === line[i + 1]) {
        line[i] *= 2;
        this.score += line[i];
        line.splice(i + 1, 1);
      }
    }

    while (line.length < 4) {
      line.push(0);
    }

    this.updateScoreDisplay();
    return line;
  }

  renderGrid() {
    this.gridElement.innerHTML = '';
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const tileValue = this.grid[r][c];
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');

        if (tileValue !== 0) {
          tileElement.textContent = tileValue;
          tileElement.classList.add(`tile-${tileValue}`);
        }

        this.gridElement.appendChild(tileElement);
      }
    }
  }

  updateScoreDisplay() {
    this.scoreElement.textContent = this.score;
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('bestScore', this.bestScore);
    }
    this.bestScoreElement.textContent = this.bestScore;
  }

  checkGameStatus() {
    // Check for 2048 win condition
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.grid[r][c] === 2048) {
          alert('Congratulations! You reached 2048!');
          return;
        }
      }
    }

    // Check if game is over (no more moves possible)
    if (!this.canMove()) {
      alert('Game Over! No more moves possible.');
    }
  }

  canMove() {
    // Check if any cell is empty
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.grid[r][c] === 0) return true;
      }
    }

    // Check if any adjacent cells can be merged
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (
          (r > 0 && this.grid[r][c] === this.grid[r - 1][c]) ||
          (r < 3 && this.grid[r][c] === this.grid[r + 1][c]) ||
          (c > 0 && this.grid[r][c] === this.grid[r][c - 1]) ||
          (c < 3 && this.grid[r][c] === this.grid[r][c + 1])
        ) return true;
      }
    }

    return false;
  }

  resetGame() {
    this.grid = Array(4).fill().map(() => Array(4).fill(0));
    this.score = 0;
    this.updateScoreDisplay();
    this.spawnTile();
    this.spawnTile();
    this.renderGrid();
  }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new Game2048();
});
