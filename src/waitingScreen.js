import {Container, makeStyles, TextField} from '@material-ui/core'
import Billy from './image/pngegg.png'
import Pentagon from './image/bg-pentagon.svg'
import {socket} from './App'
import {useState, useEffect} from "react"
import { useHistory } from 'react-router-dom';


export const useStyles = makeStyles((theme) => ({
    container: {
        background: "radial-gradient(circle at top, hsl(214, 47%, 23%), hsl(237, 49%, 15%))",
        height: "800px",
        maxWidth: "1200px",
        display: "flex",
         alignItems: "center",
        justifyContent: "top",
        flexDirection: "column"
    },
    text: {
        color: "white",
        fontSize: "35px"
    },
    rules: {
        width: "100px",
        height: "30px",
        color: "white"
    },
    titleBlock: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "700px",
        border: "2px solid hsl(217, 16%, 45%)",
        borderRadius: "15px",
        padding: "17px 22px 16px 31px",
        margin: "0 0 47px",
    },
    score: {
        display: "flex",
        background: "white",
        width: "150px",
        borderRadius: "10px",
        alignItems: "center",
        height: "115px",
        padding: "14px 0 0",
        flexFlow: "column nowrap"

    },
    scoreTitle: {
        color: "hsl(229, 25%, 31%)",
        fontSize: "30px",
        lineHeight: ".9",
        fontWeight: "700",
    },
    userChoice: {
        background: `center / contain no-repeat url(${Pentagon})`,
        backgroundSize: "400px",
        width: "100%",
        maxWidth: "700px",
        position: "relative",
        height: "467px",
        marginBottom: "50px"
    },
    gameCard: {
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        borderRadius: "50%",
        cursor:" pointer",
        padding: "10px",
        objectFit: "contain",
        width: "125px",
        height: "125px",
        boxShadow: "inset 0 3px 5px hsl(229, 25%, 31%)",
        background: "white",
        position: "absolute",
    },

    scissorCard: {
        background: "white",
        top: "0",
        left: "278px",
    },
    paperCard: {
        background: "white",
        top: "130px",
        right: "115px",
    },
    rockCard: {
        background: "white",
        bottom: "0",
        right: "178px",
    },
    lizardCard: {
        background: "white",
        bottom: "0",
        left: "180px",
    },
    spockCard: {
        background: "white",
        top: "130px",
        left: "115px",
    },
    copyText: {
        backgroundColor: "grey",
        padding: "10px",
        display: "flex",
        //flexDirection: "column"
    }

}));

export const WaitingScreen = (props) => {
    const styles= useStyles()
    const [redirect, setRedirect] = useState()
    const history = useHistory()

    useEffect(() => {
        if (redirect) {
            history.push(`/game/${props.socketId}`)
        }
    }, [redirect])

    socket.on('redirect', () => {
        setRedirect(true)
    })



    console.log(redirect)


    return (
        <Container className={styles.container} maxWidth="sm">
            {/*{ redirect && <Redirect to='/game' /> }*/}
            <div>
                <p className={styles.copyText}>{"localhost:3000/#/game/" + props.socketId}</p>
                <button>Bla</button>
            </div>
            <img src={Billy} />


        </Container>
    )
}