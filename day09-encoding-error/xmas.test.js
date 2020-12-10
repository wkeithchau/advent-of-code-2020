import { expect } from 'chai'

import {
    validateXmas,
    scanForInvalidity,
    continuousSumTotal,
    findEncryptionWeakness,
} from './xmas'

describe('Day09 - Encoding Error', function () {
    const sampleData = [
        35,
        20,
        15,
        25,
        47,
        40,
        62,
        55,
        65,
        95,
        102,
        117,
        150,
        182,
        127,
        219,
        299,
        277,
        309,
        576,
    ]

    describe('validateXmas', function () {
        it('Sample case 1', function () {
            const result = validateXmas(sampleData, 14, { length: 5 })
            expect(result).to.equal(127)
        })
    })

    describe('scanForInvalidity', function () {
        it('Sample case 1', function () {
            const result = scanForInvalidity(sampleData, 5)
            expect(result).to.equal(127)
        })
    })

    describe('continuousSumTotal', function () {
        it('Sample case 1', function () {
            const result = continuousSumTotal(sampleData, 127)
            expect(result).to.have.deep.members([15, 25, 47, 40])
        })
    })

    describe('findEncryptionWeakness', function () {
        it('Sample case 1', function () {
            const result = findEncryptionWeakness([15, 25, 47, 40])
            expect(result).to.equal(62)
        })
    })
})
