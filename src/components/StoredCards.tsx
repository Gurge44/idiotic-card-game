import {useGame} from "../GameContext";

type Card = {
    enemyName: string;
    enemyIcon: string;
    level: number;
    reward: string;
    penalty: string;
};

type StoredCardsProps = {
    onFightStored: (card: Card, index: number) => void;
};

export const StoredCards = (props: StoredCardsProps) => {
    const {state} = useGame();

    if (state.storedCards.length === 0) {
        return null; // this works?!
    }

    return (
        <div className="stored-cards">
            <h3>Stored Enemies ({state.storedCards.length}/3)</h3>
            <div className="stored-cards-list">
                {state.storedCards.map((card, index) => (
                    <div
                        key={index}
                        className="stored-card"
                        onClick={() => props.onFightStored(card, index)}
                    >
                        <div className="stored-card-icon">{card.enemyIcon}</div>
                        <div className="stored-card-name">{card.enemyName}</div>
                        <div className="stored-card-level">Level {card.level}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
