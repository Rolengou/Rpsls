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
import {useState} from "react";
import styles from './game.module.css'
import SendIcon from '@material-ui/icons/Send';

export const Game = () => {

    const [text, setText] = useState([])
    const [inputU, setInput] = useState()
    const [score, setScore] = useState(0)
    const [open, setOpen] = useState(false)

    socket.on('message', (messageText) => {
        const currentMessages = text
        const newMessages = currentMessages.concat(messageText)
        setText(newMessages)
        if (messageText.includes('+1')) {
            const scoreNum = score + 1
            setScore(scoreNum)
        }

    })

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
                        <img onClick={() => {socket.emit('turn', 'rock')}} className={ clsx(styles.rockCard, styles.gameCard) } src={RockIcon} alt='rock'/>
                    </div>
                    <div className={styles.secondBlock}>
                        <img onClick={() => {socket.emit('turn', 'spock')}} className={ clsx(styles.spockCard, styles.gameCard) } src={SpockIcon} alt='spock'/>
                        <img onClick={() => {socket.emit('turn', 'scissor')}} className={ clsx(styles.scissorCard, styles.gameCard) } src={ScissorsIcon} alt='scissor'/>
                    </div>
                    <div className={styles.thirdBlock}>
                        <img onClick={() => {socket.emit('turn', 'lizard')}} className={ clsx(styles.lizardCard, styles.gameCard) } src={LizardIcon} alt='lizard'/>
                        <img onClick={() => {socket.emit('turn', 'paper')}} className={ clsx(styles.paperCard, styles.gameCard) } src={PaperIcon} alt='paper'/>
                    </div>
                </div>
                <div className={styles.chatWrapper}>
                    <form id="myForm"  onSubmit={onSubmit} >
                        <ul className={styles.events}>
                            {text.map((t) => {
                               return <li>{t}</li>
                            })}
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