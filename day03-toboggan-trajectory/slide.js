import { symbols } from './constants'

export const projectSlide = (map, slope = { x: 0, y: 1 }) => {
    let xPos = 0
    let yPos = 0
    let mod = map[0].length
    let totalHits = 0
    while (yPos < map.length - 1) {
        xPos += slope.x
        yPos += slope.y
        const currentSpace = map[yPos][xPos % mod]
        if (currentSpace === symbols.tree) {
            totalHits += 1
        }
    }
    return totalHits
}

export const multiplyCounts = (counts = []) => {
    const numbers = counts.slice()
    let multiplied = 1
    while (numbers.length > 0) {
        const number = numbers.shift()
        multiplied *= number
    }
    return multiplied
}
