

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
    sendToPlayers('Игра Камень, Ножницы, Бумага, Ящерица, Спок начинается!')

    let sendToPlayer = (playerIndex, msg) => {
        players[playerIndex].emit('message', msg)
    }

    let onTurn = (playerIndex, turn) => {
        turns[playerIndex] = turn
        sendToPlayer(playerIndex, `Ваш выбор: ${turn}`)
        checkGameOver()
    }

    let checkGameOver = () => {
        if (turns[0] && turns[1]) {
            sendToPlayers('Игра окончена: ' + turns.join(' vs. '))
            getGameResult()
            turns = [null, null]
            setTimeout(() => {sendToPlayers('Новый раунд! Выбери знак!')}, 1500)
        }
    }

    let getGameResult = () => {
        const p0 = decodeTurn(turns[0])
        const p1 = decodeTurn(turns[1])

        const distance = (p0 - p1 + 5) % 5

        switch (distance) {
            case 0:
                sendToPlayers('Ничья!')
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
            winner.emit('message', ['Вы выиграли!', '+1'])
            loser.emit('message', 'Вы проиграли =(')
        }

    let decodeTurn = (turn) => {
        switch (turn) {
            case 'камень':
                return 0
            case 'бумага':
                return 1
            case 'ножницы':
                return 2
            case 'спок':
                return 3
            case 'ящерица':
                return 4
        }
    }
}

module.exports = RpslsLogic

