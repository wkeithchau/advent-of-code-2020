export const findBagSpec = (bagDef) => {
    const bagReg = / bag(s|\.)*/
    const [def] = bagDef.trim().split(bagReg)

    const phrases = def.trim().split(' ')
    let count = 1
    if (phrases.length > 2) {
        count = Number(phrases.shift())
    }
    const type = phrases.join(' ')
    if (type === 'no other') {
        return null
    }

    return { type, count }
}

export const parseBagRules = (rules) => {
    const ruleObjects = []

    rules.forEach((rule) => {
        const [parentStr, childrenStr] = rule.split('contain ')
        const parent = findBagSpec(parentStr)
        const childrenStrSplit = childrenStr.split(', ')

        const children = []
        childrenStrSplit.forEach((childStr) => {
            const child = findBagSpec(childStr)
            if (child !== null) {
                children.push(child)
            }
        })

        const object = { parent, children }
        ruleObjects.push(object)
    })

    return ruleObjects
}

export const findOuterBags = (rules, childType) => {
    let types = []
    rules.forEach((rule) => {
        rule.children.forEach((child) => {
            if (child.type === childType) {
                types.push(rule)
                types.push(...findOuterBags(rules, rule.parent.type))
            }
        })
    })
    types = types.filter((type, index) => types.indexOf(type) === index)
    return types
}

export const getNestedBag = (rules, childType, initial = true) => {
    const bagRule = rules.find((rule) => rule.parent.type === childType)

    let nestedChildren = []
    if (bagRule !== undefined) {
        bagRule.children.forEach((child) => {
            const childOject = { ...child }
            const childRule = rules.find(
                (rule) => rule.parent.type === child.type
            )

            childOject.inside = []
            if (childRule.children.length !== 0) {
                childOject.inside = getNestedBag(rules, child.type, false)
            }
            nestedChildren.push(childOject)
        })
    }

    if (initial === false) {
        return nestedChildren
    }

    return {
        type: childType,
        count: 1,
        inside: nestedChildren,
    }
}

export const calcBagCount = (nestedBag, include = false) => {
    if (nestedBag.inside.length === 0) {
        return nestedBag.count
    }

    let insideCount = 0
    nestedBag.inside.forEach((bag) => {
        const nestedCount = calcBagCount(bag, true)
        insideCount += nestedCount
    })
    insideCount = nestedBag.count * insideCount
    if (include === true) {
        insideCount += nestedBag.count
    }
    return insideCount
}
