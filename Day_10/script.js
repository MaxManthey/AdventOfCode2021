const input = []
require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){input.push(line.split(''))})


const part1 = (inp) => {
    const braces = [...inp]
    const openingBraces = ['{', '[', '(', '<']
    const closingBraces = ['}', ']', ')', '>']
    const pointSystem = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    }
    let score = 0
    
    for(line of braces) {
        let queueBraces = []
        for(brace of line) {
            if(openingBraces.includes(brace)) {
                queueBraces.push(brace)
            } else {
                const lastBrace = queueBraces.pop()
                if(openingBraces.indexOf(lastBrace) != closingBraces.indexOf(brace)) {
                    score += pointSystem[brace]
                    break
                }
            }
        }
    }    
    return score
}
console.log(part1(input))


const part2 = (inp) => {
    const braces = [...inp]
    const openingBraces = ['{', '[', '(', '<']
    const closingBraces = ['}', ']', ')', '>']
    const pointSystem = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    }
    let remainingStacks = []
    let allScores = []
    
    for(line of braces) {
        let queueBraces = []
        let lineIsCorrupted = false
        for(brace of line) {
            if(openingBraces.includes(brace)) {
                queueBraces.push(brace)
            } else {
                const lastBrace = queueBraces.pop()
                if(openingBraces.indexOf(lastBrace) != closingBraces.indexOf(brace)) {
                    lineIsCorrupted = true
                    break
                }
            }
        }
        if(!lineIsCorrupted) remainingStacks.push(queueBraces)
    }
    
    for(stack of remainingStacks) {
        let lineScore = 0
        let missingBraces = []
        for(brace of stack) missingBraces.push(closingBraces[openingBraces.indexOf(brace)])
        missingBraces.reverse()
        for(brace of missingBraces) lineScore = (lineScore * 5) + pointSystem[brace]
        allScores.push(lineScore)
    }
    allScores.sort((a,b) => a-b)
    return allScores[Math.floor(allScores.length/2)]
}
console.log(part2(input))
