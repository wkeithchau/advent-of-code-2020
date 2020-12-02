import { getInput } from '../utils/input'
import { threeSumTo, sumTo, multiplyEntries } from './sum'

const INPUT = getInput(import.meta.url, '\n')
const EXPENSE_REPORT = INPUT.map(data => Number(data))

const part1 = () => {
    const entries = sumTo(EXPENSE_REPORT)
    const multiplied = multiplyEntries(entries)
    console.log(
        `The 2 entries that sum to 2020 are: ${entries} and multiplied together they equal to ${multiplied}`
    )
}

const part2 = () => {
    const entries = threeSumTo(EXPENSE_REPORT)
    const multiplied = multiplyEntries(entries)
    console.log(
        `The 3 entries that sum to 2020 are: ${entries} and multiplied together they equal to ${multiplied}`
    )
}

part1()
part2()
