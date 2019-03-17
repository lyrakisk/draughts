/* basic constructor*/
var game = function(gameID){
	this.board = [[0, 1, 0, 1, 0, 1, 0, 1, 0, 1], 
				  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
				  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
				  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
				  [2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
				  [0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
				  [2, 0, 2, 0, 2, 0, 2, 0, 2, 0]];
	this.playerA = null;
	this.playerB = null;
	this.id = gameID;
	this.gameState = "0 JOINT"; 
	this.turn = "A"; // can be either "A" or "B"
	this.changeTurn = function(){
		if(this.turn == "A"){
			this.turn = "B";
		}
		else{
			this.turn = "A";
		}
	}
};

game.prototype.hasTwoConnectedPlayers = function () {
    return (this.gameState == "2 JOINT");
};

game.prototype.addPlayer = function (p){
	if (this.gameState != "0 JOINT" && this.gameState != "1 JOINT"){
		console.log("wrong call to addPlayer");
	}

	if (this.playerA == null){
		this.playerA = p;
		this.gameState = "1 JOINT";
		return "A";
	}
	else if(this.playerB == null){
		this.gameState = "2 JOINT";
		this.playerB = p;
		return "B";
	}
};

game.prototype.abortedByPlayerA = function(){
	if(this.playerA){
		if(this.playerA.readyState != 1){
		return true;
		}
	}
};

game.prototype.abortedByPlayerB = function(){
	if(this.playerB){
		if(this.playerB.readyState != 1){
			return true;
		}
	}
};

game.prototype.aPawnLegalMoves = function player_1_pawn_get_legalMoves(board, coordinates){
	let i = coordinates[0];
	let j = coordinates[1];
	let result = [];

	// first check if the pawn is at the board's edge
	if(i+1 < board.length && j+1 < board.length){
		if (board[i+1][j+1]==0){
			result.push([i+1, j+1])
		}
		else if(i+2 < board.length && i+2 < board.length){
			if(board[i+1][j+1] == 2 || board[i+1][j+1] == 22){
				if (board[i+2][j+2] == 0){
					result.push([i+2, j+2]);
				}
			}
		}
	}
	
	if(i+1 < board.length && j-1>=0){
		if (board[i+1][j-1] == 0){
			result.push([i+1, j-1]);
		}
		else if (i+2 < board.length && j-2>=0){
			if (board[i+1][j-1] == 2 || board[i+1][j-1] == 22){
				if(board[i+2][j-2] == 0){
					result.push([i+2, j-2]);
					}
				}
		}
	}
	return result;
}

game.prototype.aKingLegalMoves = function player_1_king_get_legalMoves(board, coordinates){
	let i = coordinates[0];
	let j = coordinates[1];
	let result = [];

	// first check if the pawn is at the board's edge
	if(i-1 >=0 && j-1 >= 0){
		if(board[i-1][j-1] == 0){
			result.push([i-1, j-1]);
		}
		else if(i-2 >= 0 && j-2 >= 0){
			if(board[i-1][j-1] == 2 || board[i-1][j-1] == 22){
				if(board[i-2][j-2] == 0){
					result.push([i-2,j-2]);
				}
			}
		}
	}

	if(i-1 >= 0 && j+1 < board.length){
		if(board[i-1][j+1] == 0){
			result.push([i-1,j+1]);
		}
		else if(i-2 >= 0 && j+1 < board.length){
			if (board[i-1][j+1] == 2 || board[i-1][j+1] == 22){
				if(board[i-2][j+2] == 0){
					result.push([i-2,j+2]);
				}
			}
		}
	}

	if(i+1 < board.length && j+1 < board.length){
		if (board[i+1][j+1]==0){
			result.push([i+1, j+1])
		}
		else if(i+2 < board.length && i+2 < board.length){
			if(board[i+1][j+1] == 2 || board[i+1][j+1] == 22){
				if (board[i+2][j+2] == 0){
					result.push([i+2, j+2]);
				}
			}
		}
	}

	if(i+1 < board.length && j-1>=0){
		if (board[i+1][j-1] == 0){
			result.push([i+1, j-1]);
		}
		else if (i+2 < board.length && j-2>=0){
			if (board[i+1][j-1] == 2 || board[i+1][j-1] == 22){
				if(board[i+2][j-2] == 0){
					result.push([i+2, j-2]);
					}
				}
		}
	}
	return result;

};

game.prototype.bPawnLegalMoves = function player_2_pawn__get_legalMoves(board, coordinates,){
	let i = coordinates[0];
	let j = coordinates[1];

	let result = [];
	
	if(i-1 >=0 && j-1 >= 0){
		if(board[i-1][j-1] == 0){
			result.push([i-1, j-1]);
		}
		else if(i-2 >= 0 && j-2 >= 0){
			if(board[i-1][j-1] == 1 || board[i-1][j-1] == 11){
				if(board[i-2][j-2] == 0){
					result.push([i-2,j-2]);
				}
			}
		}
	}

	if(i-1 >= 0 && j+1 < board.length){
		if(board[i-1][j+1] == 0){
			result.push([i-1,j+1]);
		}
		else if(i-2 >= 0 && j+1 < board.length){
			if (board[i-1][j+1] == 1 || board[i-1][j+1] == 11){
				if(board[i-2][j+2] == 0){
					result.push([i-2,j+2]);
				}
			}
		}
	}

	return result;
}

game.prototype.bKingLegalMoves = function player_2_king_get_legalMoves(board, coordinates){
	let i = coordinates[0];
	let j = coordinates[1];

	let result = [];

	// first check if the pawn is at the board's edge
	if(i-1 >=0 && j-1 >= 0){
		if(board[i-1][j-1] == 0){
			result.push([i-1, j-1]);
		}
		else if(i-2 >= 0 && j-2 >= 0){
			if(board[i-1][j-1] == 1 || board[i-1][j-1] == 11){
				if(board[i-2][j-2] == 0){
					result.push([i-2,j-2]);
				}
			}
		}
	}

	if(i-1 >= 0 && j+1 < board.length){
		if(board[i-1][j+1] == 0){
			result.push([i-1,j+1]);
		}
		else if(i-2 >= 0 && j+1 < board.length){
			if (board[i-1][j+1] == 1 || board[i-1][j+1] == 11){
				if(board[i-2][j+2] == 0){
					result.push([i-2,j+2]);
				}
			}
		}
	}

	if(i+1 < board.length && j+1 < board.length){
		if (board[i+1][j+1]==0){
			result.push([i+1, j+1])
		}
		else if(i+2 < board.length && i+2 < board.length){
			if(board[i+1][j+1] == 1 || board[i+1][j+1] == 11){
				if (board[i+2][j+2] == 0){
					result.push([i+2, j+2]);
				}
			}
		}
	}

	if(i+1 < board.length && j-1>=0){
		if (board[i+1][j-1] == 0){
			result.push([i+1, j-1]);
		}
		else if (i+2 < board.length && j-2>=0){
			if (board[i+1][j-1] == 1 || board[i+1][j-1] == 11){
				if(board[i+2][j-2] == 0){
					result.push([i+2, j-2]);
					}
				}
		}
	}

	return result;
}

// if it's player's A turn, if they don't have pawns, or if they don't have any legal move, b won
game.prototype.bWon = function(){
	if(this.turn == "B"){return false;}
	for(let i = 0; i < this.board.length; i++){
		for(let j = 0 ; j < this.board.length; j++){
			if(this.board[i][j] == 1){
				if (this.aPawnLegalMoves(this.board, [i,j]).length != 0){
					return false;
				}
			}
			else if(this.board[i][j] == 11){
				if (this.aKingLegalMoves(this.board, [i,j]).length != 0){
					return false;
				}
			}
		}
	}
	return true;
};

// if it's player's B turn, if they don't have pawns, or if they don't have any legal move, a won
game.prototype.aWon = function(){
	if(this.turn == "A"){return false;}
	for(let i = 0; i < this.board.length; i++){
		for(let j = 0 ; j < this.board.length; j++){
			if(this.board[i][j] == 2){
				if (this.bPawnLegalMoves(this.board, [i,j]).length != 0){
					return false;
				}
			}
			else if(this.board[i][j] == 22){
				if (this.bKingLegalMoves(this.board, [i,j]).length != 0){
					return false;
				}
			}
		}
	}
	return true;
};

module.exports = game;