var board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
			 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

var legalMoves = [];
var clicked = [];
var myTurn = false;
var player;

function updateEventListeners(){
	if(player == "A"){
		disable_player_B_pieces();
	}
	else{
		disable_player_A_pieces();
	}
	$(".player-1-pawn").click(function(){
		legalMoves = player_1_pawn_get_legalMoves(board, $(this).parent().attr("id"));
		show_legalMoves(legalMoves);
	});
	$(".player-1-king").click(function(){
		legalMoves = player_1_king_get_legalMoves(board, $(this).parent().attr("id"));
		show_legalMoves(legalMoves);
	});
	$(".player-2-pawn").click(function(){
		legalMoves = player_2_pawn__get_legalMoves(board,$(this).parent().attr("id")); 
		show_legalMoves(legalMoves);
	});
	$(".player-2-king").click(function(){
		legalMoves = player_2_king_get_legalMoves(board, $(this).parent().attr("id"));
		show_legalMoves(legalMoves);
	});
		$(".pawn").click(function(){
		let block_id = $(this).parent().attr("id");
		let str = block_id.replace("block-", "");
		let coordinates = str.split("-");
		i = parseInt(coordinates[0]);
		j = parseInt(coordinates[1]);
		clicked = [i, j];
	});

	$("#fullscreen").click(function(){
		let body = $("#body");
		// document.getElementById("body").requestFullscreen();
		// $("#fullscreen").html("exit fullscreen");
		if (!document.fullscreenElement){
			document.getElementById("body").requestFullscreen();
			$("#fullscreen").html("exit fullscreen");
		}
	    else {
	    	$("#fullscreen").html("fullscreen");
    		document.exitFullscreen();
  		}
	});
}

function updateBoard(){
	for(let i=0; i< 10; i++){
		for (let j=0; j<10; j++){
			let id = "block-" + (i) + "-" + (j);
			$("#" + id).html("");
		}
	}
	for(let i=0; i < 10; i++){
		for (let j=0; j < 10; j++){
			let id = "block-" + (i) + "-" + (j);
			if (board[i][j] == 1){
				// promote to king
				if(i == 9){
					$("#" + id).append('<div class="player-1-king king pawn"></div>');
					board[i][j] = 11;
				}
				else{
				$("#" + id).append('<div class="player-1-pawn pawn"></div>');
				}
			}
			else if (board[i][j] == 2){
				// promote to king
				if(i == 0){
					$("#" + id).append('<div class="player-2-king king pawn"></div>');					
					board[i][j] = 22;
				}
				else{
				$("#" + id).append('<div class="player-2-pawn pawn"></div>');					
				}
			}
			else if (board[i][j] == 11){
				$("#" + id).append('<div class="player-1-king king pawn"></div>');
			}
			else if (board[i][j] == 22){
				$("#" + id).append('<div class="player-2-king king pawn"></div>');
			}
		}
	}
}

function disableBoard(){
	$("#board").children("*").css("pointer-events", "none"); 
}

function enableBoard(){
	$("#board").children("*").css("pointer-events", "auto"); 
}

function disable_player_A_pieces(){
	$(".player-1-pawn").css("pointer-events", "none");
	$(".player-1-king").css("pointer-events", "none")
}

function disable_player_B_pieces(){
	$(".player-2-pawn").css("pointer-events", "none");
	$(".player-2-king").css("pointer-events", "none");
}

function getCoordinates(block_id){
	let str = block_id.replace("block-", "");
	let coordinates = str.split("-");
	return [parseInt(coordinates[0]), parseInt(coordinates[1])]
}


function player_1_pawn_get_legalMoves(board, block_id){
	let coordinates = getCoordinates(block_id);
	i = coordinates[0];
	j = coordinates[1];
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

function player_1_king_get_legalMoves(board, block_id){
	let coordinates = getCoordinates(block_id);
	i = coordinates[0];
	j = coordinates[1];
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

}

function player_2_pawn__get_legalMoves(board, block_id,){
	let coordinates = getCoordinates(block_id);
	i = coordinates[0];
	j = coordinates[1];

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

function player_2_king_get_legalMoves(board, block_id){
	let coordinates = getCoordinates(block_id);
	i = coordinates[0];
	j = coordinates[1];

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

function show_legalMoves(legalMoves){
	for(let i=0; i<board.length; i++){
		for (let j=0; j<board[i].length; j++){
			$("#block-" + i + "-" + j).css("outline", "none");
			$("#block-" + i + "-" + j).css("z-index", "1");
		}
	}
	for(let i=0; i<legalMoves.length; i++){
		$("#block-" + legalMoves[i][0] + "-" + legalMoves[i][1]).css("outline", "2px solid red");
		$("#block-" + legalMoves[i][0] + "-" + legalMoves[i][1]).css("z-index", "999");
	}
}

function isLegalMove(arr){
	for(let i = 0; i < legalMoves.length; i++){
		if(arr[0] == legalMoves[i][0] && arr[1]==legalMoves[i][1]){
			return true;
		}
	}
	return false;
}
