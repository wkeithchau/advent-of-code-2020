import { expect } from 'chai'

import { checkPassport, parsePassports, validatePassport } from './passport'

describe('Day04 - Passport Processing', function () {
    const sampleData = [
        'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
        'byr:1937 iyr:2017 cid:147 hgt:183cm',
        '',
        'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
        'hcl:#cfa07d byr:1929',
        '',
        'hcl:#ae17e1 iyr:2013',
        'eyr:2024',
        'ecl:brn pid:760753108 byr:1931',
        'hgt:179cm',
        '',
        'hcl:#cfa07d eyr:2025 pid:166559648',
        'iyr:2011 ecl:brn hgt:59in',
    ]

    const samplePassports = [
        {
            ecl: 'gry',
            pid: '860033327',
            eyr: '2020',
            hcl: '#fffffd',
            byr: '1937',
            iyr: '2017',
            cid: '147',
            hgt: '183cm',
        },
        {
            iyr: '2013',
            ecl: 'amb',
            cid: '350',
            eyr: '2023',
            pid: '028048884',
            hcl: '#cfa07d',
            byr: '1929',
        },
        {
            hcl: '#ae17e1',
            iyr: '2013',
            eyr: '2024',
            ecl: 'brn',
            pid: '760753108',
            byr: '1931',
            hgt: '179cm',
        },
        {
            hcl: '#cfa07d',
            eyr: '2025',
            pid: '166559648',
            iyr: '2011',
            ecl: 'brn',
            hgt: '59in',
        },
    ]

    describe('parsePassports', function () {
        it('Sample case 1', function () {
            const result = parsePassports(sampleData)
            expect(result).to.have.deep.members(samplePassports)
        })
    })

    describe('checkPassport', function () {
        it('Sample case 1', function () {
            const result = checkPassport(samplePassports[0])
            expect(result).to.be.true
        })

        it('Sample case 2', function () {
            const result = checkPassport(samplePassports[1])
            expect(result).to.be.false
        })

        it('Sample case 3', function () {
            const result = checkPassport(samplePassports[2])
            expect(result).to.be.true
        })

        it('Sample case 4', function () {
            const result = checkPassport(samplePassports[3])
            expect(result).to.be.false
        })
    })

    describe('validatePassport - single fields', function () {
        it('Sample case 1: {byr:2002}', function () {
            const result = validatePassport({ byr: '2002' }, false)
            expect(result).to.be.true
        })

        it('Sample case 2: {byr:2003}', function () {
            const result = validatePassport({ byr: '2003' }, false)
            expect(result).to.be.false
        })

        it('Sample case 3: {hgt:60in}', function () {
            const result = validatePassport({ hgt: '60in' }, false)
            expect(result).to.be.true
        })

        it('Sample case 4: {hgt:190cm}', function () {
            const result = validatePassport({ hgt: '190cm' }, false)
            expect(result).to.be.true
        })

        it('Sample case 5: {hgt:190in}', function () {
            const result = validatePassport({ hgt: '190in' }, false)
            expect(result).to.be.false
        })

        it('Sample case 5: {hgt:190}', function () {
            const result = validatePassport({ hgt: '190' }, false)
            expect(result).to.be.false
        })

        it('Sample case 6: {hcl:#123abc}', function () {
            const result = validatePassport({ hcl: '#123abc' }, false)
            expect(result).to.be.true
        })

        it('Sample case 7: {hcl:#123abz}', function () {
            const result = validatePassport({ hcl: '#123abz' }, false)
            expect(result).to.be.false
        })

        it('Sample case 8: {hcl:123abc}', function () {
            const result = validatePassport({ hcl: '123abc' }, false)
            expect(result).to.be.false
        })

        it('Sample case 9: {ecl:brn}', function () {
            const result = validatePassport({ ecl: 'brn' }, false)
            expect(result).to.be.true
        })

        it('Sample case 10: {ecl:wat}', function () {
            const result = validatePassport({ ecl: 'wat' }, false)
            expect(result).to.be.false
        })

        it('Sample case 11: {pid:000000001}', function () {
            const result = validatePassport({ pid: '000000001' }, false)
            expect(result).to.be.true
        })

        it('Sample case 12: {pid:0123456789}', function () {
            const result = validatePassport({ pid: '0123456789' }, false)
            expect(result).to.be.false
        })
    })

    describe('validatePassport - invalid passports', function () {
        const invalidPassports = [
            {
                eyr: '1972',
                cid: '100',
                hcl: '#18171d',
                ecl: 'amb',
                hgt: '170',
                pid: '186cm',
                iyr: '2018',
                byr: '1926',
            },
            {
                iyr: '2019',
                hcl: '#602927',
                eyr: '1967',
                hgt: '170cm',
                ecl: 'grn',
                pid: '012533040',
                byr: '1946',
            },
            {
                hcl: 'dab227',
                iyr: '2012',
                ecl: 'brn',
                hgt: '182cm',
                pid: '021572410',
                eyr: '2020',
                byr: '1992',
                cid: '277',
            },
            {
                hgt: '59cm',
                ecl: 'zzz',
                eyr: '2038',
                hcl: '74454a',
                iyr: '2023',
                pid: '3556412378',
                byr: '2007',
            },
        ]

        it('Sample case 1', function () {
            const passport = invalidPassports[0]
            const result = validatePassport(passport)
            expect(result).to.be.false
        })

        it('Sample case 2', function () {
            const passport = invalidPassports[1]
            const result = validatePassport(passport)
            expect(result).to.be.false
        })

        it('Sample case 3', function () {
            const passport = invalidPassports[2]
            const result = validatePassport(passport)
            expect(result).to.be.false
        })

        it('Sample case 4', function () {
            const passport = invalidPassports[3]
            const result = validatePassport(passport)
            expect(result).to.be.false
        })
    })

    describe('validatePassport - valid passports', function () {
        const validPassports = [
            {
                pid: '087499704',
                hgt: '74in',
                ecl: 'grn',
                iyr: '2012',
                eyr: '2030',
                byr: '1980',
                hcl: '#623a2f',
            },
            {
                eyr: '2029',
                ecl: 'blu',
                cid: '129',
                byr: '1989',
                iyr: '2014',
                pid: '896056539',
                hcl: '#a97842',
                hgt: '165cm',
            },
            {
                hcl: '#888785',
                hgt: '164cm',
                byr: '2001',
                iyr: '2015',
                cid: '88',
                pid: '545766238',
                ecl: 'hzl',
                eyr: '2022',
            },
        ]

        it('Sample case 1', function () {
            const passport = validPassports[0]
            const result = validatePassport(passport)
            expect(result).to.be.true
        })

        it('Sample case 2', function () {
            const passport = validPassports[1]
            const result = validatePassport(passport)
            expect(result).to.be.true
        })

        it('Sample case 3', function () {
            const passport = validPassports[2]
            const result = validatePassport(passport)
            expect(result).to.be.true
        })
    })
})
