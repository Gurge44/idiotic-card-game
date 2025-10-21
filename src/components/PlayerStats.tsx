import {useGame} from "../GameContext";

export const PlayerStats = () => {
    const {state} = useGame();
    return (
        <div className="player-stats">
            <div className="stat-box">
                <div className="stat-label">❤️</div>
                <div className="stat-value">{state.health} / {state.maxHealth}</div>
            </div>
            <div className="stat-box">
                <div className="stat-label">⚔️</div>
                <div className="stat-value">{state.damage}</div>
            </div>
        </div>
    );
};