import { useGame } from "../GameContext";

export const CardView = () => {
    const { state } = useGame();
    const card = state.currentCard;
    if (!card) return <div>Click Draw to lose brain cells</div>;

    return (
        <div>
            <div>{card.enemyIcon}    (it's a(n) {card.enemyName} btw, sorry for the ugly icons but that's what I had to work with)</div>
            <div>lvl (aka their luck at beating you): {card.level}</div>
            <div>reward (if ur lucky): {card.reward}</div>
            <div>penalty (if ur not): {card.penalty}</div>
        </div>
    );
};