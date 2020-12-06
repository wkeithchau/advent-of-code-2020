export const parseGroups = (data) => {
    const groups = []
    let group = []
    data.forEach((line) => {
        if (line.length === 0) {
            groups.push(group)
            group = []
            return
        }

        group.push(line)
    })
    groups.push(group)
    return groups
}

const addCount = (obj, key) => {
    if (obj[key] === undefined) {
        obj[key] = 0
    }
    obj[key] += 1
    return obj
}

export const countYesAnswers = (group) => {
    let yesCounts = {}
    group.forEach((answers) => {
        for (let i = 0; i < answers.length; i += 1) {
            const char = answers.charAt(i)
            yesCounts = addCount(yesCounts, char)
        }
    })
    const numOfYes = Object.keys(yesCounts).length
    return numOfYes
}

export const countYesAllAnswers = (group) => {
    let yesCounts = {}
    group.forEach((answers) => {
        for (let i = 0; i < answers.length; i += 1) {
            const char = answers.charAt(i)
            yesCounts = addCount(yesCounts, char)
        }
    })
    const yesAnswers = Object.keys(yesCounts)
    const yesAllAnswers = []
    yesAnswers.forEach((key) => {
        const yesCount = yesCounts[key]
        if (yesCount === group.length) {
            yesAllAnswers.push(key)
        }
    })
    return yesAllAnswers.length
}
