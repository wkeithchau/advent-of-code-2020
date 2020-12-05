import { expect } from 'chai'

import { calcSeatId, decodeSeat, findSeatId } from './seat'

describe('Day05 - Binary Boarding', function () {
    const sampleData1 = 'FBFBBFFRLR'
    const sampleData2 = 'BFFFBBFRRR'
    const sampleData3 = 'FFFBBBFRRR'
    const sampleData4 = 'BBFFBBFRLL'

    const samplePos1 = { row: 44, column: 5 }
    const samplePos2 = { row: 70, column: 7 }
    const samplePos3 = { row: 14, column: 7 }
    const samplePos4 = { row: 102, column: 4 }

    const sampleSeatId1 = 357
    const sampleSeatId2 = 567
    const sampleSeatId3 = 119
    const sampleSeatId4 = 820

    describe('decodeSeat', function () {
        it('Sample case 1', function () {
            const result = decodeSeat(sampleData1)
            expect(result).to.deep.equal(samplePos1)
        })

        it('Sample case 2', function () {
            const result = decodeSeat(sampleData2)
            expect(result).to.deep.equal(samplePos2)
        })

        it('Sample case 3', function () {
            const result = decodeSeat(sampleData3)
            expect(result).to.deep.equal(samplePos3)
        })

        it('Sample case 4', function () {
            const result = decodeSeat(sampleData4)
            expect(result).to.deep.equal(samplePos4)
        })
    })

    describe('calcSeatId', function () {
        it('Sample case 1', function () {
            const result = calcSeatId(samplePos1)
            expect(result).to.deep.equal(sampleSeatId1)
        })

        it('Sample case 2', function () {
            const result = calcSeatId(samplePos2)
            expect(result).to.deep.equal(sampleSeatId2)
        })

        it('Sample case 3', function () {
            const result = calcSeatId(samplePos3)
            expect(result).to.deep.equal(sampleSeatId3)
        })

        it('Sample case 4', function () {
            const result = calcSeatId(samplePos4)
            expect(result).to.deep.equal(sampleSeatId4)
        })
    })

    describe('findSeatId', function () {
        it('ids:1-10 with missing 7', function () {
            const ids = [5, 6, 8, 4, 9, 1, 2, 3, 4]
            const result = findSeatId(ids)
            expect(result).to.equal(7)
        })
    })
})
