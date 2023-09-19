import React, { useState, useEffect } from 'react';
import './index.css';

function GreenLightRedLight() {
  const [isGreen, setIsGreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [leaderboard, setLeaderboard] = useState([]);
  const [isHomePage, setIsHomePage] = useState(true); // Added isHomePage state

  const difficultySettings = {
    easy: { time: 40, clicksNeeded: 10 },
    medium: { time: 40, clicksNeeded: 15 },
    hard: { time: 40, clicksNeeded: 25 },
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setIsGameOver(true);
      clearInterval(timer);
      const playerInfo = { score };
      setLeaderboard((prevLeaderboard) => [...prevLeaderboard, playerInfo]);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score]);

  const handleClick = () => {
    if (isPlaying) {
      if (isGreen) {
        setScore(score + 1);
        setIsGreen(false);
        if (score + 1 === difficultySettings[difficulty].clicksNeeded) {
          setIsWinner(true);
          setIsPlaying(false);
        }
      } else {
        setIsPlaying(false);
        setIsGameOver(true);
      }
    }
  };

  const startGame = (chosenDifficulty) => {
    setDifficulty(chosenDifficulty);
    setIsPlaying(true);
    setIsGameOver(false);
    setIsWinner(false);
    setTimeLeft(difficultySettings[chosenDifficulty].time);
    setScore(0);
    setLeaderboard([]); // Clear the leaderboard
    changeLight();
    setIsHomePage(false); // Leaving the homepage
  };

  const startAgain = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setIsWinner(false);
    setTimeLeft(difficultySettings[difficulty].time);
    setScore(0);
    changeLight();
  };

  const returnHome = () => {
    setIsHomePage(true); // Going back to the homepage
    setIsPlaying(false);
    setIsGameOver(false);
    setIsWinner(false);
    setScore(0);
    setLeaderboard([]); // Clear the leaderboard
  };

  const changeLight = () => {
    const randomDelay = Math.floor(Math.random() * 3000) + 1000;
    setTimeout(() => {
      setIsGreen((prevIsGreen) => !prevIsGreen);
      changeLight();
    }, randomDelay);
  };

  return (
    <div>
      <h1 className='heading'>Let the Games Begin</h1>
      <h2><span style={{ color: 'green', fontWeight: 'bold', fontStyle: 'italic' }}>Green </span>Light<span style={{ color: 'red', fontWeight: 'bold', fontStyle: 'italic' }}>  Red </span>Light Game</h2>
      <h>Instructions</h>
      <ol className='instructions'>
        <li>The game will display a box that changes its color randomly.</li>
        <li>If the user clicks on the red box or if the time has expired, the game will display a "Game Over!" message, and the game will end immediately.</li>
        <li>If the user clicks on the green box, their score will increment by 1. If the user manages to click the green box n times within y seconds, a win message will be displayed.</li>
      </ol>
      {isHomePage && (
        <>
          <button className='mode' onClick={() => startGame('easy')}>Easy</button>
          <button className='mode' onClick={() => startGame('medium')}>Medium</button>
          <button className='mode' onClick={() => startGame('hard')}>Hard</button>
        </>
      )}
      {!isHomePage && !isPlaying && (
        <button className='homebutton' onClick={returnHome}>Home</button>
      )}
      {isPlaying && !isGameOver && (
        <>
          <div className={`box ${isGreen ? 'green' : 'red'}`} onClick={handleClick}></div>
          <p className="time-left">Time Left: {timeLeft} seconds</p>
          <div className="score-container">
            <p className="score">Score: {score}</p>
          </div>
        </>
      )}
      {isWinner && (
        <>
          <p className="win-text">You Win!</p>
          <p style={{ color: 'green', fontWeight: 'bolder', fontStyle: 'italic' }}>Your Score: {score}</p>
          <button className='startagainbutton' onClick={startAgain}>Start Again</button>
        </>
      )}
      {isGameOver && (
        <>
          <p className='gameover'>Game Over!</p>
          <p style={{ color: 'green', fontWeight: 'bolder', fontStyle: 'italic' }}>Your Score: {score}</p>
          <button className='startagainbutton' onClick={startAgain}>Start Again</button>
        </>
      )}
      {leaderboard.length > 0 && (
        <>
          <h2>Leaderboard</h2>
          <ul>
            {leaderboard.map((player, index) => (
              <li key={index}>
                Player {index + 1}: Score {player.score}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default GreenLightRedLight;
