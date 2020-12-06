import { expect } from 'chai'

import { parseGroups, countYesAnswers, countYesAllAnswers } from './questions'

describe('Day06 - Custom Customs', function () {
    const sampleInput = [
        'abc',
        '',
        'a',
        'b',
        'c',
        '',
        'ab',
        'ac',
        '',
        'a',
        'a',
        'a',
        'a',
        '',
        'b',
    ]
    const sampleGroups = [
        ['abc'],
        ['a', 'b', 'c'],
        ['ab', 'ac'],
        ['a', 'a', 'a', 'a'],
        ['b'],
    ]
    const sampleGroup = ['abcx', 'abcy', 'abcz']

    describe('parseGroups', function () {
        it('Sample case 1', function () {
            const result = parseGroups(sampleInput)
            expect(result).to.have.deep.members(sampleGroups)
        })
    })

    describe('countYesAnswers', function () {
        it('Sample case 1', function () {
            const result = countYesAnswers(sampleGroup)
            expect(result).to.equal(6)
        })

        it('Sample case 2', function () {
            const result = countYesAnswers(sampleGroups[0])
            expect(result).to.equal(3)
        })

        it('Sample case 3', function () {
            const result = countYesAnswers(sampleGroups[1])
            expect(result).to.equal(3)
        })

        it('Sample case 4', function () {
            const result = countYesAnswers(sampleGroups[2])
            expect(result).to.equal(3)
        })

        it('Sample case 5', function () {
            const result = countYesAnswers(sampleGroups[3])
            expect(result).to.equal(1)
        })

        it('Sample case 6', function () {
            const result = countYesAnswers(sampleGroups[4])
            expect(result).to.equal(1)
        })
    })

    describe('countYesAllAnswers', function () {
        it('Sample case 1', function () {
            const result = countYesAllAnswers(sampleGroup)
            expect(result).to.equal(3)
        })

        it('Sample case 2', function () {
            const result = countYesAllAnswers(sampleGroups[0])
            expect(result).to.equal(3)
        })

        it('Sample case 3', function () {
            const result = countYesAllAnswers(sampleGroups[1])
            expect(result).to.equal(0)
        })

        it('Sample case 4', function () {
            const result = countYesAllAnswers(sampleGroups[2])
            expect(result).to.equal(1)
        })

        it('Sample case 5', function () {
            const result = countYesAllAnswers(sampleGroups[3])
            expect(result).to.equal(1)
        })

        it('Sample case 6', function () {
            const result = countYesAllAnswers(sampleGroups[4])
            expect(result).to.equal(1)
        })
    })
})
