export const validPasswords = entries => {
    const valid = []
    entries.forEach(entry => {
        const [password, rules] = entry
        const count = password
            .split('')
            .filter(letter => letter === rules.letter).length
        if (count >= rules.lower && count <= rules.upper) {
            valid.push(password)
        }
    })
    return valid
}

export const validPosPasswords = entries => {
    const valid = []
    entries.forEach(entry => {
        const [password, rules] = entry
        const firstChar = password[rules.lower - 1]
        const secondChar = password[rules.upper - 1]
        const letter = rules.letter
        const firstMatch = firstChar === letter
        const secondMatch = secondChar === letter

        if (firstMatch ^ secondMatch) {
            valid.push(password)
        }
    })
    return valid
}
