class GameOfLife {
    constructor(width, height) {
        this.width = width
        this.height = height;
        this.cells = [];
    }
    createBoard() {
        const board = document.querySelector('#board')
        board.style.width = `${this.width * 10}px`;
        board.style.height = `${this.height * 10}px`;
        const boardSize = this.width * this.height
        for (let i = 0; i < boardSize; i++) {
            const newDiv = document.createElement('div');
            board.appendChild(newDiv);
        }
        this.cells = [...document.querySelectorAll('#board div')]
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
    firstGlider() {
        this.setCellState(0, 2, 'live')
        this.setCellState(1, 0, 'live')
        this.setCellState(1, 2, 'live')
        this.setCellState(2, 1, 'live')
        this.setCellState(2, 2, 'live')
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
        game.firstGlider()
        let interval
        const startButton = document.querySelector('#play')
        startButton.addEventListener('click', (e) => {
            if (startButton.className !== 'active') {
                interval = setInterval(() => {
                    game.printNextGeneration()
                }, 200)
                e.target.classList.add('active')
                e.target.textContent = 'Pauza'
            } else {
                clearInterval(interval)
                e.target.classList.remove('active')
                e.target.textContent = 'Start'
            }
        })
        document.querySelector('#stop').addEventListener('click', () => {
            clearInterval(interval)
            game.removeBoard();
            startButton.classList.remove('active')
            startButton.textContent = 'Start'
        })

    }
}

const game = new GameOfLife(40, 20);
game.startGame();