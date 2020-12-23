import { actions, orientation, orientationOffset } from './constants'

const DEGREE_INTERVAL = 90

class Navigator {
    positionX = 0
    positionY = 0
    direction = orientation.east

    distance = () => {
        const totalDistance =
            Math.abs(this.positionX) + Math.abs(this.positionY)
        return totalDistance
    }

    move = (position, offset = 0) => {
        const newPositon = (position += offset)
        return newPositon
    }

    rotate = (direction, degrees) => {
        const change = Math.round(degrees / DEGREE_INTERVAL)
        const current = orientationOffset[direction]
        const directions = Object.keys(orientationOffset)
        const offsets = Object.entries(orientationOffset)

        let newOffset = (current + change) % offsets.length
        if (newOffset < 0) {
            newOffset += offsets.length
        }
        const newDirection = directions[newOffset]
        return newDirection
    }

    runAction = (instruction) => {
        const { action, value } = instruction
        if (action === actions.north) {
            this.positionY = this.move(this.positionY, value)
        } else if (action === actions.south) {
            this.positionY = this.move(this.positionY, -value)
        } else if (action === actions.east) {
            this.positionX = this.move(this.positionX, value)
        } else if (action === actions.west) {
            this.positionX = this.move(this.positionX, -value)
        } else if (action === actions.forward) {
            this.runAction({ action: actions[this.direction], value })
        } else if (action === actions.left) {
            this.direction = this.rotate(this.direction, -value)
        } else if (action === actions.right) {
            this.direction = this.rotate(this.direction, value)
        }
    }

    run = (instructions) => {
        this.reset()

        instructions.forEach((instruction) => {
            this.runAction(instruction)
        })

        return {
            distance: this.distance(),
            position: [this.positionX, this.positionY],
            direction: this.direction,
        }
    }

    reset = () => {
        this.positionX = 0
        this.positionY = 0
        this.direction = orientation.east
    }
}

const navigator = new Navigator()
export default navigator
