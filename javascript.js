
const roundd=document.querySelector('.round');
window.onload = () =>{
  roundd.classList.add('disable');
}
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
    alert('girdiii');
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
    
    const checkWinner = (round) =>{
      const img=document.querySelector('.points img');
      const playerPoint= document.querySelector('.player-point p');
      const botPoint = document.querySelector('.bot-point p');
      const roundPoint = document.querySelector('.round p');
      /* const round=document.querySelector('.round'); */
      if(round>3 && Math.abs(playerWinCount-botWinCount)>1){
        (playerWinCount>botWinCount) 
        ? (alert('wiiner player win'),img.classList.add('active1'))
        : (alert('winner bot win'),img.classList.add('active2'));

        /* playerWinCount=0;
        botWinCount=0; 
        round=1; */
        roundd.classList.remove('disable');
        playerPoint.textContent=playerWinCount;
        botPoint.textContent=botWinCount;
        roundPoint.textContent=round;
      }
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
          alert('win X');
          activePlayer=players[0];
          gameboard.resetBoard();
          roundPoint.textContent=round;
          checkWinner(round);
          break;
        }else if(values.every(element=>element==='O')){
          round++;
          botWinCount++; 
          botPoint.textContent=botWinCount;
          hasWinner=true;
          alert('win O'); 
          activePlayer=players[0];
          gameboard.resetBoard();
          roundPoint.textContent=round;
          checkWinner(round);
          break;
        }  
      }  
      if (!hasWinner && Array.from(cells).every(cell => cell.textContent !== '')) {               
        alert('tie');
        activePlayer=players[0];
        gameboard.resetBoard();
        round++;
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
            playround
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