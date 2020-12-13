import isEqual from 'lodash.isequal'
import { symbols, occupiedTypes } from './constants'

export const printSeats = (seats) => {
    seats.forEach((row) => {
        console.log(row.join(''))
    })
}

const checkAdjacentOccupied = (seats, position) => {
    const [x, y] = position

    let occupiedCount = 0
    for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
            const centerSeat = j === 0 && i === 0
            if (centerSeat === false) {
                const row = seats[y + i]
                if (row !== undefined) {
                    const seat = row[x + j]
                    if (seat !== undefined) {
                        if (seat === symbols.occupied) {
                            occupiedCount += 1
                        }
                    }
                }
            }
        }
    }
    return occupiedCount
}

const seeOccupied = (seats, position, offset) => {
    const [x, y] = position
    const [xOffset, yOffset] = offset
    let row
    let seat
    let currentX = xOffset
    let currentY = yOffset
    do {
        row = seats[y + currentY]
        if (row !== undefined) {
            seat = row[x + currentX]
            if (seat !== undefined) {
                if (seat === symbols.occupied) {
                    return true
                } else if (seat === symbols.empty) {
                    return false
                }
            }
        }
        currentX += xOffset
        currentY += yOffset
    } while (row !== undefined && seat !== undefined)
    return false
}

const checkVisibleOccupied = (seats, position) => {
    let occupiedCount = 0
    for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
            const centerSeat = j === 0 && i === 0
            if (centerSeat === false) {
                const diagVis = seeOccupied(seats, position, [j, i])
                if (diagVis === true) {
                    occupiedCount += 1
                }
            }
        }
    }
    return occupiedCount
}

export const applyRules = (seats, options = {}) => {
    const runOptions = { ...options }
    if (runOptions.type === undefined) {
        runOptions.type = occupiedTypes.adjacent
    }
    if (runOptions.threshold === undefined) {
        runOptions.threshold = 4
    }
    if (runOptions.equilibrium === undefined) {
        runOptions.equilibrium = false
    }

    let checkOccupied = checkAdjacentOccupied
    if (runOptions.type === occupiedTypes.visible) {
        checkOccupied = checkVisibleOccupied
    }

    let currentSeats
    let newSeats = seats
    do {
        currentSeats = newSeats
        newSeats = []
        for (let i = 0; i < currentSeats.length; i += 1) {
            const newRow = []
            const row = currentSeats[i]
            for (let j = 0; j < row.length; j += 1) {
                const seat = row[j]
                let newSeat = seat
                const nearbyOccupied = checkOccupied(currentSeats, [j, i])
                if (seat === symbols.empty && nearbyOccupied === 0) {
                    newSeat = symbols.occupied
                } else if (
                    seat === symbols.occupied &&
                    nearbyOccupied >= runOptions.threshold
                ) {
                    newSeat = symbols.empty
                }
                newRow.push(newSeat)
            }
            newSeats.push(newRow)
        }
    } while (
        runOptions.equilibrium === true &&
        !isEqual(currentSeats, newSeats)
    )
    return newSeats
}

export const countOccupiedSeats = (seats) => {
    let occupied = 0
    for (let i = 0; i < seats.length; i += 1) {
        const row = seats[i]
        for (let j = 0; j < row.length; j += 1) {
            const seat = row[j]
            if (seat === symbols.occupied) {
                occupied += 1
            }
        }
    }
    return occupied
}
