(function setup(){
	updateBoard();

	var url =  location.host;
	console.log(url);
	var socket = new WebSocket("wss:" + url);
	var message = {};
	// document.body.mozRequestFullScreen();
	// every time the player receives a message from the server, it is his time to play
	socket.onmessage = function(event){
		myTurn = true;
		let msg = JSON.parse(event.data);

		if(msg.aborted){
			disableBoard();
		}

		if(msg.type == "player"){
			player = msg.data;
		}

		if (msg.winner){
			 if(msg.winner == player){
				$("#status-bar").html("You won!");
			}
			else{
				$("#status-bar").html("You lost");
			}
		}

		if(msg.board){
			board = msg.board;
			updateBoard();
		}
		// update status bar
		if(msg.sb){
			$("#status-bar").html("Player " + player + " : " + msg.sb);
		}

		// if the message has a turn, it means that the game has started
		if(msg.turn){
			if (msg.turn == player){
				myTurn = true;
				$("#status-bar").html("Player " + player + " : " + "your turn");
				enableBoard();
			}
			else{
				myTurn = false;
				$("#status-bar").html("Player " + player + " : " + "waiting for opponents move");
				disableBoard();
			}
		}
		updateEventListeners();
	};


	$(".block").click(function(){
		let coordinates = getCoordinates($(this).attr("id"));
		let m = coordinates[0];
		let n = coordinates[1];
		let i = clicked[0];
		let j = clicked[1];
		if (isLegalMove([m,n])){
			legalMoves.splice(0, legalMoves.length); // fixes a bug where pawns would disapear after moving to its new position
			// show_legalMoves();
			
			board[m][n] = board[i][j];
			if (i > m && j > n){
				while(i != m){
					board[i][j] = 0;
					i--;
					j--;
				}
			}
			else if (i > m && j < n){
				while(i != m){
					board[i][j] = 0;
					i--;
					j++;
				}
			}
			else if (i < m && j > n ){
				while(i != m){
					board[i][j] = 0;
					i++;
					j--;
				}
			}
			else if (i < m && j < n){
				while(i != m){
					board[i][j] = 0;
					i++;
					j++;
				}
			}
			// inform the server
			message.board = board;
			socket.send(JSON.stringify(message));
			updateBoard();
			updateEventListeners();
		}
	});

})();