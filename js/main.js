class GameOfLife {
    constructor(width, height) {
        this.width = width
        this.height = height;
        this.cells = [];
    }
    createBoard() {
        const board = document.querySelector('.board')
        board.style.width = `${this.width * 20}px`;
        const boardSize = this.width * this.height
        for (let i = 0; i < boardSize; i++) {
            const newDiv = document.createElement('div');
            board.appendChild(newDiv)
        }
        this.cells = [...document.querySelectorAll('.board div')]
        this.cells.forEach(element => {
            element.addEventListener('click', (e) => {
                e.target.classList.toggle('live')
            })
        })
    }
    findIndex(x, y) {
        const index = y * this.width + x;
        return this.cells[index];
    }
    setCellState(x, y, state) {
        if (state === 'live') {
            this.findIndex(x, y).classList.add('live')
        } else {
            this.findIndex(x, y).classList.remove('live')
        }
    }
    gliderGun() {
        this.setCellState(0, 4, 'live')
        this.setCellState(0, 5, 'live')
        this.setCellState(1, 4, 'live')
        this.setCellState(1, 5, 'live')
        this.setCellState(10, 4, 'live')
        this.setCellState(10, 5, 'live')
        this.setCellState(10, 6, 'live')
        this.setCellState(11, 3, 'live')
        this.setCellState(11, 7, 'live')
        this.setCellState(12, 2, 'live')
        this.setCellState(12, 8, 'live')
        this.setCellState(13, 2, 'live')
        this.setCellState(13, 8, 'live')
        this.setCellState(14, 5, 'live')
        this.setCellState(15, 3, 'live')
        this.setCellState(15, 7, 'live')
        this.setCellState(16, 4, 'live')
        this.setCellState(16, 5, 'live')
        this.setCellState(16, 6, 'live')
        this.setCellState(17, 5, 'live')
        this.setCellState(20, 4, 'live')
        this.setCellState(20, 3, 'live')
        this.setCellState(20, 2, 'live')
        this.setCellState(21, 2, 'live')
        this.setCellState(21, 3, 'live')
        this.setCellState(21, 4, 'live')
        this.setCellState(22, 5, 'live')
        this.setCellState(22, 1, 'live')
        this.setCellState(24, 0, 'live')
        this.setCellState(24, 1, 'live')
        this.setCellState(24, 5, 'live')
        this.setCellState(24, 6, 'live')
        this.setCellState(34, 2, 'live')
        this.setCellState(34, 3, 'live')
        this.setCellState(35, 2, 'live')
        this.setCellState(35, 3, 'live')
    }
    computeCellNextState(x, y) {
        let aliveCells = 0;
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i >= 0 && i < this.width && j >= 0 && j < this.height) {
                    if (i !== x || j !== y) {
                        if (this.findIndex(i, j).className === 'live')
                            aliveCells++;
                    }
                }
            }
        }
        if (this.findIndex(x, y).className === 'live') {
            if (aliveCells === 2 || aliveCells === 3) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (aliveCells === 3) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    computeNextGeneration() {
        const nextState = []
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                nextState.push(this.computeCellNextState(i, j));
            }
        }
        return nextState
    }
    printNextGeneration() {
        const nextState = this.computeNextGeneration()
        for (let i = 0; i < this.cells.length; i++) {
            if (nextState[i] === 1) {
                this.cells[i].classList.add('live')
            } else {
                this.cells[i].classList.remove('live')
            }
        }
    }
    removeBoard() {
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].classList.remove('live')
        }
    }
    startGame() {
        game.createBoard()
        game.gliderGun()
        let interval
        const startButton = document.querySelector('#play')
        startButton.addEventListener('click', (e) => {
            if (startButton.className !== 'active') {
                interval = setInterval(() => {
                    game.printNextGeneration()
                }, 10)
                e.target.classList.add('active')
                e.target.textContent = 'Pauza'
            } else {
                clearInterval(interval)
                e.target.classList.remove('active')
                e.target.textContent = 'Start'
            }
        })
        document.querySelector('#clear').addEventListener('click', () => {
            clearInterval(interval)
            game.removeBoard();
            startButton.classList.remove('active')
            startButton.textContent = 'Start'
        })
        document.querySelector('#glider').addEventListener('click', () => {
            this.gliderGun()
        })
    }
}
const game = new GameOfLife(60, 30);
game.startGame();