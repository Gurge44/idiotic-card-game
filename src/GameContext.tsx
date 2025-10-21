import React, {createContext, type ReactNode, useContext, useEffect, useReducer} from "react";

type Card = {
    enemyName: string;
    enemyIcon: string;
    level: number;
    reward: string;
    penalty: string;
}

type GameState = {
    health: number;
    maxHealth: number;
    damage: number;
    storedCards: Card[];
    currentCard?: Card;
    cards: Card[];
    message?: string;
    gameOver: boolean;
}

type Action =
    { type: "SET_CARDS"; cards: Card[] } |
    { type: "DRAW_CARD" } |
    { type: "FIGHT_RESULT"; win: boolean; message: string } |
    { type: "FIGHT_STORED"; card: Card; index: number } |
    { type: "FIGHT_STORED_RESULT"; win: boolean; message: string; index: number } |
    { type: "FLEE" } |
    { type: "RESET" };

const initialState: GameState = {
    health: 5,
    maxHealth: 5,
    damage: 0,
    storedCards: [],
    cards: [],
    gameOver: false,
};

function applyCardOutcome(state: GameState, card: Card, win: boolean): { newHealth: number; newDamage: number } {
    let newHealth = state.health;
    let newDamage = state.damage;

    if (win) {
        for (const r of card.reward) {
            if (r === "❤") newHealth = Math.min(state.maxHealth, newHealth + 1);
            if (r === "⚔") newDamage += 1;
        }
    } else {
        for (const p of card.penalty) {
            if (p === "❤") newHealth -= 1;
            if (p === "⚔") newDamage = Math.max(0, newDamage - 1);
        }
    }

    return {newHealth, newDamage};
}

function gameReducer(state: GameState, action: Action): GameState {
    switch (action.type) {
        case "SET_CARDS":
            return {...state, cards: action.cards};

        case "DRAW_CARD": {
            if (state.cards.length === 0)
                return {
                    ...state,
                    message: "No more cards left.... if you still want to suffer, reload the page, because I couldn't make the restart button work"
                };
            const next = state.cards[Math.floor(Math.random() * state.cards.length)];
            return {...state, currentCard: next, message: ""};
        }

        case "FIGHT_RESULT": {
            if (!state.currentCard) return state;
            const {newHealth, newDamage} = applyCardOutcome(state, state.currentCard, action.win);
            return {
                ...state,
                health: newHealth,
                damage: newDamage,
                message: action.message,
                currentCard: undefined,
                gameOver: newHealth <= 0,
            };
        }

        case "FIGHT_STORED":
            return {...state, currentCard: action.card, message: ""};

        case "FIGHT_STORED_RESULT": {
            if (!state.currentCard) return state;
            const {newHealth, newDamage} = applyCardOutcome(state, state.currentCard, action.win);
            const newStoredCards = [...state.storedCards];
            newStoredCards.splice(action.index, 1);

            return {
                ...state,
                health: newHealth,
                damage: newDamage,
                message: action.message,
                currentCard: undefined,
                storedCards: newStoredCards,
                gameOver: newHealth <= 0,
            };
        }

        case "FLEE":
            if (!state.currentCard) return state;
            if (state.storedCards.length >= 3)
                return {
                    ...state,
                    message: "Bruh, how many do you want to store? That's unfair, you must lose more brain cells!"
                };
            return {
                ...state,
                storedCards: [...state.storedCards, state.currentCard],
                currentCard: undefined,
                message: "You.... fled? Is that the past form of this word?",
            };

        case "RESET":
            return initialState;

        default:
            return state;
    }
}

const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState, dispatch: () => {
    }
});

// ESLint: Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components. (react-refresh/only-export-components)
// I have absolutely no idea how to fix that
export const useGame = () => useContext(GameContext);

export const GameProvider = (props: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    useEffect(() => {
        fetch("/cards.json")
            .then((r) => r.json())
            .then((data) => dispatch({type: "SET_CARDS", cards: data}));
    }, []);

    return <GameContext.Provider value={{state, dispatch}}>{props.children}</GameContext.Provider>;
};