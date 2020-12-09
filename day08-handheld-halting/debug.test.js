import { expect } from 'chai'

import { operations } from './constants'
import { flipInstruction } from './debug'

describe('Day08 - Handheld Halting - Debug', function () {
    describe('flipInstruction', function () {
        it('Changes jmp to nop', function () {
            const instruction = { operation: operations.jmp, argument: 0 }
            const newInstruction = flipInstruction(instruction)
            expect(newInstruction).to.deep.equal({
                operation: operations.nop,
                argument: 0,
            })
        })

        it('Changes nop to jmp', function () {
            const instruction = { operation: operations.nop, argument: 0 }
            const newInstruction = flipInstruction(instruction)
            expect(newInstruction).to.deep.equal({
                operation: operations.jmp,
                argument: 0,
            })
        })

        it('Does not change acc', function () {
            const instruction = { operation: operations.acc, argument: 0 }
            const newInstruction = flipInstruction(instruction)
            expect(newInstruction).to.deep.equal(instruction)
        })
    })
})
