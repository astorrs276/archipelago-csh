import { useEffect, useState } from "react"
import { useUser } from "../UserContext"
import { Navbar } from "../Navbar"

function TextClient() {
    const user = useUser()
    let connections = localStorage.getItem("connections") || []

    const handleConnection = async (event) => {
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
        // } catch (error) {
        //     console.error("Error: " + error)
        // }

        // gets the data on the most recent attempt to connect


        try {
            // gets the server, port, and slots to connect to
            const serverPort = document.getElementById('server-port').value
            const slots = document.getElementById('slots').value.split(",").map(item => item.trim())

            // updates the list of recent connections, deleting the most recent attept from the list if it already was there to add it to the beginning, and deleting the oldest item if there's more than 5 in memory
            if (connections.includes([serverPort, slots])) {
                connections = connections.filter(item => item != [serverPort, slots])
            }
            connections = [[serverPort, slots], ...connections]


            if (connections.length > 5) {
                connections = connections.slice(0, -1)
            }


            // clears the input fields
            document.getElementById('server-port').value = ''
            document.getElementById('slots').value = ''
            
            // store data locally
            // localStorage.setItem("connections", connections)

            // display connection
            document.getElementById("connectedTo").innerText = "Connected to: " + serverPort

        } catch (error) {
            console.error("Error: " + error)
        }

    }

    const fillConnection = ([serverPort, slots]) => {
        // const fullInfo = event.target.value
        // const serverPort = fullInfo.split("--")[0].trim()
        // const slots = fullInfo.split("--")[1].trim()

        document.getElementById('server-port').value = serverPort
        document.getElementById('slots').value = slots.join(", ")
    }

    // testing
    connections = [["archipelago.csh.rit.edu:38281", ["malware-flips", "malware-soh", "malware-sudoku"]], ["archipelago-dev.csh.rit.edu:38281", ["malware-chess"]], ["archipelago.csh.rit.edu:38281", ["malware-celeste", "malware-hk"]], ["archipelago.gg:38281", ["malware-flips", "malware-soh", "malware-sudoku"]]]
    connections = [["archipelago.gg:38281", ["malware-celeste", "malware-hk"]], ...connections]

    return (
        <div>
            <title>Text Client</title>
            <Navbar user={user}></Navbar>
            <h1 className="text-center">Text Client</h1>
            <div id="connecting">
                <div className="d-flex flex-wrap justify-content-center" style={{marginTop: 30, justifyContent: "center"}}>
                    <input type="text" id="server-port" placeholder="Enter the server and port (eg. archipelago.csh.rit.edu:38290)" style={{width: '500px', marginBottom: '10px', marginRight: '20px'}} />
                    <input type="text" id="slots" placeholder="Enter the slot(s) you want to connect to (eg: player-game)" style={{width: '500px', marginBottom: '10px', marginRight: '20px'}} />
                    <button className="btn btn-primary" id="connect" onClick={handleConnection} style={{marginBottom: 5}}>Connect</button>
                </div>
                <div id="connections" className="d-flex flex-wrap justify-content-center gap-1">
                    <p>Recent Connections: </p>
                    { connections.length > 0 ? (
                        <button className="btn btn-secondary" id="connection1" onClick={() => fillConnection(connections[0])}>{connections[0][0]} -- {connections[0][1].join(", ")}</button>
                    ) : ( null ) }
                    { connections.length > 1 ? (
                        <button className="btn btn-secondary" id="connection2" onClick={() => fillConnection(connections[1])}>{connections[1][0]} -- {connections[1][1].join(", ")}</button>
                    ) : ( null ) }
                    { connections.length > 2 ? (
                        <button className="btn btn-secondary" id="connection3" onClick={() => fillConnection(connections[2])}>{connections[2][0]} -- {connections[2][1].join(", ")}</button>
                    ) : ( null ) }
                    { connections.length > 3 ? (
                        <button className="btn btn-secondary" id="connection4" onClick={() => fillConnection(connections[3])}>{connections[3][0]} -- {connections[3][1].join(", ")}</button>
                    ) : ( null ) }
                    { connections.length > 4 ? (
                        <button className="btn btn-secondary" id="connection5" onClick={() => fillConnection(connections[4])}>{connections[4][0]} -- {connections[4][1].join(", ")}</button>
                    ) : ( null ) }
                </div>
            </div>

            <div id="connected" style={{marginTop: 15}}>
                <p className="d-flex justify-content-center" id="connectedTo"></p>
                <div className="d-flex gap-3 justify-content-center">
                    <button className="btn btn-primary" id="text">Text Client</button>
                    <button className="btn btn-primary" id="hint">Hints</button>
                    <button className="btn btn-primary" id="tracker">Tracker</button>
                    <button className="btn btn-secondary" id="disconnect">Disconnect</button>
                </div>
                {/* log code from Room page, need to rework for this */}
                {/* <div style={{marginBottom: '20px', height: '500px', overflowY: 'scroll'}} ref={bottomRef}>
                    {log.map((line, index) => (
                        <p style={{margin: '0'}} key={index}>{line}</p>
                    ))}
                </div> */}
            </div>
        </div>
    )
}

export default TextClient