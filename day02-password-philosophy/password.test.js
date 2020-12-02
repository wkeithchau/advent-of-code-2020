import { expect } from 'chai'
import { validPasswords, validPosPasswords } from './password'

describe('Day02 - Password Philosophy', function() {
    const sampleData = [
        ['abcde', { letter: 'a', lower: 1, upper: 3 }],
        ['cdefg', { letter: 'b', lower: 1, upper: 3 }],
        ['ccccccccc', { letter: 'c', lower: 2, upper: 9 }],
    ]
    describe('validPasswords', function() {
        it('Sample case 1', function() {
            const valid = validPasswords(sampleData)
            expect(valid).to.have.members(['abcde', 'ccccccccc'])
        })
    })

    describe('validPosPasswords', function() {
        it('Sample case 1', function() {
            const valid = validPosPasswords(sampleData)
            expect(valid).to.have.members(['abcde'])
        })
    })
})
