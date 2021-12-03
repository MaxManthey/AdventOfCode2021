const input = []
require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){input.push(line)})

const part1 = () => {
    let gamma = "", epsilon = ""
    for(let i = 0; i < input[i].length; ++i) {
        let ones = 0, zeros = 0
        for(line of input) {
            const num = line.charAt(i)
            if(num == 1) ++ones
            if(num == 0) ++zeros
        }
        if(ones > zeros) gamma += "1"
        else gamma += "0"
    }
    for(num of gamma) {
        if(num == 1) epsilon += "0"
        else epsilon += "1"
    }
    return parseInt(gamma, 2) * parseInt(epsilon, 2)
}
console.log(part1())


const getCorrectNum = (getOx, binArr) => {
    let count = 0
    while (binArr.length > 1) {
        let ones = 0, zeros = 0
        for(line of binArr) {
            const num = line.charAt(count)
            if(num == '1') ++ones
            if(num == '0') ++zeros
        }        
        let filterNum;
        if(getOx) {
            if(ones < zeros) filterNum = 0
            else filterNum = 1
        } else {
            if(ones < zeros) filterNum = 1
            else filterNum = 0
        }
        binArr = binArr.filter(el => el.charAt(count) == filterNum.toString())
        ++count
    }
    return binArr[0]
}

const part2 = () => {
    let oxygenArr = input.slice(), co2Arr = input.slice()
    const oxNum = getCorrectNum(true, oxygenArr)    
    const co2Num = getCorrectNum(false, co2Arr)
    return parseInt(oxNum, 2) * parseInt(co2Num, 2)
}
console.log(part2())
