let input = []
require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){input.push(line)})
input = input.map(line => line = line.split(" -> ").map(point => point = point.split(",").map(el => parseInt(el))))

const correctSize = (num) => {
    if(num < 100) {
        if(num < 10) x = "00"+num.toString()
        else num = "0"+num.toString()
    } else num = num.toString()
    return num
}

const part1 = () => {
    let pointsTouched = {}
    let points = JSON.parse(JSON.stringify(input))

    for(line of points) {
        const x1 = line[0][0], y1 = line[0][1], x2 = line[1][0], y2 = line[1][1]
        let pointsToAdd = []
        
        if(x1 == x2) { //Vertical Line
            let smaller = y1
            let bigger = y2
            if(y1 > y2) {
                smaller = y2
                bigger = y1
            }
            let x = correctSize(x1)
            for(let i = smaller; i <= bigger; ++i) {
                let y = i
                if(i < 100) {
                    if(i < 10) pointsToAdd.push(x+("00"+i.toString()))
                    else pointsToAdd.push(x+("0"+i.toString()))
                } else pointsToAdd.push(x+i.toString())
            }
        } else if(y1 == y2) { //Horizontal Line
            let smaller = x1
            let bigger = x2
            if(x1 > x2) {
                smaller = x2
                bigger = x1
            }
            let y = correctSize(y1)
            for(let i = smaller; i <= bigger; ++i) {
                let x = i
                if(i < 100) {
                    if(i < 10) pointsToAdd.push(("00"+i.toString())+y)
                    else pointsToAdd.push(("0"+i.toString())+y)
                } else pointsToAdd.push(i.toString()+y)
            }
        }

        for(point of pointsToAdd) { 
            if(pointsTouched[point] == undefined) pointsTouched[point] = 1
            else pointsTouched[point] = ++pointsTouched[point]
        }
    }
    return pointsTouched
}
console.log(Object.values(part1()).filter(el => el > 1).length)


const part2 = () => {
    let pointsTouched = part1()
    let points = JSON.parse(JSON.stringify(input))

    for(line of points) {
        let x1 = line[0][0], y1 = line[0][1], x2 = line[1][0], y2 = line[1][1]
        let pointsToAdd = []
        
        if(x1 == x2){} //Vertical line            
        else if(y1 == y2){} //Horizontal line
        else { //Diagonal line
            if(x1 > x2) {
                let xCopy = x1
                let yCopy = y1
                x1 = x2
                y1 = y2
                x2 = xCopy
                y2 = yCopy
            }
            if(y1 < y2) { //up                
                for(let i = y1; i <= y2; ++i) {
                    let xStr = correctSize(x1)
                    let yStr = correctSize(i)
                    pointsToAdd.push(xStr+yStr)
                    ++x1
                }
            } else { //down
                for(let i = y1; i >= y2; --i) {
                    let xStr = correctSize(x1)
                    let yStr = correctSize(i)
                    pointsToAdd.push(xStr+yStr)
                    ++x1
                }
            }
        }

        for(point of pointsToAdd) { 
            if(pointsTouched[point] == undefined) pointsTouched[point] = 1
            else pointsTouched[point] = ++pointsTouched[point]
        }
    }
    return Object.values(pointsTouched).filter(el => el > 1).length
}
console.log(part2())