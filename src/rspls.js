

const RpslsLogic = (p1, p2) => {
    let players =  [p1, p2]
    let turns = [null, null]

    players.forEach((player, idx) => {
        player.on('turn', (turn) => {
            onTurn(idx, turn)
        })
    })

    let sendToPlayers = (msg) => {
        players.forEach(player => player.emit('message', msg))
    }
    sendToPlayers('Rock Paper Scissor Lizard Spock Starts!')

    let sendToPlayer = (playerIndex, msg) => {
        players[playerIndex].emit('message', msg)
    }

    let onTurn = (playerIndex, turn) => {
        turns[playerIndex] = turn
        sendToPlayer(playerIndex, `You selected ${turn}`)
        checkGameOver()
    }

    let checkGameOver = () => {
        if (turns[0] && turns[1]) {
            sendToPlayers('Game over ' + turns.join(' : '))
            getGameResult()
            turns = [null, null]
            setTimeout(() => {sendToPlayers('Next round!!! Выбери знак!')}, 2000)
        }
    }

    let getGameResult = () => {
        const p0 = decodeTurn(turns[0])
        const p1 = decodeTurn(turns[1])

        const distance = (p0 - p1 + 5) % 5

        switch (distance) {
            case 0:
                sendToPlayers('Draw!')
                break
            case 1:
                sendWinMessage(players[0], players[1])
                break
            case 2:
                sendWinMessage(players[1], players[0])
                break
            case 3 :
                sendWinMessage(players[0], players[1])
                break
            case 4 :
                sendWinMessage(players[1], players[0])
                break
        }
    }

    let sendWinMessage = (winner, loser) => {
            winner.emit('message', 'You won!')
            loser.emit('message', 'You lost.')
        }

    let decodeTurn = (turn) => {
        switch (turn) {
            case 'rock':
                return 0
            case 'paper':
                return 1
            case 'scissor':
                return 2
            case 'spock':
                return 3
            case 'lizard':
                return 4
        }
    }

}

module.exports = RpslsLogic

