import { expect } from 'chai'

import { actions, orientation } from './constants'
import Navigator from './navigator'

describe('Day12 - Rain Risk - Navigator', function () {
    const sampleData = [
        { action: 'F', value: 10 },
        { action: 'N', value: 3 },
        { action: 'F', value: 7 },
        { action: 'R', value: 90 },
        { action: 'F', value: 11 },
    ]

    beforeEach(function () {
        Navigator.reset()
    })

    after(function () {
        Navigator.reset()
    })

    describe('distance', function () {
        it('Calculate positive x and positive y', function () {
            Navigator.positionX = 5
            Navigator.positionY = 4
            const result = Navigator.distance()
            expect(result).to.equal(9)
        })

        it('Calculate negative x and positive y', function () {
            Navigator.positionX = -5
            Navigator.positionY = 4
            const result = Navigator.distance()
            expect(result).to.equal(9)
        })

        it('Calculate positive x and negative y', function () {
            Navigator.positionX = 5
            Navigator.positionY = -4
            const result = Navigator.distance()
            expect(result).to.equal(9)
        })

        it('Calculate negative x and negative y', function () {
            Navigator.positionX = -5
            Navigator.positionY = -4
            const result = Navigator.distance()
            expect(result).to.equal(9)
        })
    })

    describe('move', function () {
        it('Moves position positively', function () {
            const offset = 4
            const result = Navigator.move(0, offset)
            expect(result).to.equal(offset)
        })

        it('Moves position negatively', function () {
            const offset = -2
            const result = Navigator.move(0, offset)
            expect(result).to.equal(offset)
        })
    })

    describe('rotate', function () {
        it('Rotates right by 90', function () {
            const result = Navigator.rotate(orientation.east, 90)
            expect(result).to.equal(orientation.south)
        })

        it('Rotates right by 180', function () {
            const result = Navigator.rotate(orientation.east, 180)
            expect(result).to.equal(orientation.west)
        })

        it('Rotates right by 270', function () {
            const result = Navigator.rotate(orientation.east, 270)
            expect(result).to.equal(orientation.north)
        })

        it('Rotates right by 360', function () {
            const result = Navigator.rotate(orientation.east, 360)
            expect(result).to.equal(orientation.east)
        })

        it('Rotates left by 90', function () {
            const result = Navigator.rotate(orientation.east, -90)
            expect(result).to.equal(orientation.north)
        })

        it('Rotates left by 180', function () {
            const result = Navigator.rotate(orientation.east, -180)
            expect(result).to.equal(orientation.west)
        })

        it('Rotates left by 270', function () {
            const result = Navigator.rotate(orientation.east, -270)
            expect(result).to.equal(orientation.south)
        })

        it('Rotates left by 360', function () {
            const result = Navigator.rotate(orientation.east, -360)
            expect(result).to.equal(orientation.east)
        })
    })

    describe('runAction', function () {
        it('Runs north action', function () {
            Navigator.positionY = 0
            const instruction = { action: actions.north, value: 6 }
            Navigator.runAction(instruction)
            expect(Navigator.positionY).to.equal(instruction.value)
        })

        it('Runs south action', function () {
            Navigator.positionY = 0
            const instruction = { action: actions.south, value: 6 }
            Navigator.runAction(instruction)
            expect(Navigator.positionY).to.equal(-instruction.value)
        })

        it('Runs east action', function () {
            Navigator.positionX = 0
            const instruction = { action: actions.east, value: 6 }
            Navigator.runAction(instruction)
            expect(Navigator.positionX).to.equal(instruction.value)
        })

        it('Runs west action', function () {
            Navigator.positionX = 0
            const instruction = { action: actions.west, value: 6 }
            Navigator.runAction(instruction)
            expect(Navigator.positionX).to.equal(-instruction.value)
        })

        it('Runs forward action', function () {
            Navigator.direction = orientation.east
            const instruction = { action: actions.forward, value: 6 }
            Navigator.runAction(instruction)
            expect(Navigator.positionX).to.equal(instruction.value)
        })

        it('Runs left action', function () {
            Navigator.direction = orientation.east
            const instruction = { action: actions.left, value: 90 }
            Navigator.runAction(instruction)
            expect(Navigator.direction).to.equal(orientation.north)
        })

        it('Runs right action', function () {
            Navigator.direction = orientation.east
            const instruction = { action: actions.right, value: 90 }
            Navigator.runAction(instruction)
            expect(Navigator.direction).to.equal(orientation.south)
        })
    })

    describe('run', function () {
        let instruction1
        let instruction2
        let instruction3

        before(function () {
            instruction1 = { action: actions.east, value: 6 }
            instruction2 = { action: actions.left, value: 90 }
            instruction3 = { action: actions.forward, value: 6 }
        })

        it('Runs one instruction', function () {
            Navigator.run([instruction1])
            expect(Navigator.positionX).to.equal(instruction1.value)
        })

        it('Runs multiple instructions', function () {
            const instructions = [instruction1, instruction2, instruction3]
            Navigator.run(instructions)
            expect(Navigator.positionX).to.equal(instruction1.value)
            expect(Navigator.positionY).to.equal(instruction3.value)
            expect(Navigator.direction).to.equal(orientation.north)
        })

        it('Returns distance', function () {
            const instructions = [instruction1, instruction2, instruction3]
            const result = Navigator.run(instructions)
            expect(result.distance).to.equal(12)
        })

        it('Returns position', function () {
            const instructions = [instruction1, instruction2, instruction3]
            const result = Navigator.run(instructions)
            expect(result.position).to.have.members([6, 6])
        })

        it('Returns direction', function () {
            const instructions = [instruction1, instruction2, instruction3]
            const result = Navigator.run(instructions)
            expect(result.direction).to.equal(orientation.north)
        })
    })

    describe('Sample data', function () {
        it('Sample case 1', function () {
            const instructions = sampleData.slice(0, 1)
            const result = Navigator.run(instructions)
            expect(result.position).to.have.members([10, 0])
            expect(result.direction).to.equal(orientation.east)
        })

        it('Sample case 2', function () {
            const instructions = sampleData.slice(0, 2)
            const result = Navigator.run(instructions)
            expect(result.position).to.have.members([10, 3])
            expect(result.direction).to.equal(orientation.east)
        })

        it('Sample case 3', function () {
            const instructions = sampleData.slice(0, 3)
            const result = Navigator.run(instructions)
            expect(result.position).to.have.members([17, 3])
            expect(result.direction).to.equal(orientation.east)
        })

        it('Sample case 4', function () {
            const instructions = sampleData.slice(0, 4)
            const result = Navigator.run(instructions)
            expect(result.position).to.have.members([17, 3])
            expect(result.direction).to.equal(orientation.south)
        })

        it('Sample case 5', function () {
            const instructions = sampleData.slice(0, 5)
            const result = Navigator.run(instructions)
            expect(result.position).to.have.members([17, -8])
            expect(result.direction).to.equal(orientation.south)
        })

        it('Sample case', function () {
            const result = Navigator.run(sampleData)
            expect(result.distance).to.equal(25)
        })
    })
})
