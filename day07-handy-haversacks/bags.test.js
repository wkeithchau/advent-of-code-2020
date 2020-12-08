import { expect } from 'chai'

import {
    findBagSpec,
    parseBagRules,
    findOuterBags,
    getNestedBag,
    calcBagCount,
} from './bags'

describe('Day07 - Handy Haversacks', function () {
    const sampleInput1 = [
        'light red bags contain 1 bright white bag, 2 muted yellow bags.',
        'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
        'bright white bags contain 1 shiny gold bag.',
        'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
        'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
        'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
        'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
        'faded blue bags contain no other bags.',
        'dotted black bags contain no other bags.',
    ]
    const sampleData1 = [
        {
            parent: { type: 'light red', count: 1 },
            children: [
                { type: 'bright white', count: 1 },
                { type: 'muted yellow', count: 2 },
            ],
        },
        {
            parent: { type: 'dark orange', count: 1 },
            children: [
                { type: 'bright white', count: 3 },
                { type: 'muted yellow', count: 4 },
            ],
        },
        {
            parent: { type: 'bright white', count: 1 },
            children: [{ type: 'shiny gold', count: 1 }],
        },
        {
            parent: { type: 'muted yellow', count: 1 },
            children: [
                { type: 'shiny gold', count: 2 },
                { type: 'faded blue', count: 9 },
            ],
        },
        {
            parent: { type: 'shiny gold', count: 1 },
            children: [
                { type: 'dark olive', count: 1 },
                { type: 'vibrant plum', count: 2 },
            ],
        },
        {
            parent: { type: 'dark olive', count: 1 },
            children: [
                { type: 'faded blue', count: 3 },
                { type: 'dotted black', count: 4 },
            ],
        },
        {
            parent: { type: 'vibrant plum', count: 1 },
            children: [
                { type: 'faded blue', count: 5 },
                { type: 'dotted black', count: 6 },
            ],
        },
        { parent: { type: 'faded blue', count: 1 }, children: [] },
        { parent: { type: 'dotted black', count: 1 }, children: [] },
    ]
    const sampleNestedBag1 = {
        type: 'shiny gold',
        count: 1,
        inside: [
            {
                type: 'dark olive',
                count: 1,
                inside: [
                    { type: 'faded blue', count: 3, inside: [] },
                    { type: 'dotted black', count: 4, inside: [] },
                ],
            },
            {
                type: 'vibrant plum',
                count: 2,
                inside: [
                    { type: 'faded blue', count: 5, inside: [] },
                    { type: 'dotted black', count: 6, inside: [] },
                ],
            },
        ],
    }
    const sampleInput2 = [
        'shiny gold bags contain 2 dark red bags.',
        'dark red bags contain 2 dark orange bags.',
        'dark orange bags contain 2 dark yellow bags.',
        'dark yellow bags contain 2 dark green bags.',
        'dark green bags contain 2 dark blue bags.',
        'dark blue bags contain 2 dark violet bags.',
        'dark violet bags contain no other bags.',
    ]
    const sampleData2 = [
        {
            parent: { type: 'shiny gold', count: 1 },
            children: [{ type: 'dark red', count: 2 }],
        },
        {
            parent: { type: 'dark red', count: 1 },
            children: [{ type: 'dark orange', count: 2 }],
        },
        {
            parent: { type: 'dark orange', count: 1 },
            children: [{ type: 'dark yellow', count: 2 }],
        },
        {
            parent: { type: 'dark yellow', count: 1 },
            children: [{ type: 'dark green', count: 2 }],
        },
        {
            parent: { type: 'dark green', count: 1 },
            children: [{ type: 'dark blue', count: 2 }],
        },
        {
            parent: { type: 'dark blue', count: 1 },
            children: [{ type: 'dark violet', count: 2 }],
        },
        { parent: { type: 'dark violet', count: 1 }, children: [] },
    ]
    const sampleNestedbag2 = {
        type: 'shiny gold',
        count: 1,
        inside: [
            {
                type: 'dark red',
                count: 2,
                inside: [
                    {
                        type: 'dark orange',
                        count: 2,
                        inside: [
                            {
                                type: 'dark yellow',
                                count: 2,
                                inside: [
                                    {
                                        type: 'dark green',
                                        count: 2,
                                        inside: [
                                            {
                                                type: 'dark blue',
                                                count: 2,
                                                inside: [
                                                    {
                                                        type: 'dark violet',
                                                        count: 2,
                                                        inside: [],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    }

    describe('findBagSpec', function () {
        it('Parses with bag.', function () {
            const str = '1 shiny gold bag.'
            const result = findBagSpec(str)
            expect(result).to.deep.equal({ type: 'shiny gold', count: 1 })
        })

        it('Parses with bags.', function () {
            const str = '2 shiny gold bags.'
            const result = findBagSpec(str)
            expect(result).to.deep.equal({ type: 'shiny gold', count: 2 })
        })

        it('Parses with bag', function () {
            const str = '2 shiny gold bag'
            const result = findBagSpec(str)
            expect(result).to.deep.equal({ type: 'shiny gold', count: 2 })
        })

        it('Parses with bags', function () {
            const str = '2 shiny gold bags'
            const result = findBagSpec(str)
            expect(result).to.deep.equal({ type: 'shiny gold', count: 2 })
        })

        it('Parses with no number', function () {
            const str = 'shiny gold bag'
            const result = findBagSpec(str)
            expect(result).to.deep.equal({ type: 'shiny gold', count: 1 })
        })

        it('Parses `no other` as null', function () {
            const str = 'no other bag'
            const result = findBagSpec(str)
            expect(result).to.equal(null)
        })
    })

    describe('parseBagRules', function () {
        it('Sample case 1', function () {
            const result = parseBagRules(sampleInput1)
            expect(result).to.have.deep.members(sampleData1)
        })

        it('Sample case 2', function () {
            const result = parseBagRules(sampleInput2)
            expect(result).to.have.deep.members(sampleData2)
        })
    })

    describe('findOuterBags', function () {
        it('Sample case 1', function () {
            const result = findOuterBags(sampleData1, 'shiny gold')
            const bags = result.map((bag) => bag.parent.type)
            expect(bags).to.have.deep.members([
                'bright white',
                'light red',
                'dark orange',
                'muted yellow',
            ])
        })
    })

    describe('getNestedBag', function () {
        it('Sample case 1', function () {
            const result = getNestedBag(sampleData1, 'shiny gold')
            expect(result).to.deep.equal(sampleNestedBag1)
        })

        it('Sample case 2', function () {
            const result = getNestedBag(sampleData2, 'shiny gold')
            expect(result).to.deep.equal(sampleNestedbag2)
        })
    })

    describe('calcBagCount', function () {
        it('Sample case 1', function () {
            const result = calcBagCount(sampleNestedBag1)
            expect(result).to.equal(32)
        })

        it('Sample case 2', function () {
            const result = calcBagCount(sampleNestedbag2)
            expect(result).to.equal(126)
        })
    })
})
