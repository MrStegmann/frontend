import React, { useEffect, useState } from 'react';
import NextIcon from "../img/nextIcon.png";

const PlayerActBttns = ({handles, cardToPlay, cardsToPay, villain, playing, player, action, target}) => {
    const  { handleNextTurn, checkPlayedAlly, handleAttack, handleVillainAttack, handleAccept, handlePlayCard, handleCancelPay, handleOnCancelAction } = handles;

    const [ buttons, setButtons ] = useState([]);

    useEffect(() => {
        if (playing?.type === "villain") return;
        setButtons([]);
        if (cardToPlay?.type === "character") {
            setButtons([
                { label: "pAt", angle: 180, onClick: (cardToPlay) => handleAttack(cardToPlay, false) },
                { label: "mAt", angle: 220, onClick: (cardToPlay) => handleAttack(cardToPlay, true) }
            ])
        }
        if (cardToPlay?.type === "ally" && checkPlayedAlly(cardToPlay)) {
            setButtons([
                { label: "AlAt", angle: 180, onClick: (cardToPlay) => handleAttack(cardToPlay, cardToPlay.mAt > cardToPlay.pAt) }
            ])
        }
        if (cardToPlay?.type !== "character" && cardToPlay && !checkPlayedAlly(cardToPlay) && action === 0) {
            setButtons([
                { label: "OK", angle: 220, onClick: handleAccept },
                { label: "X", angle: 180, onClick: handleOnCancelAction }
            ])
        };
        if (action === 1 && cardToPlay) {
            setButtons([
                { label: "Play", angle: 220, onClick: handlePlayCard },
                { label: "X", angle: 180, onClick: handleOnCancelAction }
            ])
        }
        if (action === 2 && target) {
            setButtons([
                { label: "Lanzar", angle: 220, onClick: handlePlayCard },
                { label: "X", angle: 180, onClick: handleOnCancelAction }
            ])
        }
    }, [cardToPlay, action, cardsToPay, target]);

    useEffect(() => {
        setButtons([]);
        if (playing?.type === "villain") {
            const bttns = [
                { label: "X", angle: 180, onClick: (defender, attacker) => handleVillainAttack(defender, attacker, false) },
                { label: "Def", angle: 220, onClick: (defender, attacker) => handleVillainAttack(defender, attacker, true) }
            ];

            if (player.allies.length) bttns.push({ label: "AlDef", angle: 260, onClick: (defender, attacker) => {
                if (defender.type !== "ally") {
                    handleVillainAttack(null, attacker, true) 
                } else {
                    handleVillainAttack(defender, attacker, true) 
                }
            }})

            setButtons(bttns)
        }
    }, [playing]);

    return (
        <div className='relative flex mr-5 justify-center items-end'>

            <button type='button' onClick={handleNextTurn} className='absolute flex w-14 h-14 items-center  justify-center px-2 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white' title='Siguiente turno'>
                <img src={NextIcon} />
            </button>

            {buttons.map((button, index) => (
                <button
                    key={index}
                    className={`absolute w-10 h-10 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white`}
                    style={{
                        transform: `rotate(${button.angle}deg) translate(${true ? "60" : "0"}px) rotate(-${button.angle}deg)`,
                    }}
                    onClick={() => button.onClick(cardToPlay ? cardToPlay : player, villain)}
                >
                    {button.label}
                </button>
            ))}

            {/* Botones orbitantes */}
            {/* {(playing?.type === "villain" ?  villainTurnButtons : playerTurnButtons).map((button, index) => (
                <button
                    key={index}
                    className={`absolute w-10 h-10 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white`}
                    style={{
                        transform: `rotate(${button.angle}deg) translate(${true ? "60" : "0"}px) rotate(-${button.angle}deg)`,
                    }}
                >
                    {button.label}
                </button>
            ))} */}

        </div>
    )
}

export default PlayerActBttns