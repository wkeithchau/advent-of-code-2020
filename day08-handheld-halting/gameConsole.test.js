import { expect } from 'chai'
import sinon from 'sinon'

import { operations } from './constants'
import GameConsole from './gameConsole'

describe('Day08 - Handheld Halting - GameConsole', function () {
    let stubArray

    before(function () {
        stubArray = []
    })

    beforeEach(function () {
        GameConsole.reset()
    })

    afterEach(function () {
        while (stubArray.length > 0) {
            const stub = stubArray.shift()
            stub.restore()
        }
    })

    after(function () {
        GameConsole.reset()
    })

    describe('accOp', function () {
        it('Increases the accumulator', function () {
            GameConsole.accumulator = 2
            GameConsole.accOp(7)
            expect(GameConsole.accumulator).to.equal(9)
        })

        it('Decreases the accumulator', function () {
            GameConsole.accumulator = 9
            GameConsole.accOp(-4)
            expect(GameConsole.accumulator).to.equal(5)
        })

        it('Does not change the accumulator', function () {
            GameConsole.accumulator = 3
            GameConsole.accOp(0)
            expect(GameConsole.accumulator).to.equal(3)
        })
    })

    describe('jmpOp', function () {
        it('Increases the currentLine', function () {
            GameConsole.currentLine = 2
            GameConsole.jmpOp(7)
            expect(GameConsole.currentLine).to.equal(9)
        })

        it('Decreases the currentLine', function () {
            GameConsole.currentLine = 9
            GameConsole.jmpOp(-4)
            expect(GameConsole.currentLine).to.equal(5)
        })

        it('Does not change the currentLine', function () {
            GameConsole.currentLine = 3
            GameConsole.jmpOp(0)
            expect(GameConsole.currentLine).to.equal(3)
        })
    })

    describe('runOp', function () {
        it('Calls accOp', function () {
            const opSpy = sinon.spy(GameConsole, 'accOp')
            stubArray.push(opSpy)

            GameConsole.instructions = [
                { operation: operations.acc, argument: 0 },
            ]
            GameConsole.runOp()
            expect(opSpy.calledOnce).to.be.true
        })

        it('Calls jmp', function () {
            const opSpy = sinon.spy(GameConsole, 'jmpOp')
            stubArray.push(opSpy)

            GameConsole.instructions = [
                { operation: operations.jmp, argument: 0 },
            ]
            GameConsole.runOp()
            expect(opSpy.calledOnce).to.be.true
        })

        it('Calls nopOp', function () {
            const opSpy = sinon.spy(GameConsole, 'nopOp')
            stubArray.push(opSpy)

            GameConsole.instructions = [
                { operation: operations.nop, argument: 0 },
            ]
            GameConsole.runOp()
            expect(opSpy.calledOnce).to.be.true
        })

        it('Calls step', function () {
            const stepSpy = sinon.spy(GameConsole, 'nopOp')
            stubArray.push(stepSpy)

            GameConsole.instructions = [
                { operation: operations.nop, argument: 0 },
            ]
            GameConsole.runOp()
            expect(stepSpy.calledOnce).to.be.true
        })

        it('Calls checkEnd', function () {
            const endSpy = sinon.spy(GameConsole, 'nopOp')
            stubArray.push(endSpy)

            GameConsole.instructions = [
                { operation: operations.nop, argument: 0 },
            ]
            GameConsole.runOp()
            expect(endSpy.calledOnce).to.be.true
        })

        it('Adds currentLine into order array', function () {
            GameConsole.instructions = [
                { operation: operations.nop, argument: 0 },
            ]
            GameConsole.runOp()
            expect(GameConsole.order).to.have.members([0])
        })
    })

    describe('step', function () {
        it('Set lockNext to false when lockNext is true', function () {
            GameConsole.lockNext = true
            GameConsole.step()
            expect(GameConsole.lockNext).to.be.false
        })

        it('Does not increment currentLine when lockNext is true', function () {
            GameConsole.lockNext = true
            GameConsole.currentLine = 99
            GameConsole.step()
            expect(GameConsole.currentLine).to.equal(99)
        })

        it('Does not change lockNext when lockNext is false', function () {
            GameConsole.lockNext = false
            GameConsole.step()
            expect(GameConsole.lockNext).to.be.false
        })

        it('Increments currentLine by 1 when lockNext is false', function () {
            GameConsole.lockNext = false
            GameConsole.currentLine = 99
            GameConsole.step()
            expect(GameConsole.currentLine).to.equal(100)
        })
    })

    describe('checkEnd', function () {
        it('Sets end to true when the end of the instructions is reached', function () {
            GameConsole.end = false
            GameConsole.instructions = []
            GameConsole.checkEnd()
            expect(GameConsole.end).to.be.true
        })

        it('Does not change end when the end of the instructions is not reached', function () {
            GameConsole.end = false
            GameConsole.instructions = [
                { operation: operations.nop, argument: 0 },
            ]
            GameConsole.checkEnd()
            expect(GameConsole.end).to.be.false
        })
    })

    describe('checkLoop', function () {
        it('Sets terminate to true when there is a repeat in instruction execution', function () {
            GameConsole.terminate = false
            GameConsole.order = [0]
            GameConsole.checkLoop()
            expect(GameConsole.terminate).to.be.true
        })

        it('Does not change terminate when there is not a repeat in instruction execution', function () {
            GameConsole.terminate = false
            GameConsole.order = []
            GameConsole.checkLoop()
            expect(GameConsole.terminate).to.be.false
        })
    })

    describe('run', function () {
        it('Stops running when terminate is true', function () {
            GameConsole.instructions = [
                { operation: operations.nop, argument: 0 },
            ]
            GameConsole.terminate = true
            GameConsole.run()
            expect(GameConsole.order).to.be.empty
        })

        it('Stops running when end is true', function () {
            GameConsole.instructions = [
                { operation: operations.nop, argument: 0 },
            ]
            GameConsole.end = true
            GameConsole.run()
            expect(GameConsole.order).to.be.empty
        })

        it('Returns the accumulator', function () {
            GameConsole.instructions = [
                { operation: operations.nop, argument: 0 },
            ]
            GameConsole.accumulator = 13
            const result = GameConsole.run()
            expect(result).to.equal(GameConsole.accumulator)
        })
    })

    describe('load', function () {
        it('Calls reset', function () {
            const resetSpy = sinon.spy(GameConsole, 'reset')
            stubArray.push(resetSpy)

            GameConsole.load([])
            expect(resetSpy.calledOnce).to.be.true
        })

        it('Sets instructions with new array', function () {
            GameConsole.instructions = []
            const instructions = [{ operation: operations.nop, argument: 0 }]
            GameConsole.load(instructions)
            expect(GameConsole.instructions).to.have.deep.members(instructions)
        })
    })

    describe('Sample case', function () {
        const data = [
            { operation: 'nop', argument: 0 },
            { operation: 'acc', argument: 1 },
            { operation: 'jmp', argument: 4 },
            { operation: 'acc', argument: 3 },
            { operation: 'jmp', argument: -3 },
            { operation: 'acc', argument: -99 },
            { operation: 'acc', argument: 1 },
            { operation: 'jmp', argument: -4 },
            { operation: 'acc', argument: 6 },
        ]

        it('Part 1 - Results is 5', function () {
            GameConsole.load(data)
            const result = GameConsole.run()
            expect(result).to.equal(5)
        })
    })
})
