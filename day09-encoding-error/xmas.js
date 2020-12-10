import { sumTo } from '../day01-report-repair/sum'

export const validateXmas = (data, position, options = { length: 25 }) => {
    const number = data[position]
    const preambleStart = Math.max(0, position - options.length)
    const preamble = data.slice(preambleStart, position)

    const result = sumTo(preamble, number)
    if (result.length === 0) {
        return number
    }
}

export const scanForInvalidity = (data, length) => {
    let currentIndex = length
    let invalidNumber
    while (invalidNumber === undefined && currentIndex < data.length) {
        invalidNumber = validateXmas(data, currentIndex, {
            length: length,
        })
        currentIndex += 1
    }
    return invalidNumber
}

export const continuousSumTotal = (data, total) => {
    let currentIndex = 0
    let subset
    while (subset === undefined && currentIndex < data.length) {
        const runningSubSet = [data[currentIndex]]
        let runningTotal = data[currentIndex]
        let runningIndex = currentIndex + 1
        do {
            const runningNumber = data[runningIndex]
            runningTotal += runningNumber
            runningSubSet.push(runningNumber)
            runningIndex += 1
        } while (runningTotal < total)

        if (runningTotal === total) {
            subset = runningSubSet
        } else {
            currentIndex += 1
        }
    }
    return subset
}

export const findEncryptionWeakness = (subset) => {
    const sortedSet = subset.sort((a, b) => a - b)
    const weakness = sortedSet[0] + sortedSet[sortedSet.length - 1]
    return weakness
}
