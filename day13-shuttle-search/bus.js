import { symbols } from './constants'

export const parseShuttleData = (data) => {
    const timestamp = Number(data[0])
    const ids = data[1].split(',')
    const busIds = ids.map((id) => {
        if (id !== symbols.outOfService) {
            return Number(id)
        }
        return id
    })

    return { timestamp, busIds }
}

export const findEarliestBus = (timestamp, ids) => {
    const busIds = ids.filter((id) => id !== symbols.outOfService)
    const departures = busIds.map((id) => id - (timestamp % id))

    const minWait = Math.min(...departures)
    const minIndex = departures.indexOf(minWait)
    const busId = busIds[minIndex]

    return {
        id: busId,
        wait: minWait,
    }
}

export const findContinuousDepartureTime = (ids) => {
    const validIds = ids.filter((id) => id !== symbols.outOfService)
    const validPositions = ids
        .map((id, idx) => {
            if (id !== symbols.outOfService) {
                return idx
            }
        })
        .filter((idx) => idx !== undefined)

    let time = 0
    let stepSize = validIds[0]
    for (let i = 1; i < validIds.length; i++) {
        const bus = validIds[i]
        const offset = validPositions[i]
        let departTime = time + offset
        while (departTime % bus !== 0) {
            time += stepSize
            departTime = time + offset
        }
        stepSize *= bus
    }
    return time
}
