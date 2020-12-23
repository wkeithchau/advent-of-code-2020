import { actions } from './constants'

const DEGREE_INTERVAL = 90
const ROTATION_STEPS = 4

class WaypointNavigator {
    shipPositionX = 0
    shipPositionY = 0
    waypointPositionX = 10
    waypointPositionY = 1

    distance = () => {
        const totalDistance =
            Math.abs(this.shipPositionX) + Math.abs(this.shipPositionY)
        return totalDistance
    }

    move = (position, offset = 0) => {
        const newPositon = (position += offset)
        return newPositon
    }

    findOffset = (degrees) => {
        const steps = Math.floor(degrees / DEGREE_INTERVAL)
        return ((steps % ROTATION_STEPS) + ROTATION_STEPS) % ROTATION_STEPS
    }

    rotate = (position, degrees) => {
        const [positionX, positionY] = position
        const offset = this.findOffset(degrees)

        let newPositionX = positionX
        let newPositionY = positionY
        if (offset === 1) {
            newPositionX = positionY
            newPositionY = -positionX
        } else if (offset === 2) {
            newPositionX = -positionX
            newPositionY = -positionY
        } else if (offset === 3) {
            newPositionX = -positionY
            newPositionY = positionX
        }
        return [newPositionX, newPositionY]
    }

    runAction = (instruction) => {
        const { action, value } = instruction
        if (action === actions.north) {
            this.waypointPositionY = this.move(this.waypointPositionY, value)
        } else if (action === actions.south) {
            this.waypointPositionY = this.move(this.waypointPositionY, -value)
        } else if (action === actions.east) {
            this.waypointPositionX = this.move(this.waypointPositionX, value)
        } else if (action === actions.west) {
            this.waypointPositionX = this.move(this.waypointPositionX, -value)
        } else if (action === actions.forward) {
            const offsetX = this.waypointPositionX * value
            const offsetY = this.waypointPositionY * value
            this.shipPositionX += offsetX
            this.shipPositionY += offsetY
        } else if (action === actions.left) {
            const newPosition = this.rotate(
                [this.waypointPositionX, this.waypointPositionY],
                -value
            )
            this.waypointPositionX = newPosition[0]
            this.waypointPositionY = newPosition[1]
        } else if (action === actions.right) {
            const newPosition = this.rotate(
                [this.waypointPositionX, this.waypointPositionY],
                value
            )
            this.waypointPositionX = newPosition[0]
            this.waypointPositionY = newPosition[1]
        }
    }

    run = (instructions) => {
        this.reset()

        instructions.forEach((instruction) => {
            this.runAction(instruction)
        })

        return {
            distance: this.distance(),
            ship: [this.shipPositionX, this.shipPositionY],
            waypoint: [this.waypointPositionX, this.waypointPositionY],
        }
    }

    reset = () => {
        this.shipPositionX = 0
        this.shipPositionY = 0
        this.waypointPositionX = 10
        this.waypointPositionY = 1
    }
}

const navigator = new WaypointNavigator()
export default navigator
