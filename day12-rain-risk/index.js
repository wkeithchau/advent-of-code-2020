import { getInput } from '../utils/input'

import Navigator from './navigator'
import WaypointNavigator from './waypointNavigator'

const INPUT = getInput(import.meta.url, '\n')
const INSTRUCTIONS = INPUT.map((data) => {
    const instruction = data.split('')
    const action = instruction.shift()
    const value = Number(instruction.join(''))
    return { action, value }
})

const part1 = () => {
    const { distance } = Navigator.run(INSTRUCTIONS)
    console.log(
        `The distance between that location and the ship's starting position is: ${distance}`
    )
}

const part2 = () => {
    const { distance } = WaypointNavigator.run(INSTRUCTIONS)
    console.log(
        `The distance between that location and the ship's starting position using the Waypoint Navigator is: ${distance}`
    )
}

part1()
part2()
