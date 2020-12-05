import { fields, validFields } from './constants'

export const parsePassports = (data) => {
    const passports = []
    let passport = {}
    data.forEach((line) => {
        if (line.length === 0) {
            passports.push(passport)
            passport = {}
            return
        }

        const keyValuePairs = line.split(' ')
        keyValuePairs.forEach((pairs) => {
            const [key, value] = pairs.split(':')
            passport[key] = value
        })
    })
    passports.push(passport)
    return passports
}

export const checkPassport = (passport) => {
    const requiredFields = Object.keys(fields).filter(
        (key) => key !== 'countryId'
    )
    let valid = true
    requiredFields.forEach((key) => {
        const field = fields[key]
        if (passport[field] === undefined) {
            valid = false
        }
    })
    return valid
}

export const validatePassport = (passport, checkRequired = true) => {
    let valid = true

    const prelimCheck = checkPassport(passport)
    if (prelimCheck !== true && checkRequired === true) {
        valid = false
    }

    const KeysPresent = Object.keys(passport)
    KeysPresent.forEach((key) => {
        const check = validFields[key]
        const passportValue = passport[key]
        if (check.regex !== undefined) {
            const regCheck = check.regex.test(passportValue)
            if (regCheck === false) {
                valid = false
            }
        }
        if (check.lower !== undefined && check.upper !== undefined) {
            const num = Number(passportValue)
            const rangeCheck = check.lower <= num && check.upper >= num
            if (rangeCheck === false || passportValue.length !== 4) {
                valid = false
            }
        }
        if (key === fields.height) {
            const units =
                passportValue[passportValue.length - 2] +
                passportValue[passportValue.length - 1]
            if (units === 'cm' && check.cm !== undefined) {
                const reg = check.cm.regex
                const lower = check.cm.lower
                const upper = check.cm.upper
                const num = Number(
                    passportValue.substring(0, passportValue.length - 2)
                )
                const regCheck = reg.test(passportValue)
                if (regCheck === false) {
                    valid = false
                }
                const rangeCheck = lower <= num && upper >= num
                if (rangeCheck === false) {
                    valid = false
                }
            } else if (units === 'in' && check.in !== undefined) {
                const reg = check.in.regex
                const lower = check.in.lower
                const upper = check.in.upper
                const num = Number(
                    passportValue.substring(0, passportValue.length - 2)
                )
                const regCheck = reg.test(passportValue)
                if (regCheck === false) {
                    valid = false
                }
                const rangeCheck = lower <= num && upper >= num
                if (rangeCheck === false) {
                    valid = false
                }
            } else {
                valid = false
            }
        }
    })

    return valid
}
