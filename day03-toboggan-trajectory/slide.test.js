import { expect } from 'chai'

import { multiplyCounts, projectSlide } from './slide'

describe('Day03 - Toboggan Trajectory', function() {
    const sampleData = [
        ['.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.'],
        ['#', '.', '.', '.', '#', '.', '.', '.', '#', '.', '.'],
        ['.', '#', '.', '.', '.', '.', '#', '.', '.', '#', '.'],
        ['.', '.', '#', '.', '#', '.', '.', '.', '#', '.', '#'],
        ['.', '#', '.', '.', '.', '#', '#', '.', '.', '#', '.'],
        ['.', '.', '#', '.', '#', '#', '.', '.', '.', '.', '.'],
        ['.', '#', '.', '#', '.', '#', '.', '.', '.', '.', '#'],
        ['.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '#', '#', '.', '.', '.', '#', '.', '.', '.'],
        ['#', '.', '.', '.', '#', '#', '.', '.', '.', '.', '#'],
        ['.', '#', '.', '.', '#', '.', '.', '.', '#', '.', '#'],
    ]

    describe('projectSlide', function() {
        it('Sample case 1 - right 1 and down 1', function() {
            const result = projectSlide(sampleData, { x: 1, y: 1 })
            expect(result).to.equal(2)
        })

        it('Sample case 2 - right 3 and down 1', function() {
            const result = projectSlide(sampleData, { x: 3, y: 1 })
            expect(result).to.equal(7)
        })

        it('Sample case 3 - right 5 and down 1', function() {
            const result = projectSlide(sampleData, { x: 5, y: 1 })
            expect(result).to.equal(3)
        })

        it('Sample case 4 - right 7 and down 1', function() {
            const result = projectSlide(sampleData, { x: 7, y: 1 })
            expect(result).to.equal(4)
        })

        it('Sample case 5 - right 1 and down 2', function() {
            const result = projectSlide(sampleData, { x: 1, y: 2 })
            expect(result).to.equal(2)
        })
    })

    describe('multiplyCounts', function() {
        it('Sample case 1 - total equals 336', function() {
            const result = multiplyCounts([2, 7, 3, 4, 2])
            expect(result).to.equal(336)
        })
    })
})
