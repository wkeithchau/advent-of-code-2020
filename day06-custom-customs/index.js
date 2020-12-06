import { getInput } from '../utils/input'

import { parseGroups, countYesAnswers, countYesAllAnswers } from './questions'

const INPUT = getInput(import.meta.url, '\n')
const GROUPS = parseGroups(INPUT)

const part1 = () => {
    const groupCounts = []
    GROUPS.forEach((group) => {
        const count = countYesAnswers(group)
        groupCounts.push(count)
    })

    const totalCount = groupCounts.reduce((a, b) => a + b, 0)
    console.log(
        `The sum of answered yes in questions per group is: ${totalCount}`
    )
}

const part2 = () => {
    const groupCounts = []
    GROUPS.forEach((group) => {
        const count = countYesAllAnswers(group)
        groupCounts.push(count)
    })

    const totalCount = groupCounts.reduce((a, b) => a + b, 0)
    console.log(
        `The sum of all answering yes in questions per group is: ${totalCount}`
    )
}

part1()
part2()
