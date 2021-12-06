let input = []
require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){input.push(line)})
input = input[0].split(",").map(el => parseInt(el))

const part1 = (inp) => {
    let existingFish = inp.slice()
    for(let i = 0; i < 80; ++i) {
        const currentLen = existingFish.length
        for(let j = 0; j < currentLen; ++j) {
            if(existingFish[j] == 0) {
                existingFish[j] = 7
                existingFish.push(9)
            }
        }
        existingFish = existingFish.map(fish => --fish)
    }
    return existingFish.length
}
console.log(part1(input))

const part2 = (inp) => {
    let fishReproductionDays = []
    for(let i = 0; i < 9; ++i) fishReproductionDays.push(0)
    for(fish of inp) fishReproductionDays[fish] += 1

    for(let i = 0; i < 256; ++i) {
        const copyExistingFish = fishReproductionDays.slice()
        for(let i = 0; i < 8; ++i) {
            fishReproductionDays[i] = copyExistingFish[i+1]
        }
        fishReproductionDays[6] += copyExistingFish[0]
        fishReproductionDays[8] = copyExistingFish[0]
    }
    return fishReproductionDays.reduce((acc, sum) => acc+sum, 0)
}
console.log(part2(input))