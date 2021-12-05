const input = []
require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){input.push(line)})

const modifyInput = (inp) => {
    let p1Arr = inp.slice()
    let bingoNums = p1Arr.shift().split(",").map(num => parseInt(num))
    p1Arr.shift()
    let bingoCards = [], currentCard = []    
    for(el of p1Arr) {
        if(el.length == 0) {
            bingoCards.push(currentCard)
            currentCard = []
        } else currentCard.push(el.split(" ").filter(el => el.length > 0).map(el => parseInt(el)))
    }
    bingoCards.push(currentCard)
    return {bingoNums, bingoCards}
}

const calculateWinningResult = ({winningCard, lastNum}) => {
    let remainingSum = 0
    for(line of winningCard) remainingSum += line.filter(el => el != "*").reduce((acc, el) => acc+el,0)
    return remainingSum * lastNum
}


const part1 = ({bingoNums, bingoCards}) => {
    let lastNum;    
    let gameWon = false;
    let winningCard;

    for(num of bingoNums) {    
        lastNum = num
        bingoCards = bingoCards.map(card =>
            card = card.map(line =>
                line = line.map(el => {
                    if(el == num){
                        return "*"
                    } else return el
                })
            )
        )
        for(let i = 0; i < bingoCards.length; ++i) {
            let cols = [[],[],[],[],[]]
            if(!gameWon) {
                winningCard = bingoCards[i]
                for(line of bingoCards[i]) {
                    const rowWon = line.filter(el => el != "*").length == 0
                    if(rowWon) {
                        gameWon = true
                        break
                    }
                    let currentEl = 0
                    for(el of line) {
                        cols[currentEl].push(el)
                        ++currentEl
                    }
                }
            }
            if(!gameWon) {
                for(line of cols) {
                    const colWon = line.filter(el => el != "*").length == 0
                    if(colWon) {
                        gameWon = true
                        break
                    }
                }
            }
        }
        if(gameWon) break
    }    
    return {winningCard, lastNum}
}
console.log(calculateWinningResult(part1(modifyInput(input))))


const part2 = ({bingoNums, bingoCards}) => {    
    while(bingoCards.length > 1) {
        let cardsToChange = newCards = JSON.parse(JSON.stringify(bingoCards))
        const {winningCard, lastNum} = part1({bingoNums, "bingoCards": cardsToChange})        
        newCards = newCards.map(card => {
            for(let i = 0; i < winningCard.length; ++i) {
                for(let j = 0; j < winningCard[i].length; ++j) {
                    if(winningCard[i][j] == '*') card[i][j] = '*'
                }
            }
            return card
        })
        let counter = 0, cardToRemove
        for(card of newCards) {
            if(JSON.stringify(card) == JSON.stringify(winningCard)) cardToRemove = counter
            ++counter
        }        
        bingoCards.splice(cardToRemove, 1)
    }
    return part1({bingoNums, "bingoCards": bingoCards})
}
console.log(calculateWinningResult(part2((modifyInput(input)))))