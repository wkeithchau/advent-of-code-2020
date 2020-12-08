import { getInput } from '../utils/input'

import {
    parseBagRules,
    findOuterBags,
    getNestedBag,
    calcBagCount,
} from './bags'

const INPUT = getInput(import.meta.url, '\n')
const RULES = parseBagRules(INPUT)

const part1 = () => {
    const bagTypes = findOuterBags(RULES, 'shiny gold')
    const bagCount = bagTypes.length
    console.log(
        `Number of bag colors that can eventually contain at least one shiny gold bag: ${bagCount}`
    )
}

const part2 = () => {
    const nestedBag = getNestedBag(RULES, 'shiny gold')
    const bagCount = calcBagCount(nestedBag)
    console.log(
        `Number of individual bags required inside a single shiny gold bag: ${bagCount}`
    )
}

part1()
part2()
