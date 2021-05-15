import LogoBonus from "./image/logo-bonus.svg";
import LizardIcon from "./image/icon-lizard.svg";
import PaperIcon from "./image/icon-paper.svg";
import RockIcon from "./image/icon-rock.svg";
import ScissorsIcon from "./image/icon-scissors.svg";
import SpockIcon from "./image/icon-spock.svg";
import {Button, Container} from "@material-ui/core";
import Rules from "./image/image-rules-bonus.svg";
import {useStyles} from "./waitingScreen";
import clsx from 'clsx'
import {socket} from './App'
import {useState} from "react";

export const Game = () => {
    const styles= useStyles()
    const [text, setText] = useState()
    socket.on('message', (text) => {
        setText(text)
    })

    return (
        <Container className={styles.container} maxWidth="sm">
            <div className={styles.titleBlock}>
                <div>
                    <img src={LogoBonus} alt='label'/>
                </div>
                <div className={styles.score}>
                    <div className={styles.scoreTitle}>Score</div>
                    <div >1</div>
                </div>
            </div>
            <div className={styles.userChoice}>
                <img onClick={() => {socket.emit('turn', 'rock')}} className={ clsx(styles.rockCard, styles.gameCard) } src={RockIcon} alt='rock'/>
                <img onClick={() => {socket.emit('turn', 'paper')}} className={ clsx(styles.paperCard, styles.gameCard) } src={PaperIcon} alt='paper'/>
                <img onClick={() => {socket.emit('turn', 'scissor')}} className={ clsx(styles.scissorCard, styles.gameCard) } src={ScissorsIcon} alt='scissor'/>
                <img onClick={() => {socket.emit('turn', 'spock')}} className={ clsx(styles.spockCard, styles.gameCard) } src={SpockIcon} alt='spock'/>
                <img onClick={() => {socket.emit('turn', 'lizard')}} className={ clsx(styles.lizardCard, styles.gameCard) } src={LizardIcon} alt='lizard'/>
            </div>
                <p style={{color: "white"}}>{text}</p>
            <Button className={styles.rules} variant="contained" > Rules</Button>
            {/*<img src={Rules}/>*/}
        </Container>
    )
}