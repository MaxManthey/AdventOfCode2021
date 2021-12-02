const input = []
require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){input.push(line)})

const part1 = () => {
    let depth = 0, horizontal = 0
    for(el of input) {
        el = el.split(" ")
        const command = el[0], unit = parseInt(el[1])
        if(command == "forward") horizontal += unit
        if(command == "down") depth += unit
        if(command == "up") depth -= unit
    }
    return depth * horizontal
}
console.log(part1())

const part2 = () => {    
    let depth = 0, horizontal = 0, aim = 0
    for(el of input) {
        el = el.split(" ")
        const command = el[0], unit = parseInt(el[1])
        if(command == "forward"){
            horizontal += unit
            depth += aim * unit
        }             
        if(command == "down") aim += unit
        if(command == "up") aim -= unit
    }
    return depth * horizontal
}
console.log(part2())