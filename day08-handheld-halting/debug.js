import { operations } from './constants'

export const flipInstruction = (instruction) => {
    const { operation } = instruction
    const modifiedInstruction = { ...instruction }

    let newOp = modifiedInstruction.operation
    if (operation === operations.jmp) {
        newOp = operations.nop
    } else if (operation === operations.nop) {
        newOp = operations.jmp
    }
    modifiedInstruction.operation = newOp
    return modifiedInstruction
}
