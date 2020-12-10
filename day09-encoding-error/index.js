import { getInput } from '../utils/input'

import {
    scanForInvalidity,
    continuousSumTotal,
    findEncryptionWeakness,
} from './xmas'

const INPUT = getInput(import.meta.url, '\n')
const DATA = INPUT.map((data) => Number(data))

const part1 = () => {
    const preambleLength = 25
    const invalidNumber = scanForInvalidity(DATA, preambleLength)

    console.log(
        `First number that is not the sum of the 25 numbers before it is: ${invalidNumber}`
    )
}

const part2 = () => {
    const preambleLength = 25
    const invalidNumber = scanForInvalidity(DATA, preambleLength)

    const subset = continuousSumTotal(DATA, invalidNumber)
    const weakness = findEncryptionWeakness(subset)
    console.log(
        `The encryption weakness in the XMAS-encrypted list is: ${weakness}`
    )
}

part1()
part2()
