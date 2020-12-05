import { getInput } from '../utils/input'

import { decodeSeat, calcSeatId, findSeatId } from './seat'

const INPUT = getInput(import.meta.url, '\n')
const SEATS = INPUT.map((data) => data)

const part1 = () => {
    const seatIds = SEATS.map((seat) => {
        const seatPos = decodeSeat(seat)
        const seatId = calcSeatId(seatPos)
        return seatId
    })
    const highestId = Math.max(...seatIds)
    console.log(`Highest seat ID on a boarding pass is: ${highestId}`)
}

const part2 = () => {
    const seatIds = SEATS.map((seat) => {
        const seatPos = decodeSeat(seat)
        const seatId = calcSeatId(seatPos)
        return seatId
    })
    const missingId = findSeatId(seatIds)
    console.log(`My seat ID is: ${missingId}`)
}

part1()
part2()
