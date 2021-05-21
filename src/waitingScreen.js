import {Button, Container} from '@material-ui/core'
import Billy from './image/pngegg.png'
import { socket } from './App.js'
import { useState } from "react"
import { Redirect } from 'react-router-dom'
import styles from './WaitingScreen/waitingScreen.module.css'
import BloodyPhrase from './image/bloodyPhrase.png'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import BillySound from './sound/I  Want to play a game.mp3'
import useSound from "use-sound"

export const WaitingScreen = (props) => {
    const [redirect, setRedirect] = useState(false)
    const [open, setOpen] = useState(false)
    const [play, { stop }] = useSound(BillySound)

    socket.on('redirect', () => {
        setRedirect(true)
    })

    //всплывающее окно подтверждения
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // Копирование ссылки по клику
    let copyLink = () => {
            let range = document.createRange();
            range.selectNode(document.getElementById("copyText"));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand("copy");
            window.getSelection().removeAllRanges();
            setOpen(true)
    }

    return (
        <Container maxWidth="sm" className={styles.container} >
            {redirect && <Redirect to={`/id/${props.socketId}`} />}
            <img className={styles.billySay} src={BloodyPhrase}/>
            <p className={styles.request}>Скопируйте ссылку и перешлите её второму игроку</p>
            <div className={styles.linkBlock}>
                <p id="copyText" className={styles.copyText}>{"https://rpsls-on-react-and-socket-io.herokuapp.com/id" + props.socketId}</p>
                <Button onClick={copyLink} variant="contained" color="secondary" className={styles.button}>Скопировать ссылку</Button>
                <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Ссылка скопирована
                    </Alert>
                </Snackbar>
            </div>
            <img onMouseEnter={play} onMouseLeave={stop} className={styles.image} src={Billy} />
        </Container>
    )
}