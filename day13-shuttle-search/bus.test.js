import { expect } from 'chai'

import { findEarliestBus, findContinuousDepartureTime } from './bus'

describe('Day13 - Shuttle Search', function () {
    const sampleData1 = {
        timestamp: 939,
        busIds: [7, 13, 'x', 'x', 59, 'x', 31, 19],
    }
    const sampleData2 = {
        busIds: [17, 'x', 13, 19],
    }
    const sampleData3 = {
        busIds: [67, 7, 59, 61],
    }
    const sampleData4 = {
        busIds: [67, 'x', 7, 59, 61],
    }
    const sampleData5 = {
        busIds: [67, 7, 'x', 59, 61],
    }
    const sampleData6 = {
        busIds: [1789, 37, 47, 1889],
    }

    describe('findEarliestBus', function () {
        it('Sample case 1', function () {
            const result = findEarliestBus(
                sampleData1.timestamp,
                sampleData1.busIds
            )
            expect(result.id).to.equal(59)
            expect(result.wait).to.equal(5)
        })
    })

    describe('findContinuousDepartureTime', function () {
        it('Sample case 1', function () {
            const result = findContinuousDepartureTime(sampleData1.busIds)
            expect(result).to.equal(1068781)
        })

        it('Sample case 2', function () {
            const result = findContinuousDepartureTime(sampleData2.busIds)
            expect(result).to.equal(3417)
        })

        it('Sample case 3', function () {
            const result = findContinuousDepartureTime(sampleData3.busIds)
            expect(result).to.equal(754018)
        })

        it('Sample case 4', function () {
            const result = findContinuousDepartureTime(sampleData4.busIds)
            expect(result).to.equal(779210)
        })

        it('Sample case 5', function () {
            const result = findContinuousDepartureTime(sampleData5.busIds)
            expect(result).to.equal(1261476)
        })

        it('Sample case 6', function () {
            const result = findContinuousDepartureTime(sampleData6.busIds)
            expect(result).to.equal(1202161486)
        })
    })
})
