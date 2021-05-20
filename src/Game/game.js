import LogoBonus from "../image/logo-bonus.svg";
import LizardIcon from "../image/icon-lizard.svg";
import PaperIcon from "../image/icon-paper.svg";
import RockIcon from "../image/icon-rock.svg";
import ScissorsIcon from "../image/icon-scissors.svg";
import SpockIcon from "../image/icon-spock.svg";
import {Button, Container, Dialog, DialogActions} from "@material-ui/core";
import Rules from "../image/image-rules-bonus.svg";
import clsx from 'clsx'
import {socket} from '../App'
import {useEffect, useRef, useState} from "react";
import styles from './game.module.css'
import SendIcon from '@material-ui/icons/Send';
import useSound from "use-sound";
import WinSound from "../sound/You Win.mp3"
import LoseSound from "../sound/youre-a-loser.mp3"

export const Game = () => {
    const [play, { stop }] = useSound(WinSound)
    const [playLose, { stopLose }] = useSound(LoseSound)
    const [text, setText] = useState([])
    const [inputU, setInput] = useState()
    const [score, setScore] = useState(0)
    const [open, setOpen] = useState(false)

    //прокрутка сообщений в чате вниз
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [text]);

    useEffect(() => {
        socket.on('message', (messageText) => {
            const currentMessages = text
            const newMessages = currentMessages.concat(messageText)
            setText(newMessages)
            if (messageText.includes('+1')) {
                const scoreNum = score + 1
                setScore(scoreNum)
            }
            if (messageText.includes('Вы выиграли!')) {
                play()
            } else if (messageText.includes('Вы проиграли =(')) {
                playLose()
            }
        })
        return () => {
           socket.off('message');
        };
    }, [text]);



    const onChange = (e) => {
        setInput(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let messageText = inputU
        socket.emit('message', messageText)
        setInput('')
    }

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <Container maxWidth="lg" className={styles.container} >
            <div className={styles.titleBlockWrap}>
                <div className={styles.titleBlock}>
                    <div>
                        <img src={LogoBonus} alt='label'/>
                    </div>
                    <div className={styles.score}>
                        <div className={styles.scoreTitle}>Score</div>
                        <div className={styles.scoreNum} >{score}</div>
                    </div>
                </div>
            </div>
            <div className={styles.gameBlock}>
                <div className={styles.userChoice}>
                    <div className={styles.firstBlock}>
                        <img onClick={() => {socket.emit('turn', 'камень')}} className={ clsx(styles.rockCard, styles.gameCard) } src={RockIcon} alt='rock'/>
                    </div>
                    <div className={styles.secondBlock}>
                        <img onClick={() => {socket.emit('turn', 'спок')}} className={ clsx(styles.spockCard, styles.gameCard) } src={SpockIcon} alt='spock'/>
                        <img onClick={() => {socket.emit('turn', 'ножницы')}} className={ clsx(styles.scissorCard, styles.gameCard) } src={ScissorsIcon} alt='scissor'/>
                    </div>
                    <div className={styles.thirdBlock}>
                        <img onClick={() => {socket.emit('turn', 'ящерица')}} className={ clsx(styles.lizardCard, styles.gameCard) } src={LizardIcon} alt='lizard'/>
                        <img onClick={() => {socket.emit('turn', 'бумага')}} className={ clsx(styles.paperCard, styles.gameCard) } src={PaperIcon} alt='paper'/>
                    </div>
                </div>
                <div className={styles.chatWrapper}>
                    <form id="myForm"  onSubmit={onSubmit} >
                        <ul  className={styles.events}>
                            <li>Hi!</li>
                            {text.map((t) => {
                               return <li>{t}</li>
                            })}
                            <div ref={messagesEndRef} />
                        </ul>

                        <div className={styles.inputWrap}>
                            <input value={inputU} onChange={onChange} />
                            <Button type="submit" form="myForm" variant="contained" color="primary" ><SendIcon /></Button>
                        </div>
                        <Button onClick={handleClickOpen} fullWidth="true" className={styles.rules} variant="contained" color="primary" > Rules</Button>
                    </form>
                </div>
            </div>
            {/*<img src={Rules}/>*/}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <img style={{margin: "15px"}} src={Rules}/>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}