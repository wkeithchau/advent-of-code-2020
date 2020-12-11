import isEqual from 'lodash.isequal'
import uniqWith from 'lodash.uniqwith'

export const findJoltageDifferences = (adapters) => {
    const sortedAdapters = [...adapters]
    sortedAdapters.sort((a, b) => a - b)
    sortedAdapters.unshift(0)
    const builtInAdapter = sortedAdapters[sortedAdapters.length - 1] + 3
    sortedAdapters.push(builtInAdapter)

    const difference = []
    let currentIndex = 0
    while (currentIndex + 1 < sortedAdapters.length) {
        const current = sortedAdapters[currentIndex]
        const next = sortedAdapters[currentIndex + 1]
        const diff = next - current
        difference.push(diff)
        currentIndex += 1
    }
    return difference
}

export const collectDifferences = (diffs) => {
    const difference = { 1: 0, 2: 0, 3: 0 }
    diffs.forEach((d) => {
        if (d === 1) {
            difference['1'] += 1
        } else if (d === 2) {
            difference['2'] += 1
        } else if (d === 3) {
            difference['3'] += 1
        }
    })
    return difference
}

const differenceGroups = (diffs, limit = 3) => {
    const groups = []
    let set = []
    diffs.forEach((d) => {
        if (d < limit) {
            set.push(d)
        } else {
            if (set.length > 1) {
                groups.push(set)
            }
            set = []
        }
    })
    return groups
}

const generateUniqueArrangements = (set, limit = 3) => {
    let uniques = [set]
    for (let i = 0; i < set.length; i += 1) {
        const value = set[i]
        const nextValue = set[i + 1]
        const sum = value + nextValue
        if (sum <= limit) {
            const newArray = [...set]
            newArray.splice(i, 2, set[i] + nextValue)
            const newSets = generateUniqueArrangements(newArray)
            uniques.push(...newSets)
            uniques = uniqWith(uniques, isEqual)
        }
    }
    return uniques
}

const calcArrangementCount = (uniqSets) => {
    let total = 1
    uniqSets.forEach((set) => {
        total *= set.length
    })
    return total
}

export const adapterArrangeCount = (adapters) => {
    const differences = findJoltageDifferences(adapters)
    const diffGroups = differenceGroups(differences)

    const uniqueSets = []
    diffGroups.forEach((group) => {
        const uniques = generateUniqueArrangements(group)
        uniqueSets.push(uniques)
    })
    const totalCount = calcArrangementCount(uniqueSets)
    return totalCount
}
