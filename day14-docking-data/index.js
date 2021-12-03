import { getInput } from '../utils/input'
import {
    parseBitmaskData,
    sumMemoryValues,
    initProgram,
    initMemoryAdressDecoder,
} from './bitmask'

const INPUT = getInput(import.meta.url, '\n')
const PROGRAM = parseBitmaskData(INPUT)

const part1 = () => {
    const memory = initProgram(PROGRAM)
    const sum = sumMemoryValues(memory)
    console.log(
        `The sum of all values left in memory after initializing the program is: ${sum}`
    )
}

const part2 = () => {
    const memory = initMemoryAdressDecoder(PROGRAM)
    const sum = sumMemoryValues(memory)
    console.log(
        `The sum of all values left in memory after initializing the decoder is: ${sum}`
    )
}

part1()
part2()
