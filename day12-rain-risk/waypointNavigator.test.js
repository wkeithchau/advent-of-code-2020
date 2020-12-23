import { expect } from 'chai'

import { actions } from './constants'
import WaypointNavigator from './waypointNavigator'

describe('Day12 - Rain Risk - Waypoint Navigator', function () {
    const sampleData = [
        { action: 'F', value: 10 },
        { action: 'N', value: 3 },
        { action: 'F', value: 7 },
        { action: 'R', value: 90 },
        { action: 'F', value: 11 },
    ]

    beforeEach(function () {
        WaypointNavigator.reset()
    })

    after(function () {
        WaypointNavigator.reset()
    })

    describe('distance', function () {
        it('Calculate positive x and positive y', function () {
            WaypointNavigator.shipPositionX = 5
            WaypointNavigator.shipPositionY = 4
            const result = WaypointNavigator.distance()
            expect(result).to.equal(9)
        })

        it('Calculate negative x and positive y', function () {
            WaypointNavigator.shipPositionX = -5
            WaypointNavigator.shipPositionY = 4
            const result = WaypointNavigator.distance()
            expect(result).to.equal(9)
        })

        it('Calculate positive x and negative y', function () {
            WaypointNavigator.shipPositionX = 5
            WaypointNavigator.shipPositionY = -4
            const result = WaypointNavigator.distance()
            expect(result).to.equal(9)
        })

        it('Calculate negative x and negative y', function () {
            WaypointNavigator.shipPositionX = -5
            WaypointNavigator.shipPositionY = -4
            const result = WaypointNavigator.distance()
            expect(result).to.equal(9)
        })
    })

    describe('move', function () {
        it('Moves position positively', function () {
            const offset = 4
            const result = WaypointNavigator.move(0, offset)
            expect(result).to.equal(offset)
        })

        it('Moves position negatively', function () {
            const offset = -2
            const result = WaypointNavigator.move(0, offset)
            expect(result).to.equal(offset)
        })
    })

    describe('findOffset', function () {
        it('Rotate clockwise 90', function () {
            const result = WaypointNavigator.findOffset(90)
            expect(result).to.equal(1)
        })

        it('Rotate clockwise 180', function () {
            const result = WaypointNavigator.findOffset(180)
            expect(result).to.equal(2)
        })

        it('Rotate clockwise 270', function () {
            const result = WaypointNavigator.findOffset(270)
            expect(result).to.equal(3)
        })

        it('Rotate clockwise 360', function () {
            const result = WaypointNavigator.findOffset(360)
            expect(result).to.equal(0)
        })

        it('Rotate counter clockwise 90', function () {
            const result = WaypointNavigator.findOffset(-90)
            expect(result).to.equal(3)
        })

        it('Rotate counter clockwise 180', function () {
            const result = WaypointNavigator.findOffset(-180)
            expect(result).to.equal(2)
        })

        it('Rotate counter clockwise 270', function () {
            const result = WaypointNavigator.findOffset(-270)
            expect(result).to.equal(1)
        })
    })

    describe('rotate', function () {
        describe('Starting north-east', function () {
            it('x of 10 and y of 1 with 90 degrees', function () {
                const position = [10, 1]
                const result = WaypointNavigator.rotate(position, 90)
                expect(result).to.have.members([1, -10])
            })

            it('x of 10 and y of 1 with 180 degrees', function () {
                const position = [10, 1]
                const result = WaypointNavigator.rotate(position, 180)
                expect(result).to.have.members([-10, -1])
            })

            it('x of 10 and y of 1 with 270 degrees', function () {
                const position = [10, 1]
                const result = WaypointNavigator.rotate(position, 270)
                expect(result).to.have.members([-1, 10])
            })

            it('x of 10 and y of 1 with 360 degrees', function () {
                const position = [10, 1]
                const result = WaypointNavigator.rotate(position, 360)
                expect(result).to.have.members([10, 1])
            })

            it('x of 10 and y of 1 with -90 degrees', function () {
                const position = [10, 1]
                const result = WaypointNavigator.rotate(position, -90)
                expect(result).to.have.members([-1, 10])
            })

            it('x of 10 and y of 1 with -180 degrees', function () {
                const position = [10, 1]
                const result = WaypointNavigator.rotate(position, -180)
                expect(result).to.have.members([-10, -1])
            })

            it('x of 10 and y of 1 with -270 degrees', function () {
                const position = [10, 1]
                const result = WaypointNavigator.rotate(position, -270)
                expect(result).to.have.members([1, -10])
            })

            it('x of 10 and y of 1 with -360 degrees', function () {
                const position = [10, 1]
                const result = WaypointNavigator.rotate(position, -360)
                expect(result).to.have.members([10, 1])
            })
        })

        describe('Starting south-east', function () {
            it('x of 1 and y of -10 with 90 degrees', function () {
                const position = [1, -10]
                const result = WaypointNavigator.rotate(position, 90)
                expect(result).to.have.members([-10, -1])
            })

            it('x of 1 and y of -10 with 180 degrees', function () {
                const position = [1, -10]
                const result = WaypointNavigator.rotate(position, 180)
                expect(result).to.have.members([-1, 10])
            })

            it('x of 1 and y of -10 with 270 degrees', function () {
                const position = [1, -10]
                const result = WaypointNavigator.rotate(position, 270)
                expect(result).to.have.members([10, 1])
            })

            it('x of 1 and y of -10 with 360 degrees', function () {
                const position = [1, -10]
                const result = WaypointNavigator.rotate(position, 360)
                expect(result).to.have.members([1, -10])
            })

            it('x of 1 and y of -10 with -90 degrees', function () {
                const position = [1, -10]
                const result = WaypointNavigator.rotate(position, -90)
                expect(result).to.have.members([10, 1])
            })

            it('x of 1 and y of -10 with -180 degrees', function () {
                const position = [1, -10]
                const result = WaypointNavigator.rotate(position, -180)
                expect(result).to.have.members([-1, 10])
            })

            it('x of 1 and y of -10 with -270 degrees', function () {
                const position = [1, -10]
                const result = WaypointNavigator.rotate(position, -270)
                expect(result).to.have.members([-10, -1])
            })

            it('x of 1 and y of -10 with -360 degrees', function () {
                const position = [1, -10]
                const result = WaypointNavigator.rotate(position, -360)
                expect(result).to.have.members([1, -10])
            })
        })

        describe('Starting south-west', function () {
            it('x of -1 and y of -10 with 90 degrees', function () {
                const position = [-1, -10]
                const result = WaypointNavigator.rotate(position, 90)
                expect(result).to.have.members([-10, 1])
            })

            it('x of -1 and y of -10 with 180 degrees', function () {
                const position = [-1, -10]
                const result = WaypointNavigator.rotate(position, 180)
                expect(result).to.have.members([1, 10])
            })

            it('x of -1 and y of -10 with 270 degrees', function () {
                const position = [-1, -10]
                const result = WaypointNavigator.rotate(position, 270)
                expect(result).to.have.members([10, -1])
            })

            it('x of -1 and y of -10 with 360 degrees', function () {
                const position = [-1, -10]
                const result = WaypointNavigator.rotate(position, 360)
                expect(result).to.have.members([-1, -10])
            })

            it('x of -1 and y of -10 with -90 degrees', function () {
                const position = [-1, -10]
                const result = WaypointNavigator.rotate(position, -90)
                expect(result).to.have.members([10, -1])
            })

            it('x of -1 and y of -10 with -180 degrees', function () {
                const position = [-1, -10]
                const result = WaypointNavigator.rotate(position, -180)
                expect(result).to.have.members([1, 10])
            })

            it('x of -1 and y of -10 with -270 degrees', function () {
                const position = [-1, -10]
                const result = WaypointNavigator.rotate(position, -270)
                expect(result).to.have.members([-10, 1])
            })

            it('x of -1 and y of -10 with -360 degrees', function () {
                const position = [-1, -10]
                const result = WaypointNavigator.rotate(position, -360)
                expect(result).to.have.members([-1, -10])
            })
        })

        describe('Starting north-west', function () {
            it('x of -1 and y of 10 with 90 degrees', function () {
                const position = [-1, 10]
                const result = WaypointNavigator.rotate(position, 90)
                expect(result).to.have.members([10, 1])
            })

            it('x of -1 and y of 10 with 180 degrees', function () {
                const position = [-1, 10]
                const result = WaypointNavigator.rotate(position, 180)
                expect(result).to.have.members([1, -10])
            })

            it('x of -1 and y of 10 with 270 degrees', function () {
                const position = [-1, 10]
                const result = WaypointNavigator.rotate(position, 270)
                expect(result).to.have.members([-10, -1])
            })

            it('x of -1 and y of 10 with 360 degrees', function () {
                const position = [-1, 10]
                const result = WaypointNavigator.rotate(position, 360)
                expect(result).to.have.members([-1, 10])
            })

            it('x of -1 and y of 10 with -90 degrees', function () {
                const position = [-1, 10]
                const result = WaypointNavigator.rotate(position, -90)
                expect(result).to.have.members([-10, -1])
            })

            it('x of -1 and y of 10 with -180 degrees', function () {
                const position = [-1, 10]
                const result = WaypointNavigator.rotate(position, -180)
                expect(result).to.have.members([1, -10])
            })

            it('x of -1 and y of 10 with -270 degrees', function () {
                const position = [-1, 10]
                const result = WaypointNavigator.rotate(position, -270)
                expect(result).to.have.members([10, 1])
            })

            it('x of -1 and y of 10 with -360 degrees', function () {
                const position = [-1, 10]
                const result = WaypointNavigator.rotate(position, -360)
                expect(result).to.have.members([-1, 10])
            })
        })
    })

    describe('runAction', function () {
        it('Runs north action', function () {
            WaypointNavigator.waypointPositionY = 0
            const instruction = { action: actions.north, value: 6 }
            WaypointNavigator.runAction(instruction)
            expect(WaypointNavigator.waypointPositionY).to.equal(
                instruction.value
            )
        })

        it('Runs south action', function () {
            WaypointNavigator.waypointPositionY = 0
            const instruction = { action: actions.south, value: 6 }
            WaypointNavigator.runAction(instruction)
            expect(WaypointNavigator.waypointPositionY).to.equal(
                -instruction.value
            )
        })

        it('Runs east action', function () {
            WaypointNavigator.waypointPositionX = 0
            const instruction = { action: actions.east, value: 6 }
            WaypointNavigator.runAction(instruction)
            expect(WaypointNavigator.waypointPositionX).to.equal(
                instruction.value
            )
        })

        it('Runs west action', function () {
            WaypointNavigator.waypointPositionX = 0
            const instruction = { action: actions.west, value: 6 }
            WaypointNavigator.runAction(instruction)
            expect(WaypointNavigator.waypointPositionX).to.equal(
                -instruction.value
            )
        })

        it('Runs forward action', function () {
            WaypointNavigator.shipPositionX = 0
            WaypointNavigator.shipPositionY = 0
            WaypointNavigator.waypointPositionX = 2
            WaypointNavigator.waypointPositionY = 3
            const instruction = { action: actions.forward, value: 2 }
            WaypointNavigator.runAction(instruction)
            const posX = instruction.value * WaypointNavigator.waypointPositionX
            const posY = instruction.value * WaypointNavigator.waypointPositionY
            expect(WaypointNavigator.shipPositionX).to.equal(posX)
            expect(WaypointNavigator.shipPositionY).to.equal(posY)
        })

        it('Runs left action', function () {
            WaypointNavigator.waypointPositionX = 2
            WaypointNavigator.waypointPositionY = 3
            const instruction = { action: actions.left, value: 90 }
            WaypointNavigator.runAction(instruction)
            expect(WaypointNavigator.waypointPositionX).to.equal(-3)
            expect(WaypointNavigator.waypointPositionY).to.equal(2)
        })

        it('Runs right action', function () {
            WaypointNavigator.waypointPositionX = 2
            WaypointNavigator.waypointPositionY = 3
            const instruction = { action: actions.right, value: 90 }
            WaypointNavigator.runAction(instruction)
            expect(WaypointNavigator.waypointPositionX).to.equal(3)
            expect(WaypointNavigator.waypointPositionY).to.equal(-2)
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
            WaypointNavigator.run([instruction1])
            expect(WaypointNavigator.waypointPositionX).to.equal(16)
        })

        it('Runs multiple instructions', function () {
            const instructions = [instruction1, instruction2, instruction3]
            WaypointNavigator.run(instructions)
            expect(WaypointNavigator.shipPositionX).to.equal(-6)
            expect(WaypointNavigator.shipPositionY).to.equal(96)
            expect(WaypointNavigator.waypointPositionX).to.equal(-1)
            expect(WaypointNavigator.waypointPositionY).to.equal(16)
        })

        it('Returns distance', function () {
            const instructions = [instruction1, instruction2, instruction3]
            const result = WaypointNavigator.run(instructions)
            expect(result.distance).to.equal(102)
        })

        it('Returns ship position', function () {
            const instructions = [instruction1, instruction2, instruction3]
            const result = WaypointNavigator.run(instructions)
            expect(result.ship).to.have.members([-6, 96])
        })

        it('Returns waypoint position', function () {
            const instructions = [instruction1, instruction2, instruction3]
            const result = WaypointNavigator.run(instructions)
            expect(result.waypoint).to.have.members([-1, 16])
        })
    })

    describe('Sample data', function () {
        it('Sample case 1', function () {
            const instructions = sampleData.slice(0, 1)
            const result = WaypointNavigator.run(instructions)
            expect(result.ship).to.have.members([100, 10])
            expect(result.waypoint).to.have.members([10, 1])
        })

        it('Sample case 2', function () {
            const instructions = sampleData.slice(0, 2)
            const result = WaypointNavigator.run(instructions)
            expect(result.ship).to.have.members([100, 10])
            expect(result.waypoint).to.have.members([10, 4])
        })

        it('Sample case 3', function () {
            const instructions = sampleData.slice(0, 3)
            const result = WaypointNavigator.run(instructions)
            expect(result.ship).to.have.members([170, 38])
            expect(result.waypoint).to.have.members([10, 4])
        })

        it('Sample case 4', function () {
            const instructions = sampleData.slice(0, 4)
            const result = WaypointNavigator.run(instructions)
            expect(result.ship).to.have.members([170, 38])
            expect(result.waypoint).to.have.members([4, -10])
        })

        it('Sample case 5', function () {
            const instructions = sampleData.slice(0, 5)
            const result = WaypointNavigator.run(instructions)
            expect(result.ship).to.have.members([214, -72])
            expect(result.waypoint).to.have.members([4, -10])
        })

        it('Sample case', function () {
            const result = WaypointNavigator.run(sampleData)
            expect(result.distance).to.equal(286)
        })
    })
})
