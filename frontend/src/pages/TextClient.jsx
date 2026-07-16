import { useEffect, useState } from "react"
import { useUser } from "../UserContext"
import { Navbar } from "../Navbar"

function TextClient() {
    const user = useUser()
    let connections = localStorage.getItem("connections") || []

    const handleConnection = async (event) => {
        if (event.key === 'Enter') {
            console.log(event.target.value)
            // try {
            //     // old code from sending command to multiworld locally - need to rework to be counted as a specific slot connecting
            //     // const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/command/${roomId}`, {
            //     //     method: "POST",
            //     //     headers: { 'Content-Type': 'application/json' },
            //     //     body: JSON.stringify({ command: event.target.value }),
            //     //     credentials: "include"
            //     // })

            //     // const result = await response.json()

            //     // if (!response.ok) {
            //     //     console.log("Failed to send command to server")
            //     // }
            //     console.log(event.target.
            // } catch (error) {
            //     console.error("Error: " + error)
            // }

            // clears the text fields
            const serverPort = document.getElementById('server-port').value
            const slots = document.getElementById('slots').value.split(",").map(item => item.trim())
            if (connections.includes([serverPort, slots])) {
                connections = connections.filter(item => item != [serverPort, slots])
            }
            connections = [[serverPort, slots], ...connections]

            if (connections.length > 5) {
                connections = connections.slice(1)
            }

            document.getElementById('server-port').value = ''
            document.getElementById('slots').value = ''

            // store data locally
            localStorage.setItem("connections", connections)

            for (let i = 0; i < connections.length; i++) {
                
            }

            document.getElementById('connections').setHTMLUnsafe("<p>Recent Connections: </p>")
        }
    }

    // testing
    connections = [["archipelago.csh.rit.edu", ["malware-flips", "malware-soh", "malware-sudoku"]], ["archipelago-dev.csh.rit.edu", ["malware-chess"]], ["archipelago.csh.rit.edu", ["malware-celeste", "malware-hk"]], ["archipelago.gg", ["malware-flips", "malware-soh", "malware-sudoku"]]]
    connections = [["archipelago.gg", ["malware-celeste", "malware-hk"]], ...connections]

    return (
        <div>
            <title>Text Client</title>
            <Navbar user={user}></Navbar>
            <div className="text-center">
                <h1>Text Client</h1>
                {/* set to only appear when connected */}
                {/* <div className="d-flex gap-3 justify-content-center">
                    <button className="btn btn-primary" id="text">Text Client</button>
                    <button className="btn btn-primary" id="hint">Hints</button>
                    <button className="btn btn-primary" id="tracker">Tracker</button>
                    <button className="btn btn-secondary" id="disconnect">Disconnect</button>
                </div> */}
            </div>
            <div id="connecting">
                <div className="d-flex flex-wrap justify-content-center" style={{marginTop: 30, justifyContent: "center"}}>
                    <input type="text" id="server-port" placeholder="Enter the server and port (eg. archipelago.csh.rit.edu:38290)" style={{width: '500px', marginBottom: '10px', marginRight: '20px'}} />
                    <input type="text" id="slots" placeholder="Enter the slot(s) you want to connect to (eg: player-game)" style={{width: '500px', marginBottom: '10px', marginRight: '20px'}} />
                    <button className="btn btn-primary" id="connect" onClick="handleClick">Connect</button>
                </div>
                <div id="connections" className="d-flex flex-wrap justify-content-center gap-1">
                    <p>Recent Connections: </p>
                    { connections.length > 0 ? (
                        <button className="btn btn-secondary" id="connection1">{connections[0][0]} -- {connections[0][1].join(", ")}</button>
                    ) : ( null ) }
                    { connections.length > 1 ? (
                        <button className="btn btn-secondary" id="connection2">{connections[1][0]} -- {connections[1][1].join(", ")}</button>
                    ) : ( null ) }
                    { connections.length > 2 ? (
                        <button className="btn btn-secondary" id="connection3">{connections[2][0]} -- {connections[2][1].join(", ")}</button>
                    ) : ( null ) }
                    { connections.length > 3 ? (
                        <button className="btn btn-secondary" id="connection4">{connections[3][0]} -- {connections[3][1].join(", ")}</button>
                    ) : ( null ) }
                    { connections.length > 4 ? (
                        <button className="btn btn-secondary" id="connection5">{connections[4][0]} -- {connections[4][1].join(", ")}</button>
                    ) : ( null ) }
                </div>
            </div>
        </div>
    )
}

export default TextClient