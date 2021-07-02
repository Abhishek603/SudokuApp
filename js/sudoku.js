// // ____Data Definations____ // //


// Example Boards for Test

const a = null

var board1 = [  [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9] ]

var board2 = [ [a, a, a, a, a, a, a, a, a],
               [a, a, a, a, a, a, a, a, a],
               [a, a, a, a, a, a, a, a, a],
               [a, a, a, a, a, a, a, a, a],
               [a, a, a, a, a, a, a, a, a],
               [a, a, a, a, a, a, a, a, a],
               [a, a, a, a, a, a, a, a, a],
               [a, a, a, a, a, a, a, a, a],
               [a, a, a, a, a, a, a, a, a] ]


var board3 = [  [a, a, a, a, a, 8, 9, 1, a],
                [a, a, 1, a, a, a, a, a, 3],
                [9, a, a, a, 2, 7, a, a, 5],
                [3, a, 2, 5, 6, a, a, a, a],
                [5, a, a, a, a, a, a, a, 8],
                [a, a, a, a, 8, 3, 5, a, 4],
                [8, a, a, 7, 4, a, a, a, 2],
                [6, a, a, a, a, a, 1, a, a],
                [a, 5, 7, 3, a, a, a, a, a] ]


var board4 = [  [1, 2, 3, 4, 5, 6, 7, 8, a],
                [a, a, a, a, a, a, a, a, 2],
                [a, a, a, a, a, a, a, a, 3],
                [a, a, a, a, a, a, a, a, 4],
                [a, a, a, a, a, a, a, a, 5],
                [a, a, a, a, a, a, a, a, 6],
                [a, a, a, a, a, a, a, a, 7],
                [a, a, a, a, a, a, a, a, 8],
                [a, a, a, a, a, a, a, a, 9] ]




// // ____Function Definations____ // //

function hardcodedboard(){
    window.location.href = 'hardcodeindex.html';
}

function newboard(){
    window.location.href = 'index.html';
}

// Board is List[List[Int]] or false
// interpret as a sudoku board, or false if the given board is invalid

function solver() {
    // null -> null
    // populate the board with whatever the user inputted
    var startingBoard = [[]]
    var j = 0
    for (var i = 1; i <= 81; i++){
        const val = document.getElementById(String(i)).value
        if (val == ""){
            startingBoard[j].push(null)
        }
        else { 
            startingBoard[j].push(Number(val))
        }
        if (i % 9 == 0 && i < 81){
            startingBoard.push([])
            j++
        }
    }
    const inputValid = validBoard(startingBoard)
    if (!inputValid){
        inputIsInvalid()
    }
    else{
        const answer = solve(startingBoard)
        updateBoard(answer)
    }
}

// ______Tests______ //
// console.log(startingBoard)
// ______Tests______ //

function solve(board) {
    // Board -> Board
    // solves the given sudoku board
    // Assuming the given sudoku board is valid
    if (solved(board)) {
        return board
    }
    else {
        const possibilities = nextBoards(board)
        const validBoards = keepOnlyValid(possibilities)
        return searchForSolution(validBoards)
    }
}

// ______Tests______ //
// console.log(solve(board4))
// ______Tests______ //


function searchForSolution(boards){
    // List[Board] -> Board or false
    // finds a valid solution 
    if (boards.length < 1){
        return false
    }
    else {
        // backtracking search for solution
        var first = boards.shift()
        const tryPath = solve(first)
        if (tryPath != false){
            return tryPath
        }
        else{
            return searchForSolution(boards)
        }
    }
}


function solved(board){

    // Board -> Boolean
    // checks to see if the given board is solved
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null){
                return false
            }
        }
    }
    return true
}

// ______Tests______ //
// console.log(solved(board3))
// ______Tests______ //


function nextBoards(board){ 
    // Board -> List[Board]
    // finds the first emply square and generates 9 different boards filling in that square with numbers 1...9
    var res = []
    const firstEmpty = findEmptySquare(board)
    if (firstEmpty != undefined){
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        for (var i = 1; i <= 9; i++){
            var newBoard = [...board]
            var row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}

function findEmptySquare(board){
    // Board -> [Int, Int] 
    // get the i j coordinates for the first empty square
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null) {
                return [i, j]
            }
        }
    }
}

// ______Tests______ //
// console.log(nextBoards(board3))
// console.log(findEmptySquare(board3))
// ______Tests______ //

function keepOnlyValid(boards){
    
    // List[Board] -> List[Board]
    // filters out all of the invalid boards from the list
    var res = []
    for (var i = 0; i < boards.length; i++){
        if (validBoard(boards[i])){
            res.push(boards[i])
        }
    }
    return res
}

// ______Tests______ //
// console.log(keepOnlyValid([board1, board2, board3]))
// ______Tests______ //


function validBoard(board){
    // Board -> Boolean
    // checks to see if given board is valid
    return rowsGood(board) && columnsGood(board) && boxesGood(board)
}

function rowsGood(board){
    // Board -> Boolean
    // makes sure there are no repeating numbers for each row
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[i][j])){
                return false
            }
            else if (board[i][j] != null){
                cur.push(board[i][j])
            }
        }
    }
    return true
}

function columnsGood(board){
    // Board -> Boolean
    // makes sure there are no repeating numbers for each column
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[j][i])){
                return false
            }
            else if (board[j][i] != null){
                cur.push(board[j][i])
            }
        }
    }
    return true
}


function boxesGood(board){
    // transform this everywhere to update result
    const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]

    // Board -> Boolean
    // makes sure there are no repeating numbers for each box
    for (var y = 0; y < 9; y += 3){
        for (var x = 0; x < 9; x += 3){
            // each traversal should examine each box
            var cur = []
            for (var i = 0; i < 9; i++){
                var coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if (board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true
}

// ______Tests______ //
// console.log("Rows:")
// console.log(rowsGood(board1))
// console.log(rowsGood(board2))
// console.log(rowsGood(board3))
// console.log("Columns:")
// console.log(columnsGood(board1))
// console.log(columnsGood(board2))
// console.log(columnsGood(board3))
// console.log("Boxes:")
// console.log(boxesGood(board1))
// console.log(boxesGood(board2))
// console.log(boxesGood(board3))
// console.log("Valid:")
// console.log(validBoard(board1))
// console.log(validBoard(board2))
// console.log(validBoard(board3))
// ______Tests______ //


function updateBoard(board) {
    // Board -> null
    // update the DOM with the answer
    if (board == false){
        for (i = 1; i <= 9; i++){
            document.getElementById("row " + String(i)).innerHTML = "No Solution Exists for the given Board"
        }
    }
    else{
        for (var i = 1; i <= 9; i++){
            var row = ""
            for (var j = 0; j < 9; j++){
                if (row == ""){
                    row = row + String(board[i - 1][j])
                }
                else {
                    row = row + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + String(board[i - 1][j])
                }
            }
            document.getElementById("row " + String(i)).innerHTML = row
        }
        document.getElementById("solved").innerHTML = "Board Solved"
    }
}

function inputIsInvalid(){
    // board is invalid or puzzle is not solvable
    for (i = 1; i <= 9; i++){
        document.getElementById("row " + String(i)).innerHTML = "The Given Board is Invalid"
    }
}