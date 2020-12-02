import { getInput } from '../utils/input'
import { validPasswords, validPosPasswords } from './password'

const INPUT = getInput(import.meta.url, '\n')
const PASSwORDS = INPUT.map(data => {
    const [policy, password] = data.split(': ')
    const [range, letter] = policy.split(' ')
    const [lower, upper] = range.split('-')
    const rules = {
        letter: letter,
        lower: Number(lower),
        upper: Number(upper),
    }
    return [password, rules]
})

const part1 = () => {
    const valid = validPasswords(PASSwORDS)
    console.log(
        `Number of valid passwords following sled rental's policy: ${valid.length}`
    )
}

const part2 = () => {
    const valid = validPosPasswords(PASSwORDS)
    console.log(
        `Number of valid passwords following Toboggan Corporate's policy: ${valid.length}`
    )
}

part1()
part2()
