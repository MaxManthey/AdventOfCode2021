const input = []
require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){input.push(line)})

const part1 = (segments) => {
    return [...segments].map(el => el.split(" | ")).map(el => el = el[1]).map(el => el.split(" ").filter(seg => seg.length == 2 || seg.length == 3 || seg.length == 4 || seg.length == 7)).reduce((acc, sum) => acc + sum.length, 0)
}
console.log(part1(input))


const remainingLetters = (smallSeg, bigSeg) => {
    bigSeg = bigSeg.split(""), smallSeg = smallSeg.split("")
    for(el of smallSeg) {
        bigSeg = bigSeg.filter(char => char != el)
    }
    return bigSeg.join("")
}

//Have fun @David
const part2 = (inp) => {
    const line = [...inp].map(el => el.split(" | "))
    let result = 0
    for(segments of line) {
        const patterns = segments[0].split(" ")
        const output = segments[1].split(" ")
        const one = patterns.filter(el => el.length == 2)[0]
        const four = patterns.filter(el => el.length == 4)[0]
        const seven = patterns.filter(el => el.length == 3)[0]
        const eight = patterns.filter(el => el.length == 7)[0]
        const top = remainingLetters(one, seven)
        const len6 = patterns.filter(el => el.length == 6)
        const nine = len6.filter(el => remainingLetters(four+top, el).length == 1)[0]
        const bottom = remainingLetters(four+top, nine)
        const len5 = patterns.filter(el => el.length == 5)
        const three = len5.filter(el => remainingLetters(seven+bottom, el).length == 1)[0]
        const mid = remainingLetters(seven+bottom, three)
        const zero = len6.filter(el => !el.includes(mid))[0]
        const six = len6.filter(el => el!=zero && el!=nine)[0]
        const five = len5.filter(el => remainingLetters(el, six).length == 1)[0]
        const two = len5.filter(el => el!=three && el!=five)[0]

        let display = ""
        for(el of output) {
            el = el.split("").sort().join("")
            switch (el) {
                case zero.split("").sort().join(""):
                    display+="0"
                    break
                case one.split("").sort().join(""):
                    display+="1"
                    break
                case two.split("").sort().join(""):
                    display+="2"
                    break
                case three.split("").sort().join(""):
                    display+="3"
                    break
                case four.split("").sort().join(""):
                    display+="4"
                    break
                case five.split("").sort().join(""):
                    display+="5"
                    break
                case six.split("").sort().join(""):
                    display+="6"
                    break
                case seven.split("").sort().join(""):
                    display+="7"
                    break
                case eight.split("").sort().join(""):
                    display+="8"
                    break
                case nine.split("").sort().join(""):
                    display+="9"
                    break
                default:
                    console.log("ERROR")
                    break
            }
        }
        result += parseInt(display)        
    }
    return result
}
console.log(part2(input))
