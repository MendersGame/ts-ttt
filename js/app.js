"use strict";
/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('message');
const resetBtnEl = document.querySelector('button');
/*-------------------------------- Types --------------------------------*/
// init()
const init = () => {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 1;
    winner = false;
    tie = false;
    render();
};
const placePiece = (idx) => {
    board[idx] = turn;
};
const handleClick = (evt) => {
    if (!evt.target)
        return;
    const play = evt.target;
    const sqIdx = parseInt(play.id.replace('sq', ''));
    if (board[sqIdx] || winner)
        return;
    placePiece(sqIdx);
    checkForTie();
    checkForWinner();
    switchPlayerTurn();
    render();
};
const checkForTie = () => {
    if (!board.includes(0))
        return;
    tie = true;
};
const checkForWinner = () => {
    winningCombos.forEach(combo => {
        if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
            winner = true;
        }
    });
};
const switchPlayerTurn = () => {
    if (winner)
        return;
    turn *= -1;
};
const render = () => {
    updateBoard();
    updateMessage();
};
const updateBoard = () => {
    board.forEach((boardVal, idx) => {
        if (boardVal === 1) {
            squareEls[idx].textContent = 'X';
        }
        else if (boardVal === -1) {
            squareEls[idx].textContent = 'O';
        }
        else {
            squareEls[idx].textContent = '';
        }
    });
};
const updateMessage = () => {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn!`;
    }
    else if (!winner && tie) {
        messageEl.textContent = "Cat's game! Meow!!!";
    }
    else {
        messageEl.textContent = `Congratulations! ${turn === 1 ? 'X' : 'O'} wins! `;
    }
};
/*----------------------------- Do Things -----------------------------*/
// document.querySelector<HTMLElement>('.board').addEventListener('click', handleClick)!
squareEls?.addEventListener('.sqr', evt => {
    handleClick(sqIdx);
});
resetBtnEl?.addEventListener('button', evt => {
    init();
});
init();
