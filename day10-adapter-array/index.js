import { getInput } from '../utils/input'

import { multiplyEntries } from '../day01-report-repair/sum'
import {
    findJoltageDifferences,
    collectDifferences,
    adapterArrangeCount,
} from './jolts'

const INPUT = getInput(import.meta.url, '\n')
const ADAPTERS = INPUT.map((data) => Number(data))

const part1 = () => {
    const differences = findJoltageDifferences(ADAPTERS)
    const collection = collectDifferences(differences)
    const set = [collection['1'], collection['3']]
    const multiplied = multiplyEntries(set)
    console.log(
        `1-jolt differences multiplied by 3-jolt differences is: ${multiplied}`
    )
}

const part2 = () => {
    const uniqueCount = adapterArrangeCount(ADAPTERS)
    console.log(
        `Total number of distinct adapter arrangements is: ${uniqueCount}`
    )
}

part1()
part2()
