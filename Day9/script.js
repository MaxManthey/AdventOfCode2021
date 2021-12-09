const input = []
require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){input.push(line.split('').map(el => parseInt(el)))})


const allNeighbours = (i, j) => {
    const caves = input
    const heightTunnel = caves.length
    const lengthTunnel = caves[0].length
    if(i == 0) {
        if(j == 0) {
            const right = [caves[i][j+1], [i, j+1]]
            const bottom = [caves[i+1][j], [i+1, j]]
            return [right,bottom]
        } else if(j == (lengthTunnel-1)) {
            const left = [caves[i][j-1], [i, j-1]]
            const bottom = [caves[i+1][j], [i+1, j]]
            return [left, bottom]
        } else {
            const left = [caves[i][j-1], [i, j-1]]
            const right = [caves[i][j+1], [i, j+1]]
            const bottom = [caves[i+1][j], [i+1, j]]
            return [left, right, bottom]
        }
    } else if(i == (heightTunnel-1)) {
        if(j == 0) {
            const right = [caves[i][j+1], [i, j+1]]
            const top = [caves[i-1][j], [i-1, j]]
            return [right, top]
        } else if(j == (lengthTunnel-1)) {
            const left = [caves[i][j-1], [i, j-1]]
            const top = [caves[i-1][j], [i-1, j]]
            return [left, top]
        } else {
            const left = [caves[i][j-1], [i, j-1]]
            const right = [caves[i][j+1], [i, j+1]]
            const top = [caves[i-1][j], [i-1, j]]
            return [left, right, top]
        }
    } else {
        if(j == 0) {
            const bottom = [caves[i+1][j], [i+1, j]]
            const right = [caves[i][j+1], [i, j+1]]
            const top = [caves[i-1][j], [i-1, j]]
            return [bottom, right, top]
        } else if(j == (lengthTunnel-1)) {
            const bottom = [caves[i+1][j], [i+1, j]]
            const left = [caves[i][j-1], [i, j-1]]
            const top = [caves[i-1][j], [i-1, j]]
            return [bottom, left, top]
        } else {
            const left = [caves[i][j-1], [i, j-1]]
            const right = [caves[i][j+1], [i, j+1]]
            const top = [caves[i-1][j], [i-1, j]]
            const bottom = [caves[i+1][j], [i+1, j]]
            return [left, right, top, bottom]
        }
    }
}


const part1 = () => {
    let lowPoints = []
    for(let i = 0; i < input.length; ++i) {
        for(let j = 0; j < input[0].length; ++j) {
            const caveToTest = input[i][j]
            const neighbours = allNeighbours(i, j)
            if(neighbours.filter(el => el[0] < caveToTest).length == 0) lowPoints.push([caveToTest, [i, j]])
        }
    }
    return lowPoints
}
console.log(part1().reduce((acc, sum) => acc + sum[0] + 1, 0))


const part2 = () => {
    const deepPoints = part1()
    const allBasinSizes = []
    for(deepPoint of deepPoints) {        
        let basinPoints = new Set()
        basinPoints.add(JSON.stringify(deepPoint[1]))
        let prevSize = 0
        while(basinPoints.size > prevSize) {
            prevSize = basinPoints.size
            for(point of basinPoints) {
                const currentPoint = JSON.parse(point)
                const neighbours = allNeighbours(currentPoint[0], currentPoint[1]).filter(el => el[0] != 9)
                for(newPoint of neighbours) {
                    basinPoints.add(JSON.stringify(newPoint[1]))
                }
            }
        }
        allBasinSizes.push(basinPoints.size)
    }
    allBasinSizes.sort((a,b) => a-b)
    const basinLen = allBasinSizes.length
    return allBasinSizes[basinLen-3] * allBasinSizes[basinLen-2] * allBasinSizes[basinLen-1]
}
console.log(part2())
