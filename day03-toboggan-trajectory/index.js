import { getInput } from '../utils/input'

import { projectSlide, multiplyCounts } from './slide'

const INPUT = getInput(import.meta.url, '\n')
const MAP = INPUT.map(data => data.split(''))

const part1 = () => {
    const slope = { x: 3, y: 1 }
    const treeHits = projectSlide(MAP, slope)
    console.log(
        `Number of tree hits with slope {right-${slope.x},down-${slope.y}}: ${treeHits}`
    )
}

const part2 = () => {
    const slopeTypes = [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 },
    ]
    const treeHits = []
    slopeTypes.forEach(slope => {
        const hits = projectSlide(MAP, slope)
        treeHits.push(hits)
    })
    const multiplied = multiplyCounts(treeHits)
    console.log(`Multiplied tree encounters on each slope: ${multiplied}`)
}

part1()
part2()
