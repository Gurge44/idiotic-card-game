import {useGame} from "../GameContext";
import {useState} from "react";
import {Dice} from "./Dice";
import {StoredCards} from "./StoredCards";

type Card = {
    enemyName: string;
    enemyIcon: string;
    level: number;
    reward: string;
    penalty: string;
};

export const ActionButtons = () => {
    const {state, dispatch} = useGame();
    const [isRolling, setIsRolling] = useState(false);
    const [fightingStoredIndex, setFightingStoredIndex] = useState<number | null>(null);

    const handleDiceComplete = (roll: number) => {
        if (!state.currentCard) return;

        const needed = state.currentCard.level;
        const effectiveRoll = roll + state.damage;
        const win = effectiveRoll > needed;
        const message = win
            ? `congrats ig.... you rolled ${roll} + ${state.damage} = ${effectiveRoll}, which is > ${needed}`
            : `welp, ${roll} + ${state.damage} = ${effectiveRoll} wasn't enough against lvl ${needed}`;

        setTimeout(() => {
            if (fightingStoredIndex !== null) {
                dispatch({type: "FIGHT_STORED_RESULT", win, message, index: fightingStoredIndex});
                setFightingStoredIndex(null);
            } else {
                dispatch({type: "FIGHT_RESULT", win, message});
            }
            setIsRolling(false);
        }, 2000);
    };

    const fight = () => {
        if (!state.currentCard) return;
        setIsRolling(true);
    };

    const handleFightStored = (card: Card, index: number) => {
        dispatch({type: "FIGHT_STORED", card, index});
        setFightingStoredIndex(index);
        setTimeout(() => {
            setIsRolling(true);
        }, 100);
    };

    if (state.gameOver) {
        return (
            <div className="action-buttons">
                <button className="reset-button" onClick={() => dispatch({type: "RESET"})}>
                    Restart
                </button>
            </div>
        );
    }

    return (
        <>
            {state.message && <div className={`dice-result ${state.message.includes("congrats") ? 'win' : 'lose'}`}>{state.message}</div>}

            {isRolling && (
                <div className="dice-container">
                    <Dice isRolling={isRolling} onComplete={handleDiceComplete}/>
                </div>
            )}

            {!isRolling && (
                <>
                    <StoredCards onFightStored={handleFightStored}/>

                    <div className="action-buttons">
                        {!state.currentCard &&
                            <button className="draw-button" onClick={() => dispatch({type: "DRAW_CARD"})}>
                                Damage Brain (ok fine, "Draw")
                            </button>
                        }
                        {state.currentCard &&
                            <>
                                <button className="fight-button" onClick={fight}>Fight</button>
                                <button className="flee-button" onClick={() => dispatch({type: "FLEE"})}>Flee</button>
                            </>
                        }
                    </div>
                </>
            )}
        </>
    );
};