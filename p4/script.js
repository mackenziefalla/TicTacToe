/*
 * A complete tic-tac-toe widget, using JQuery.  Just include this 
 * script in a browser page and play.  A tic-tac-toe game will be 
 * included as a child element of the element with id "tictactoe".  
 * If the page has no such element, it will just be added at the end 
 * of the body.
 * *** found online and it is being modified by mackenzie falla. I am not the owner of this
 * .js file on website https://jsfiddle.net/rtoal/ThPEH/
 */
$(function () {
    var squares = [],
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",
        gameOver = false,
         /*
     * To determine a win condition, each square is "tagged" from left
     * to right, top to bottom, with successive powers of 2.  Each cell
     * thus represents an individual bit in a 9-bit string, and a
     * player's squares at any given time can be represented as a
     * unique 9-bit value. A winner can thus be easily determined by
     * checking whether the player's current 9 bits have covered any
     * of the eight "three-in-a-row" combinations.
     *
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     */
        wins = [7, 56, 448, 73, 146, 292, 273, 84];
    /*
     * Clears the score and move count, erases the board, and makes it
     * X's turn.
     */
    var startNewGame = function () {
        turn = "X";
        score = { "X": 0, "O": 0 };
        moves = 0;
        gameOver = false; // Reset game state
        $("#status").text(""); // Clear status message
        squares.forEach(function (square) { square.html(EMPTY); });
    };
    /*
     * Returns whether the given score is a winning score.
     */
    var win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true; // Winning condition met
            }
        }
        return false; // No win
    };
    /*
     * Sets the clicked-on square to the current player's mark,
     * then checks for a win or cats game.  Also changes the
     * current player.
     */
    var set = function () {
        if ($(this).html() !== EMPTY || gameOver) {
            return; // Don't allow further moves if the game is over or cell is occupied
        }
        $(this).html(turn);
        moves += 1;
        score[turn] += $(this)[0].indicator; // Update score for the current player
        if (win(score[turn])) {
            $("#status").text("Player " + turn + " wins!"); // Display the winner
            gameOver = true; // Stop further moves
        } else if (moves === SIZE * SIZE) {
            $("#status").text("Its a tie!Try Again!"); // Display draw message
            gameOver = true; // Stop further moves
        } else {
            turn = turn === "X" ? "O" : "X"; // Switch turns
        }
    };
    /*
     * Creates and attaches the DOM elements for the board as an
     * HTML table, assigns the indicators for each cell, and starts
     * a new game.
     */
    var play = function () {
        var board = $("<table border=1 cellspacing=0>"), indicator = 1;
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td height=50 width=50 align=center valign=center></td>");
                cell[0].indicator = indicator; // Assign indicator for win checking
                cell.click(set); // Bind click event
                row.append(cell);
                squares.push(cell);
                indicator += indicator; // Update indicator for bitwise win check
            }
        }
        
        // Attach under tictactoe if present, otherwise to body.
        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame(); // Start a new game
    };

    // Reset the game when the "Restart" button is clicked
    $("#restart-btn").click(function (event) {
        event.preventDefault();
        startNewGame();
    });

    play(); // Initialize the game
});
