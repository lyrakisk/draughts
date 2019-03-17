(function(){
	document.getElementById("rules").addEventListener("click", function(){
	let rules = "** pawns move diagonally and only forwards (one block at a time)\n";
	rules += "** kings move one block at a time either backwards or forwards\n";
	rules += "** every pawn or king can only move once, therefore it cannot capture more than one opponent piece in one move";
	alert(rules);
}); 
})();