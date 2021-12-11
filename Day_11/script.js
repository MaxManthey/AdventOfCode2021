const input = []
require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){input.push(line.split('').map(el => parseInt(el)))})

const flashingOctopuses = (octopuses) => {
    let flashingPosition = []
    for(let i = 0; i < 10; ++i) {
        for(let j = 0; j < 10; ++j) {
            if(octopuses[i][j] > 8) flashingPosition.push([i, j])
        }
    }
    return flashingPosition
}

const allNeighbours = (i, j) => {
    const length = height = 10
    if(i == 0) {
        if(j == 0) {
            const right = [i, j+1]
            const bottom = [i+1, j]
            const bottomRight = [i+1, j+1]
            return [right,bottom, bottomRight]
        } else if(j == (length-1)) {
            const left = [i, j-1]
            const bottom = [i+1, j]
            const bottomLeft = [i+1, j-1]
            return [left, bottom, bottomLeft]
        } else {
            const left = [i, j-1]
            const right = [i, j+1]
            const bottom = [i+1, j]
            const bottomRight = [i+1, j+1]
            const bottomLeft = [i+1, j-1]
            return [left, right, bottom, bottomLeft, bottomRight]
        }
    } else if(i == (height-1)) {
        if(j == 0) {
            const right = [i, j+1]
            const top = [i-1, j]
            const topRight = [i-1, j+1]
            return [right, top, topRight]
        } else if(j == (length-1)) {
            const left = [i, j-1]
            const top = [i-1, j]
            const topLeft = [i-1, j-1]
            return [left, top, topLeft]
        } else {
            const left = [i, j-1]
            const right = [i, j+1]
            const top = [i-1, j]
            const topLeft = [i-1, j-1]
            const topRight = [i-1, j+1]
            return [left, right, top, topLeft, topRight]
        }
    } else {
        if(j == 0) {
            const bottom = [i+1, j]
            const right = [i, j+1]
            const top = [i-1, j]
            const bottomRight = [i+1, j+1]
            const topRight = [i-1, j+1]
            return [bottom, right, top, topRight, bottomRight]
        } else if(j == (length-1)) {
            const bottom = [i+1, j]
            const left = [i, j-1]
            const top = [i-1, j]
            const bottomLeft = [i+1, j-1]
            const topLeft = [i-1, j-1]
            return [bottom, left, top, bottomLeft, topLeft]
        } else {
            const left = [i, j-1]
            const right = [i, j+1]
            const top = [i-1, j]
            const bottom = [i+1, j]
            const bottomRight = [i+1, j+1]
            const topRight = [i-1, j+1]
            const bottomLeft = [i+1, j-1]
            const topLeft = [i-1, j-1]
            return [left, right, top, bottom, bottomRight, topRight, bottomLeft, topLeft]
        }
    }
}

const part1 = (inp) => {
    let octopuses = JSON.parse(JSON.stringify(inp))
    let score = 0
    
    for(let i = 0; i < 100; ++i) {
        while(flashingOctopuses(octopuses).length) {
            const isFlashing = flashingOctopuses(octopuses)
            score += isFlashing.length
            for(octo of isFlashing) {
                octopuses[octo[0]][octo[1]] = -1
            }
            const currentNeighbours = []
            for(octo of isFlashing) {
                const neighbours = allNeighbours(octo[0], octo[1])
                for(neighbour of neighbours) {
                    currentNeighbours.push(neighbour)
                }
            }
            for(neighbour of currentNeighbours) {
                const x = neighbour[0], y = neighbour[1]
                if(octopuses[x][y] != -1) {
                    octopuses[x][y] += 1
                }
            }
        }
        octopuses = octopuses.map(line => line.map(el => el+1))
    }
    return score
}
console.log(part1(input))


const part2 = (inp) => {
    let octopuses = JSON.parse(JSON.stringify(inp))
    let steps = 0
    let synchronisedFlash = false
    
    while(!synchronisedFlash) {
        while(flashingOctopuses(octopuses).length) {
            const isFlashing = flashingOctopuses(octopuses)
            for(octo of isFlashing) {
                octopuses[octo[0]][octo[1]] = -1
            }
            const currentNeighbours = []
            for(octo of isFlashing) {
                const neighbours = allNeighbours(octo[0], octo[1])
                for(neighbour of neighbours) {
                    currentNeighbours.push(neighbour)
                }
            }
            for(neighbour of currentNeighbours) {
                const x = neighbour[0], y = neighbour[1]
                if(octopuses[x][y] != -1) {
                    octopuses[x][y] += 1
                }
            }
        }
        octopuses = octopuses.map(line => line.map(el => el+1))

        const totalScore = octopuses.reduce((acc, line) => acc+line.reduce((acc2, sum) => acc2+sum,0),0)
        if(totalScore == 0) {
            synchronisedFlash = true
        }
        ++steps
    }
    return steps
}
console.log(part2(input))
