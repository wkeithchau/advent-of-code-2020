import { expect } from 'chai'

import {
    applyMask,
    sumMemoryValues,
    initProgram,
    applyMaskV2,
    initMemoryAdressDecoder,
} from './bitmask'
import { types } from './constants'

describe('Day14 - Docking Data', function () {
    let sampleData1
    let sampleData1Sum
    let sampleData2
    let sampleData2Sum

    before(function () {
        sampleData1 = [
            { type: types.mask, value: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X' },
            { type: types.mem, value: 11, address: 8 },
            { type: types.mem, value: 101, address: 7 },
            { type: types.mem, value: 0, address: 8 },
        ]
        sampleData1Sum = 165
        sampleData2 = [
            { type: types.mask, value: '000000000000000000000000000000X1001X' },
            { type: types.mem, value: 100, address: 42 },
            { type: types.mask, value: '00000000000000000000000000000000X0XX' },
            { type: types.mem, value: 1, address: 26 },
        ]
        sampleData2Sum = 208
    })

    describe('applyMask', function () {
        let mask

        before(function () {
            mask = sampleData1[0].value
        })

        it('Sample case 1', function () {
            const value = sampleData1[1].value
            const result = applyMask(value, mask)
            expect(result).to.equal(73)
        })

        it('Sample case 2', function () {
            const value = sampleData1[2].value
            const result = applyMask(value, mask)
            expect(result).to.equal(101)
        })

        it('Sample case 3', function () {
            const value = sampleData1[3].value
            const result = applyMask(value, mask)
            expect(result).to.equal(64)
        })
    })

    describe('initProgram', function () {
        it('Sample case 1', function () {
            const memory = initProgram(sampleData1)
            const sum = sumMemoryValues(memory)
            expect(sum).to.equal(sampleData1Sum)
        })
    })

    describe('applyMaskV2', function () {
        it('Sample case 1', function () {
            const mask = sampleData2[0].value
            const value = sampleData2[1].address
            const result = applyMaskV2(value, mask)
            expect(result).to.have.members([26, 27, 58, 59])
        })

        it('Sample case 2', function () {
            const mask = sampleData2[2].value
            const value = sampleData2[3].address
            const result = applyMaskV2(value, mask)
            expect(result).to.have.members([16, 17, 18, 19, 24, 25, 26, 27])
        })
    })

    describe('initMemoryAdressDecoder', function () {
        it('Sample case 1', function () {
            const memory = initMemoryAdressDecoder(sampleData2)
            const sum = sumMemoryValues(memory)
            expect(sum).to.equal(sampleData2Sum)
        })
    })
})
