export const sumTo = (numbers, total = 2020) => {
    for (let i = 0; i < numbers.length; i += 1) {
        for (let j = i + 1; j < numbers.length; j += 1) {
            const x = numbers[i]
            const y = numbers[j]
            const sum = x + y
            if (sum === total) {
                return [x, y]
            }
        }
    }
}

export const threeSumTo = (numbers, total = 2020) => {
    for (let i = 0; i < numbers.length; i += 1) {
        for (let j = i + 1; j < numbers.length; j += 1) {
            for (let k = j + 1; k < numbers.length; k += 1) {
                const x = numbers[i]
                const y = numbers[j]
                const z = numbers[k]
                const sum = x + y + z
                if (sum === total) {
                    return [x, y, z]
                }
            }
        }
    }
}

export const multiplyEntries = entries => {
    const numbers = entries.slice()
    let multiplied = 1
    while (numbers.length > 0) {
        const number = numbers.shift()
        multiplied *= number
    }
    return multiplied
}
