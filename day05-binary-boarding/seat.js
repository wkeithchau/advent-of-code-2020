import { seatLimits, symbols } from './constants'

export const decodePartition = (partition, range) => {
    let lower = range.lower
    let upper = range.upper
    let code = partition.slice()

    while (code.length > 0) {
        const char = code.slice(0, 1)
        code = code.slice(1)
        const midpoint = (lower + upper) / 2
        const lowerRange = { lower: lower, upper: Math.floor(midpoint) }
        const upperRange = { lower: Math.floor(midpoint) + 1, upper: upper }

        if (char === symbols.front || char === symbols.left) {
            lower = lowerRange.lower
            upper = lowerRange.upper
        } else if (char === symbols.back || char === symbols.right) {
            lower = upperRange.lower
            upper = upperRange.upper
        }
    }

    return lower
}

export const decodeSeat = (binary) => {
    const rowBinary = binary.substring(0, 7)
    const colBinary = binary.substring(7)

    const row = decodePartition(rowBinary, { lower: 0, upper: seatLimits.row })
    const col = decodePartition(colBinary, {
        lower: 0,
        upper: seatLimits.column,
    })

    return { row: row, column: col }
}

export const calcSeatId = (seat) => {
    const row = seat.row
    const col = seat.column
    const seatId = row * 8 + col
    return seatId
}

export const findSeatId = (seatIds) => {
    const ids = seatIds.slice().sort((a, b) => a - b)
    const prevMissingId = ids.find((id, idx) => {
        const expectedNextId = id + 1
        const skippedNextId = id + 2
        const nextId = ids[idx + 1]
        if (expectedNextId !== nextId && nextId === skippedNextId) {
            return expectedNextId
        }
    })
    return prevMissingId + 1
}
