import { useGame } from "../GameContext";

export const ActionButtons = () => {
    const { state, dispatch } = useGame();

    const fight = () => {
        if (!state.currentCard) return;
        const roll = Math.floor(Math.random() * 6) + 1;
        const needed = state.currentCard.level;
        const effectiveRoll = roll + state.damage;
        const win = effectiveRoll > needed;
        dispatch({type: "FIGHT_RESULT", win, message: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa you won't see this anyway because it doesn't work`});
    };

    if (state.gameOver)
        return <button onClick={() => dispatch({ type: "RESET" })}>Congrats! You finally finished losing brain cells. Now reload the page to restart, because this button does not work</button>;

    return (
        <div>
            {!state.currentCard && <button onClick={() => dispatch({ type: "DRAW_CARD" })}>Damage Brain- oh I mean Draw</button>}
            {state.currentCard &&
                <>
                    <button onClick={fight}>risk it all</button>
                    <button onClick={() => dispatch({ type: "FLEE" })}>too scared</button>
                </>
            }
        </div>
    );
};