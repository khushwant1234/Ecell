import { useState, useEffect } from 'react';

const useGameState = () => {
    const [lives, setLives] = useState(9);
    const [score, setScore] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [levelTimeRemaining, setLevelTimeRemaining] = useState(30);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        let timer;
        if (levelTimeRemaining > 0 && !gameOver) {
            timer = setInterval(() => {
                setLevelTimeRemaining((prev) => prev - 1);
            }, 1000);
        } else if (levelTimeRemaining === 0) {
            setGameOver(true);
        }
        return () => clearInterval(timer);
    }, [levelTimeRemaining, gameOver]);

    const resetGame = () => {
        setLives(9);
        setScore(0);
        setCurrentLevel(1);
        setLevelTimeRemaining(30);
        setGameOver(false);
    };

    return {
        lives,
        score,
        currentLevel,
        levelTimeRemaining,
        gameOver,
        setLives,
        setScore,
        setCurrentLevel,
        setLevelTimeRemaining,
        resetGame,
    };
};

export default useGameState;