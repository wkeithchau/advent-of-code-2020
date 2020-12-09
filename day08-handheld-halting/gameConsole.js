import { operations } from './constants'

class GameConsole {
    instructions = []
    terminate = false
    end = false
    lockNext = false
    order = []
    currentLine = 0
    accumulator = 0

    accOp = (arg) => {
        this.accumulator += arg
    }

    jmpOp = (arg) => {
        this.currentLine += arg
    }

    nopOp = () => {
        // Do nothing
    }

    runOp = () => {
        const { operation, argument } = this.instructions[this.currentLine]
        this.order.push(this.currentLine)

        let op = () => {}
        if (operation === operations.acc) {
            op = this.accOp
        } else if (operation === operations.jmp) {
            op = this.jmpOp
            this.lockNext = true
        } else if (operation === operations.nop) {
            op = this.nopOp
        }
        op(argument)

        this.step()
        this.checkEnd()
    }

    step = () => {
        if (this.lockNext === true) {
            this.lockNext = false
        } else {
            this.currentLine += 1
        }
    }

    checkEnd = () => {
        if (this.instructions[this.currentLine] === undefined) {
            this.end = true
        }
    }

    checkLoop = () => {
        const repeat = this.order.indexOf(this.currentLine) !== -1
        if (repeat === true) {
            this.terminate = true
        }
    }

    run = () => {
        while (this.terminate === false && this.end === false) {
            this.runOp()
            this.checkLoop()
        }
        return this.accumulator
    }

    load = (instructions) => {
        this.reset()
        this.instructions = instructions
    }

    reset = () => {
        this.instructions = []
        this.terminate = false
        this.end = false
        this.lockNext = false
        this.order = []
        this.currentLine = 0
        this.accumulator = 0
    }
}

const gameConsole = new GameConsole()
export default gameConsole
