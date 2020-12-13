import { getInput } from '../utils/input'

import { occupiedTypes } from './constants'
import { applyRules, countOccupiedSeats } from './seats'

const INPUT = getInput(import.meta.url, '\n')
const SEATS = INPUT.map((data) => data.split(''))

const part1 = () => {
    const stablisedSeats = applyRules(SEATS, { equilibrium: true })
    const count = countOccupiedSeats(stablisedSeats)
    console.log(`Number of seats that end up occupied is: ${count}`)
}

const part2 = () => {
    const stablisedSeats = applyRules(SEATS, {
        type: occupiedTypes.visible,
        threshold: 5,
        equilibrium: true,
    })
    const count = countOccupiedSeats(stablisedSeats)
    console.log(
        `Number of seats that end up occupied when checked with visible occupancy is: ${count}`
    )
}

part1()
part2()
