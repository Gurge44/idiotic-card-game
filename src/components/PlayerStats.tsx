import { useGame } from "../GameContext";

export const PlayerStats = () => {
    const { state } = useGame();
    return (
        <div>
            <div>hearts: {state.health} / {state.maxHealth}</div>
            <div>extra damage (you'll need it lol): {state.damage}</div>
            {state.storedCards.length > 0 && <div>quite literally was too damn feared to fight {state.storedCards.length} emojis (max 3 btw)</div>}
        </div>
    );
};