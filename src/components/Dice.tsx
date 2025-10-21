import {useEffect, useState} from "react";

type DiceProps = {
    onComplete: (result: number) => void;
    isRolling: boolean;
};

// this component is a miracle that it even functions
// I wanted to remove it but that would be too much work
// so it stays ig

export const Dice = (props: DiceProps) => {
    const [displayValue, setDisplayValue] = useState<number>(1);
    const [, setFinalValue] = useState<number | null>(null); // wtf

    useEffect(() => {
        if (props.isRolling) {
            setFinalValue(null);
            const finalRoll = Math.floor(Math.random() * 6) + 1;
            let iterations = 0;
            const maxIterations = 10;

            const interval = setInterval(() => {
                setDisplayValue(Math.floor(Math.random() * 6) + 1);
                iterations++;

                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    setDisplayValue(finalRoll);
                    setFinalValue(finalRoll); // half of this is unnecessary but I literally don't care
                    setTimeout(() => {
                        props.onComplete(finalRoll);
                    }, 300);
                }
            }, 100);

            return () => clearInterval(interval);
        }
    }, [props, props.isRolling, props.onComplete]); // Webstorm said I should put props into it as well, idk what that does

    return (
        <div className={`dice ${props.isRolling ? 'rolling' : ''}`}>
            {displayValue}
        </div>
    );
};
