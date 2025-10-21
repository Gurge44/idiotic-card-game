import {useGame} from "../GameContext";
import {useEffect, useState} from "react";

export const Card = () => {
    const {state} = useGame();
    const card = state.currentCard;
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
        if (card) {
            setIsFlipping(true);
            const timer = setTimeout(() => setIsFlipping(false), 600);
            return () => clearTimeout(timer);
        }
    }, [card]);

    if (!card) {
        return (
            <div className="card-container">
                <div className="empty-state">
                    Click Draw to nuke your brain!
                </div>
            </div>
        );
    }

    return (
        <div className="card-container">
            <div className={`card ${isFlipping ? 'flipping' : ''}`}>
                <span className="card-icon">{card.enemyIcon}</span>
                <div className="card-name">{card.enemyName}</div>
                <div className="card-level">Level {card.level}</div>
                <div className="card-rewards">
                    <div className="reward-box">
                        <div className="reward-label">Reward</div>
                        <div className="reward-value">{card.reward}</div>
                    </div>
                    <div className="penalty-box">
                        <div className="penalty-label">Penalty</div>
                        <div className="penalty-value">{card.penalty}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};