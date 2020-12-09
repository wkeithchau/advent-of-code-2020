import { getInput } from '../utils/input'

import { flipInstruction } from './debug'
import GameConsole from './gameConsole'

const INPUT = getInput(import.meta.url, '\n')
const INSTRUCTIONS = INPUT.map((data) => {
    let [operation, argument] = data.split(' ')
    argument = Number(argument)
    return { operation, argument }
})

const part1 = () => {
    GameConsole.load(INSTRUCTIONS)
    const accumulator = GameConsole.run()
    console.log(
        `Value is in the accumulator before any instruction is executed a second time is: ${accumulator}`
    )
}

const part2 = () => {
    let index = 0
    let end = false
    while (end === false && index < INSTRUCTIONS.length) {
        const modifiedInstructions = [...INSTRUCTIONS]
        const newInstruction = flipInstruction(modifiedInstructions[index])
        modifiedInstructions.splice(index, 1, newInstruction)

        GameConsole.load(modifiedInstructions)
        GameConsole.run()
        end = GameConsole.end
        index += 1
    }
    console.log(
        `The value of the accumulator after the program terminates is: ${GameConsole.accumulator}`
    )
}

part1()
part2()
