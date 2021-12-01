const input = []
require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){input.push(parseInt(line))})

const part1 = (depthInput) => {
    let previousNum = depthInput[0]
    let amountIncreased = 0
    for(let i = 1; i < depthInput.length; ++i) {
        if(depthInput[i] > previousNum) ++amountIncreased     
        previousNum = depthInput[i]
    }    
    return amountIncreased
}
console.log(part1(input))

const part2 = () => {
    let depthSlidingWindow = []
    for(let i = 0; i < input.length - 2; ++i) {        
        depthSlidingWindow.push(input[i] + input[i+1] + input[i+2])
    }
    return part1(depthSlidingWindow)
}
console.log(part2())
