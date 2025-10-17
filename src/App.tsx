import { GameProvider } from "./GameContext";
import { PlayerStats } from "./components/PlayerStats";
import { CardView } from "./components/CardView";
import { ActionButtons } from "./components/ActionButtons";

const App = () => {
    return (
        <GameProvider>
            <div>
                <h1>Idiotic Game (Go play 2048 instead, or basically anything else, just not this)</h1>
                <p>DISCLAIMER: This project does not provide any warranty for users' health, so if your brain dies during this game, the developer takes no responsibility</p>
                <p style={{marginBottom: 20 + "px"}}>DISCLAIMER: This project does not promote gambling even though it exactly looks like that</p>
                <PlayerStats/>
                <CardView/>
                <ActionButtons/>
            </div>
        </GameProvider>
    );
};

export default App;