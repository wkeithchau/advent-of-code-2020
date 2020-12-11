import { expect } from 'chai'

import {
    findJoltageDifferences,
    collectDifferences,
    adapterArrangeCount,
} from './jolts'

describe('Day10 - Adapter Array', function () {
    const sampleData1 = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4]
    const dataDifferences1 = [1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 3, 3]
    const sampleData2 = [
        28,
        33,
        18,
        42,
        31,
        14,
        46,
        20,
        48,
        47,
        24,
        23,
        49,
        45,
        19,
        38,
        39,
        11,
        1,
        32,
        25,
        35,
        8,
        17,
        7,
        9,
        4,
        2,
        34,
        10,
        3,
    ]
    const dataDifferences2 = [
        1,
        1,
        1,
        1,
        3,
        1,
        1,
        1,
        1,
        3,
        3,
        1,
        1,
        1,
        3,
        1,
        1,
        3,
        3,
        1,
        1,
        1,
        1,
        3,
        1,
        3,
        3,
        1,
        1,
        1,
        1,
        3,
    ]

    describe('findJoltageDifferences', function () {
        it('Sample case 1', function () {
            const result = findJoltageDifferences(sampleData1)
            expect(result).to.have.members(dataDifferences1)
        })

        it('Sample case 2', function () {
            const result = findJoltageDifferences(sampleData2)
            expect(result).to.have.members(dataDifferences2)
        })
    })

    describe('collectDifferences', function () {
        it('Sample case 1', function () {
            const result = collectDifferences(dataDifferences1)
            expect(result['1']).to.equal(7)
            expect(result['3']).to.equal(5)
        })

        it('Sample case 2', function () {
            const result = collectDifferences(dataDifferences2)
            expect(result['1']).to.equal(22)
            expect(result['3']).to.equal(10)
        })
    })

    describe('adapterArrangeCount', function () {
        it('Sample case 1', function () {
            const result = adapterArrangeCount(sampleData1)
            expect(result).to.equal(8)
        })

        it('Sample case 2', function () {
            const result = adapterArrangeCount(sampleData2)
            expect(result).to.equal(19208)
        })
    })
})
