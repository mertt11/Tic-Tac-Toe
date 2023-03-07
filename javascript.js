
function Gameboard(){
  const gameboard = document.querySelector('.gameboard');
  const rows=3;
  const columns=3;
  
  for(let i=0;i<rows;i+=1){
    const row=document.createElement('div');
    gameboard.appendChild(row).classList.add('rows');
    for(let j=0;j<columns;j+=1){
      const cell=document.createElement('div');
      row.appendChild(cell).classList.add('cell');
    }
  }

  const getGameboard = () => gameboard;
  
  const dropMark = (cell,player) => {
    cell.classList.add('cell-styling'); 
    cell.textContent=player.mark;
  }
  const resetBoard=()=>{
    const cellElements=document.querySelectorAll('.cell');
    cellElements.forEach(cell=>cell.textContent='');
    
    return;
  }
  return {getGameboard,dropMark,resetBoard}
}

function GameController(
  playerOneName='PlayerOne',
  playerTwoName='PlayerTwo'
  ){  
    let playerWinCount=0;
    let botWinCount=0;
    let round=1;
    const gameboard=Gameboard();   
    const players = [
      {
        name: playerOneName,
        mark: 'X'
      },
      {
        name: playerTwoName,
        mark: 'O'
      }
    ];

    const resetGame = () => {
      playerWinCount = 0;
      botWinCount = 0;
      round = 1;
      const playerPoint = document.querySelector('.player-point p');
      const botPoint = document.querySelector('.bot-point p');
      const roundPoint = document.querySelector('.round p');
      playerPoint.textContent = playerWinCount;
      botPoint.textContent = botWinCount;
      roundPoint.textContent = round;
    }
    
    const checkWinner = (round) =>{
      const img1=document.querySelector('.player-wrapper img');
      const img2=document.querySelector('.bot-wrapper img');
      const cells = document.querySelectorAll('.cell');
      const playAgain = document.querySelector('.playAgain');   
      if(round>3 && Math.abs(playerWinCount-botWinCount)>1){
        (playerWinCount>botWinCount) 
        ? (img1.classList.add('active1'))
        : (img2.classList.add('active2'));

        cells.forEach(cell => cell.classList.add('no-click'));
        playAgain.classList.add('active');

        playAgain.onclick=()=>{
          resetGame();
          playAgain.classList.remove('active');
          img1.classList.remove('active1');
          img2.classList.remove('active2');
          cells.forEach(cell => cell.classList.remove('no-click'));
          gameboard.resetBoard();
        };
        return true;  
      }
      return false;
    }

    let activePlayer=players[0];
    const switchPlayerTurn = () =>{
      activePlayer=activePlayer === players[0] ? players[1] : players[0];
    }
    
    const roundWinner = () => {
      const cells = document.querySelectorAll('.cell'); 
      const playerPoint= document.querySelector('.player-point p');
      const botPoint = document.querySelector('.bot-point p');
      const roundPoint = document.querySelector('.round p');
      let hasWinner=false;
      const WinningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]

       for (let i = 0; i < WinningCombinations.length; i++) {   
        const combo=WinningCombinations[i];
        const values=combo.map(index=>cells[index].textContent);
        console.log(values);
        if(values.every(element=>element==='X')){
          round++; 
          playerWinCount++; 
          playerPoint.textContent=playerWinCount;   
          hasWinner=true;
          activePlayer=players[0];
          gameboard.resetBoard();
          if(checkWinner(round)){
            round--;
          } 
          roundPoint.textContent=round;
          break;
        }else if(values.every(element=>element==='O')){
          round++;
          botWinCount++; 
          botPoint.textContent=botWinCount;
          hasWinner=true;
          activePlayer=players[0];
          gameboard.resetBoard();
          if(checkWinner(round)){
            round--;
          } 
          roundPoint.textContent=round;
          break;
        }
      }  
      if (!hasWinner && Array.from(cells).every(cell => cell.textContent !== '')) {               
        activePlayer=players[0];
        gameboard.resetBoard();
        round++;
        botWinCount++; 
        playerWinCount++; 
        playerPoint.textContent=playerWinCount;   
        botPoint.textContent=botWinCount;
        roundPoint.textContent=round;
      }
    }  

    const getActivePlayer = () =>activePlayer;
    const playround = (cell) =>{
      gameboard.dropMark(cell,getActivePlayer());
      switchPlayerTurn();
      roundWinner();
    };
    return {getActivePlayer,
            playround,
            resetGame
    }
}

function ScreenController(){ 
  const game=GameController();
  const cellElements=document.querySelectorAll('.cell');

  cellElements.forEach(cell=>{
    cell.addEventListener('click',handleClick)
  })

  function handleClick(e){
    const cell=e.target;
    game.playround(cell);
  }
}

ScreenController();