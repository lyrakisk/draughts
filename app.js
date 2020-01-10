var express = require("express");
var http = require("http");
var indexRouter = require("./routes/index");
var websocket = require("ws");
var game = require("./game");
var stats = require("./statistics")

var port = process.argv[2];
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.set( 'port', ( process.env.PORT || 5000 ));



app.get("/", (req, res) => {
    res.render("splash.ejs", { gamesInitialized: stats.gamesInitialized, visitors: stats.visitors });
});

app.get("/game", indexRouter);

var server = http.createServer(app);
const wss = new websocket.Server({ server });

var websockets = [];//property: websocket, value: game


// regularly check if any of the games is aborted.
// this is useful, because if someone leaves the game during his turn, the other player will be notified
setInterval(function() {
    for(let i in websockets){
        if(websockets[i].playerB){
            if(websockets[i].abortedByPlayerA()){
                console.log("game " + websockets[i].id + " : player A left!");
            let message = {
                    aborted: true,
                    sb: "game aborted"
                }
                if(websockets[i].playerB.readyState == 1){
                    websockets[i].playerB.send(JSON.stringify(message));
                }
        }
        }
        if(websockets[i].playerA){
            if (websockets[i].abortedByPlayerB()){
                console.log("game " + websockets[i].id + " : player B left!");
                let message = {
                    aborted: true,
                    sb: "game aborted"
                    }
                if(websockets[i].playerA.readyState == 1){
                    websockets[i].playerA.send(JSON.stringify(message));
                }
            }
        }
    }
}, 10000);

var connectionID = 0;//each websocket receives a unique ID
var currentGame = new game(++stats.gamesInitialized);

wss.on("connection", function connection(ws){
	console.log("Someone connected!");
    stats.visitors++;
	let con = ws; 
    con.id = connectionID++;
    let playerType = currentGame.addPlayer(con);
    websockets[con.id] = currentGame;

    console.log("Player %s placed in game %s as %s", con.id, currentGame.id, playerType);

    let message = {
    	type: "player",
    	data: playerType,
    }
    
    if(playerType == "A"){
        message.sb = "waiting for opponent";
        con.send(JSON.stringify(message));
    }
    else{
        // if player b connected, the current game is ready to start and both players should be informed
        // player b just gets the player type which is coded below

        // if meanwhile player A left, the game will never start
        if(currentGame.abortedByPlayerA()){
            // do nothing
            console.log("player A left!");
            let message = {
                    aborted: true,
                    sb: "game aborted"
                }
            con.send(JSON.stringify(message)); // inform player B, that he is player B
            con.send(JSON.stringify(message));
        }
        else{
            message.sb = "opponent's turn"
            con.send(JSON.stringify(message)); // inform player B, that he is player B

            // send another message to both players
            message.type = "game-started";
            message.gameState = currentGame.gameState;
            message.board = currentGame.board;
            message.turn = currentGame.turn;

            con.send(JSON.stringify(message));
            playerA = currentGame.playerA;
            playerA.send(JSON.stringify(message));
        }
    }

    /* Once a game has two players, a new one is created immediatly to fit the next*/
    if (currentGame.hasTwoConnectedPlayers()) {
        currentGame = new game(stats.gamesInitialized++);
    }

	con.on("message", function incoming(message){
		// The message should contain an array, with the new state of the board
		let msg = JSON.parse(message);
		let game = websockets[con.id];
        if (msg.board){
            game.board = msg.board;
            game.changeTurn();
            // first check if both players are still connected
            if(game.abortedByPlayerA()){
                let message = {
                    aborted: true,
                    sb: "game aborted"
                }
                game.playerB.send(JSON.stringify(message));
            }
            else if (game.abortedByPlayerB()){
                let message = {
                    aborted: true,
                    sb: "game aborted"
                }
                game.playerA.send(JSON.stringify(message));
            }
            // then check if someone won
            else if(game.aWon()){
                let message = {
                    winner: "A",
                    board: game.board
                }
                console.log("player a won!")
                game.playerA.send(JSON.stringify(message));
                game.playerB.send(JSON.stringify(message));
            }
            else if(game.bWon()){
                let message = {
                    winner: "B",
                    board: game.board
                }
                console.log("player b won!")
                game.playerA.send(JSON.stringify(message));
                game.playerB.send(JSON.stringify(message));
            }
            else{
                game.board = msg.board;
                let message = {
                    turn: game.turn,
                    board: game.board
                };
                game.playerA.send(JSON.stringify(message));
                game.playerB.send(JSON.stringify(message));
            }
        }
	});
});



// server.listen(port);
// Start node server
server.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });
