import { getInput } from '../utils/input'

import {
    parseShuttleData,
    findEarliestBus,
    findContinuousDepartureTime,
} from './bus'

const INPUT = getInput(import.meta.url, '\n')
const TIME_DATA = parseShuttleData(INPUT)

const part1 = () => {
    const { id, wait } = findEarliestBus(TIME_DATA.timestamp, TIME_DATA.busIds)
    const answer = id * wait
    console.log(
        `ID of the earliest bus multiplied by the number of minutes to wait for that bus is: ${answer}`
    )
}

// http://homepages.math.uic.edu/~leon/mcs425-s08/handouts/chinese_remainder.pdf
const part2 = () => {
    const timestamp = findContinuousDepartureTime(TIME_DATA.busIds)
    console.log(
        `Earliest timestamp such that all listed bus IDs depart at offsets matching positions in the list is: ${timestamp}`
    )
}

part1()
part2()
