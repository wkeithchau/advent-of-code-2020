import { expect } from 'chai'
import { threeSumTo, multiplyEntries, sumTo } from './sum'

describe('Day01 - Report Repair', function() {
    const sampleData = [1721, 979, 366, 299, 675, 1456]

    describe('sumTo', function() {
        it('Sample test case 1', function() {
            const result = sumTo(sampleData)
            expect(result).to.have.members([1721, 299])
        })
    })

    describe('threeSumTo', function() {
        it('Sample test case 1', function() {
            const result = threeSumTo(sampleData)
            expect(result).to.have.members([979, 366, 675])
        })
    })

    describe('multiplyEntries', function() {
        it('Sample test case 1', function() {
            const result = multiplyEntries([1721, 299])
            expect(result).to.equal(514579)
        })

        it('Sample test case 2', function() {
            const result = multiplyEntries([979, 366, 675])
            expect(result).to.equal(241861950)
        })
    })
})
