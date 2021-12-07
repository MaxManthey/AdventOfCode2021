const input = []
require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){input.push(line)})
let crabFormation = input[0].split(',').map(el => parseInt(el)).sort((a,b) => a-b)

const part1 = () => {
    let minFuelConsumption = crabFormation.reduce((acc, sum) => acc + sum, 0)
    for(let i = crabFormation[0]; i <= crabFormation[crabFormation.length - 1]; ++i) {
        let currentFuelConsumption = 0
        for(crabPos of crabFormation) {
            if(crabPos < i) currentFuelConsumption += i - crabPos
            else currentFuelConsumption += crabPos - i
        }
        if(currentFuelConsumption < minFuelConsumption) minFuelConsumption = currentFuelConsumption
    }
    return minFuelConsumption
}
console.log(part1())


const part2 = () => {
    let minFuelConsumption = Math.pow(crabFormation.reduce((acc, sum) => acc + sum, 0),2)
    for(let i = crabFormation[0]; i <= crabFormation[crabFormation.length - 1]; ++i) {
        let currentFuelConsumption = 0
        for(crabPos of crabFormation) {
            let distance
            if(crabPos < i) distance = i - crabPos
            else distance = crabPos - i
            if(distance%2 == 0) currentFuelConsumption += distance * (distance/2) + (distance/2)
            else currentFuelConsumption += distance * Math.ceil(distance/2)
        }
        if(currentFuelConsumption < minFuelConsumption) ind = i
        if(currentFuelConsumption < minFuelConsumption) minFuelConsumption = currentFuelConsumption
    }
    return minFuelConsumption
}
console.log(part2())
