import {GameProvider} from "./GameContext";
import {PlayerStats} from "./components/PlayerStats";
import {Card} from "./components/Card.tsx";
import {ActionButtons} from "./components/ActionButtons";

const App = () => {
    return (
        <GameProvider>
            <div className="game-container">
                <div className="game-header">
                    <h1>Idiotic Card Game</h1>
                    <p>DISCLAIMER: This project does not provide any warranty for users' health, so if your brain dies
                        during this game, the developer takes no responsibility</p>
                    <p>DISCLAIMER: This project does not promote gambling even though it exactly looks like that</p>
                </div>
                <PlayerStats/>
                <Card/>
                <ActionButtons/>
            </div>
        </GameProvider>
    );
};

export default App;