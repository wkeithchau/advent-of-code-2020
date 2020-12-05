export const fields = {
    birthYear: 'byr',
    issueYear: 'iyr',
    expirationYear: 'eyr',
    height: 'hgt',
    hairColor: 'hcl',
    eyeColor: 'ecl',
    passportId: 'pid',
    countryId: 'cid',
}

export const validFields = {
    byr: { lower: 1920, upper: 2002 },
    iyr: { lower: 2010, upper: 2020 },
    eyr: { lower: 2020, upper: 2030 },
    hgt: {
        cm: { lower: 150, upper: 193, regex: /^[0-9]+cm$/ },
        in: { lower: 59, upper: 76, regex: /^[0-9]+in$/ },
    },
    hcl: { regex: /^#[0-9|a-f]{6}$/ },
    ecl: { regex: /^(amb|blu|brn|gry|grn|hzl|oth)$/ },
    pid: { regex: /^[0-9]{9}$/ },
    cid: {},
}
