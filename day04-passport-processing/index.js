import { getInput } from '../utils/input'

import { parsePassports, checkPassport, validatePassport } from './passport'

const INPUT = getInput(import.meta.url, '\n')
const PASSPORTS = parsePassports(INPUT)

const part1 = () => {
    let validCount = 0
    PASSPORTS.forEach((passport) => {
        const valid = checkPassport(passport)
        if (valid === true) {
            validCount += 1
        }
    })
    console.log(`Number of valid passports in batch file is: ${validCount}`)
}

const part2 = () => {
    let validCount = 0
    PASSPORTS.forEach((passport) => {
        const valid = validatePassport(passport)
        if (valid === true) {
            validCount += 1
        }
    })
    console.log(
        `Number of valid passports with value fields in batch file is: ${validCount}`
    )
}

part1()
part2()
