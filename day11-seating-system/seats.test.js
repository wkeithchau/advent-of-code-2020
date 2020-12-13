import { expect } from 'chai'

import { occupiedTypes } from './constants'
import { applyRules, countOccupiedSeats } from './seats'

describe('Day11 - Seating System', function () {
    const sampleData = [
        ['L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
        ['L', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
        ['L', '.', 'L', '.', 'L', '.', '.', 'L', '.', '.'],
        ['L', 'L', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
        ['L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
        ['L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
        ['.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.'],
        ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'],
        ['L', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L'],
        ['L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
    ]
    const round1 = [
        ['#', '.', '#', '#', '.', '#', '#', '.', '#', '#'],
        ['#', '#', '#', '#', '#', '#', '#', '.', '#', '#'],
        ['#', '.', '#', '.', '#', '.', '.', '#', '.', '.'],
        ['#', '#', '#', '#', '.', '#', '#', '.', '#', '#'],
        ['#', '.', '#', '#', '.', '#', '#', '.', '#', '#'],
        ['#', '.', '#', '#', '#', '#', '#', '.', '#', '#'],
        ['.', '.', '#', '.', '#', '.', '.', '.', '.', '.'],
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
        ['#', '.', '#', '#', '#', '#', '#', '#', '.', '#'],
        ['#', '.', '#', '#', '#', '#', '#', '.', '#', '#'],
    ]
    const round2 = [
        ['#', '.', 'L', 'L', '.', 'L', '#', '.', '#', '#'],
        ['#', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', '#'],
        ['L', '.', 'L', '.', 'L', '.', '.', 'L', '.', '.'],
        ['#', 'L', 'L', 'L', '.', 'L', 'L', '.', 'L', '#'],
        ['#', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
        ['#', '.', 'L', 'L', 'L', 'L', '#', '.', '#', '#'],
        ['.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.'],
        ['#', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', '#'],
        ['#', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L'],
        ['#', '.', '#', 'L', 'L', 'L', 'L', '.', '#', '#'],
    ]
    const round3 = [
        ['#', '.', '#', '#', '.', 'L', '#', '.', '#', '#'],
        ['#', 'L', '#', '#', '#', 'L', 'L', '.', 'L', '#'],
        ['L', '.', '#', '.', '#', '.', '.', '#', '.', '.'],
        ['#', 'L', '#', '#', '.', '#', '#', '.', 'L', '#'],
        ['#', '.', '#', '#', '.', 'L', 'L', '.', 'L', 'L'],
        ['#', '.', '#', '#', '#', 'L', '#', '.', '#', '#'],
        ['.', '.', '#', '.', '#', '.', '.', '.', '.', '.'],
        ['#', 'L', '#', '#', '#', '#', '#', '#', 'L', '#'],
        ['#', '.', 'L', 'L', '#', '#', '#', 'L', '.', 'L'],
        ['#', '.', '#', 'L', '#', '#', '#', '.', '#', '#'],
    ]
    const round4 = [
        ['#', '.', '#', 'L', '.', 'L', '#', '.', '#', '#'],
        ['#', 'L', 'L', 'L', '#', 'L', 'L', '.', 'L', '#'],
        ['L', '.', 'L', '.', 'L', '.', '.', '#', '.', '.'],
        ['#', 'L', 'L', 'L', '.', '#', '#', '.', 'L', '#'],
        ['#', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
        ['#', '.', 'L', 'L', '#', 'L', '#', '.', '#', '#'],
        ['.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.'],
        ['#', 'L', '#', 'L', 'L', 'L', 'L', '#', 'L', '#'],
        ['#', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L'],
        ['#', '.', '#', 'L', '#', 'L', '#', '.', '#', '#'],
    ]
    const round5 = [
        ['#', '.', '#', 'L', '.', 'L', '#', '.', '#', '#'],
        ['#', 'L', 'L', 'L', '#', 'L', 'L', '.', 'L', '#'],
        ['L', '.', '#', '.', 'L', '.', '.', '#', '.', '.'],
        ['#', 'L', '#', '#', '.', '#', '#', '.', 'L', '#'],
        ['#', '.', '#', 'L', '.', 'L', 'L', '.', 'L', 'L'],
        ['#', '.', '#', 'L', '#', 'L', '#', '.', '#', '#'],
        ['.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.'],
        ['#', 'L', '#', 'L', '#', '#', 'L', '#', 'L', '#'],
        ['#', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L'],
        ['#', '.', '#', 'L', '#', 'L', '#', '.', '#', '#'],
    ]

    const visibleRound1 = [
        ['#', '.', '#', '#', '.', '#', '#', '.', '#', '#'],
        ['#', '#', '#', '#', '#', '#', '#', '.', '#', '#'],
        ['#', '.', '#', '.', '#', '.', '.', '#', '.', '.'],
        ['#', '#', '#', '#', '.', '#', '#', '.', '#', '#'],
        ['#', '.', '#', '#', '.', '#', '#', '.', '#', '#'],
        ['#', '.', '#', '#', '#', '#', '#', '.', '#', '#'],
        ['.', '.', '#', '.', '#', '.', '.', '.', '.', '.'],
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
        ['#', '.', '#', '#', '#', '#', '#', '#', '.', '#'],
        ['#', '.', '#', '#', '#', '#', '#', '.', '#', '#'],
    ]
    const visibleRound2 = [
        ['#', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', '#'],
        ['#', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
        ['L', '.', 'L', '.', 'L', '.', '.', 'L', '.', '.'],
        ['L', 'L', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
        ['L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
        ['L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
        ['.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.'],
        ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', '#'],
        ['#', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L'],
        ['#', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', '#'],
    ]
    const visibleRound3 = [
        ['#', '.', 'L', '#', '.', '#', '#', '.', 'L', '#'],
        ['#', 'L', '#', '#', '#', '#', '#', '.', 'L', 'L'],
        ['L', '.', '#', '.', '#', '.', '.', '#', '.', '.'],
        ['#', '#', 'L', '#', '.', '#', '#', '.', '#', '#'],
        ['#', '.', '#', '#', '.', '#', 'L', '.', '#', '#'],
        ['#', '.', '#', '#', '#', '#', '#', '.', '#', 'L'],
        ['.', '.', '#', '.', '#', '.', '.', '.', '.', '.'],
        ['L', 'L', 'L', '#', '#', '#', '#', 'L', 'L', '#'],
        ['#', '.', 'L', '#', '#', '#', '#', '#', '.', 'L'],
        ['#', '.', 'L', '#', '#', '#', '#', '.', 'L', '#'],
    ]
    const visibleRound4 = [
        ['#', '.', 'L', '#', '.', 'L', '#', '.', 'L', '#'],
        ['#', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
        ['L', '.', 'L', '.', 'L', '.', '.', '#', '.', '.'],
        ['#', '#', 'L', 'L', '.', 'L', 'L', '.', 'L', '#'],
        ['L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', '#'],
        ['#', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
        ['.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.'],
        ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', '#'],
        ['#', '.', 'L', 'L', 'L', 'L', 'L', '#', '.', 'L'],
        ['#', '.', 'L', '#', 'L', 'L', '#', '.', 'L', '#'],
    ]
    const visibleRound5 = [
        ['#', '.', 'L', '#', '.', 'L', '#', '.', 'L', '#'],
        ['#', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
        ['L', '.', 'L', '.', 'L', '.', '.', '#', '.', '.'],
        ['#', '#', 'L', '#', '.', '#', 'L', '.', 'L', '#'],
        ['L', '.', 'L', '#', '.', '#', 'L', '.', 'L', '#'],
        ['#', '.', 'L', '#', '#', '#', '#', '.', 'L', 'L'],
        ['.', '.', '#', '.', '#', '.', '.', '.', '.', '.'],
        ['L', 'L', 'L', '#', '#', '#', 'L', 'L', 'L', '#'],
        ['#', '.', 'L', 'L', 'L', 'L', 'L', '#', '.', 'L'],
        ['#', '.', 'L', '#', 'L', 'L', '#', '.', 'L', '#'],
    ]
    const visibleRound6 = [
        ['#', '.', 'L', '#', '.', 'L', '#', '.', 'L', '#'],
        ['#', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
        ['L', '.', 'L', '.', 'L', '.', '.', '#', '.', '.'],
        ['#', '#', 'L', '#', '.', '#', 'L', '.', 'L', '#'],
        ['L', '.', 'L', '#', '.', 'L', 'L', '.', 'L', '#'],
        ['#', '.', 'L', 'L', 'L', 'L', '#', '.', 'L', 'L'],
        ['.', '.', '#', '.', 'L', '.', '.', '.', '.', '.'],
        ['L', 'L', 'L', '#', '#', '#', 'L', 'L', 'L', '#'],
        ['#', '.', 'L', 'L', 'L', 'L', 'L', '#', '.', 'L'],
        ['#', '.', 'L', '#', 'L', 'L', '#', '.', 'L', '#'],
    ]

    describe('applyRules', function () {
        describe('Adjacent occupancy with threshold of 4', function () {
            it('Sample case 1', function () {
                const result = applyRules(sampleData)
                expect(result).to.have.deep.members(round1)
            })

            it('Sample case 2', function () {
                const result = applyRules(round1)
                expect(result).to.have.deep.members(round2)
            })

            it('Sample case 3', function () {
                const result = applyRules(round2)
                expect(result).to.have.deep.members(round3)
            })

            it('Sample case 4', function () {
                const result = applyRules(round3)
                expect(result).to.have.deep.members(round4)
            })

            it('Sample case 5', function () {
                const result = applyRules(round4)
                expect(result).to.have.deep.members(round5)
            })

            it('Until steady', function () {
                const result = applyRules(sampleData, { equilibrium: true })
                expect(result).to.have.deep.members(round5)
            })
        })

        describe('Visible occupancy with threshold of 5', function () {
            it('Sample case 1', function () {
                const result = applyRules(sampleData, {
                    type: occupiedTypes.visible,
                    threshold: 5,
                })
                expect(result).to.have.deep.members(visibleRound1)
            })

            it('Sample case 2', function () {
                const result = applyRules(visibleRound1, {
                    type: occupiedTypes.visible,
                    threshold: 5,
                })
                expect(result).to.have.deep.members(visibleRound2)
            })

            it('Sample case 3', function () {
                const result = applyRules(visibleRound2, {
                    type: occupiedTypes.visible,
                    threshold: 5,
                })
                expect(result).to.have.deep.members(visibleRound3)
            })

            it('Sample case 4', function () {
                const result = applyRules(visibleRound3, {
                    type: occupiedTypes.visible,
                    threshold: 5,
                })
                expect(result).to.have.deep.members(visibleRound4)
            })

            it('Sample case 5', function () {
                const result = applyRules(visibleRound4, {
                    type: occupiedTypes.visible,
                    threshold: 5,
                })
                expect(result).to.have.deep.members(visibleRound5)
            })

            it('Sample case 6', function () {
                const result = applyRules(visibleRound5, {
                    type: occupiedTypes.visible,
                    threshold: 5,
                })
                expect(result).to.have.deep.members(visibleRound6)
            })

            it('Until steady', function () {
                const result = applyRules(sampleData, {
                    type: occupiedTypes.visible,
                    threshold: 5,
                    equilibrium: true,
                })
                expect(result).to.have.deep.members(visibleRound6)
            })
        })
    })

    describe('countOccupiedSeats', function () {
        it('Sample case 1 - adjacent', function () {
            const result = countOccupiedSeats(round5)
            expect(result).to.equal(37)
        })

        it('Sample case 2 - visible', function () {
            const result = countOccupiedSeats(visibleRound6)
            expect(result).to.equal(26)
        })
    })
})
