import { symbols, types } from './constants'

const parseMaskLine = (line) => {
    const parts = line.split(symbols.equals)
    return {
        type: types.mask,
        value: parts[1],
    }
}

const parseMemLine = (line) => {
    const parts = line.split(symbols.equals)
    const bracketPos = [
        parts[0].indexOf(symbols.frontBracket),
        parts[0].indexOf(symbols.backBracket),
    ]
    const address = parts[0].substring(bracketPos[0] + 1, bracketPos[1])
    return {
        type: types.mem,
        value: Number(parts[1]),
        address: Number(address),
    }
}

export const parseBitmaskData = (data) => {
    const maskRegex = /^mask = /i
    return data.map((line) => {
        if (maskRegex.test(line) === true) {
            return parseMaskLine(line)
        }
        return parseMemLine(line)
    })
}

export const applyMask = (value, mask) => {
    const binaryValue = value.toString(2).padStart(36, '0')
    let maskedValue = ''
    for (let i = 0; i < binaryValue.length; i += 1) {
        const maskBit = mask[i]
        let updatedBit = binaryValue[i]
        if (maskBit !== symbols.x) {
            updatedBit = maskBit
        }
        maskedValue += updatedBit
    }
    return parseInt(maskedValue, 2)
}

const getAddresses = (floatAddress, floaterPositions) => {
    const address = [...floatAddress]
    const positions = [...floaterPositions]
    const position = positions.shift()
    let addresses = []
    for (let i = 0; i < 2; i += 1) {
        const updatedAddress = [...address]
        updatedAddress[position] = i.toString()
        const floater = updatedAddress.find((bit) => bit === symbols.x)
        if (floater !== undefined) {
            const updatedAddresses = getAddresses(updatedAddress, positions)
            addresses = addresses.concat(updatedAddresses)
        } else {
            addresses.push(updatedAddress)
        }
    }
    return addresses
}

export const applyMaskV2 = (value, mask) => {
    const binaryValue = value.toString(2).padStart(36, '0')
    let maskedValue = ''
    const floaterPositions = []
    for (let i = 0; i < binaryValue.length; i += 1) {
        const maskBit = mask[i]
        let updatedBit = binaryValue[i]
        if (maskBit === symbols.one) {
            updatedBit = symbols.one
        } else if (maskBit === symbols.x) {
            updatedBit = symbols.x
            floaterPositions.push(i)
        }
        maskedValue += updatedBit
    }
    let addresses = getAddresses([...maskedValue], floaterPositions)
    addresses = addresses.map((a) => a.join(''))
    addresses = addresses.map((a) => parseInt(a, 2))
    return addresses
}

export const sumMemoryValues = (memory) => {
    const sum = memory.reduce((prevValue, nextValue) => prevValue + nextValue)
    return sum
}

export const initProgram = (program) => {
    let memory = []
    let currentMask = ''
    currentMask = currentMask.padStart(symbols.x, 36)
    program.forEach((task) => {
        if (task.type === types.mask) {
            currentMask = task.value
        } else if (task.type === types.mem) {
            const value = applyMask(task.value, currentMask)
            memory[task.address] = value
        }
    })
    memory = memory.map((value) => {
        if (value !== undefined) {
            return value
        }
        return 0
    })
    return memory
}

export const initMemoryAdressDecoder = (program) => {
    let memory = {}
    let currentMask = ''
    currentMask = currentMask.padStart(symbols.x, 36)
    program.forEach((task) => {
        if (task.type === types.mask) {
            currentMask = task.value
        } else if (task.type === types.mem) {
            const addresses = applyMaskV2(task.address, currentMask)
            addresses.forEach((address) => {
                memory[address] = task.value
            })
        }
    })
    memory = Object.values(memory)
    memory = memory.map((value) => {
        if (value !== undefined) {
            return value
        }
        return 0
    })
    return memory
}
