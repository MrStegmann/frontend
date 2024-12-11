import { useEffect, useState } from 'react';
import generateID from '../functions/generateID';
import defaultChars from "../temp/defaultChars.json";
import villains from "../temp/villain.json";
import ImproveCards from '../components/ImproveCards';
import AllyCard from '../components/AllyCard';
import CharCard from '../components/CharCard';
import EventCard from '../components/EventCard';
import EquipSlots from '../components/EquipSlots';
import VillainCard from '../components/VillainCard';
import VillainCards from '../components/VillainCards';
import PlayerActBttns from '../components/PlayerActBttns';
import VillainOnPlayed from '../components/VillainOnPlayed';

import { handleGetVillainCard, applyOnPlayedEvents, setActiveOnPlayedCards, villainEvents, nextTargetRound } from '../functions/VillainsFnc';

import { nextRotationGroup } from "../functions/GameFnc";

import { handleGetHand } from '../functions/PlayerFnc';

const TestPage = () => {
    const [ villain, setVillain ] = useState({
        _id: generateID(),
        name: "Villano",
        type: "villain",

        initMaxHp: 20,
        initHp: 20,
        maxHP: 20,
        hp: 20,
        damage: 0,
    
        initMaDef: 1,
        initPhDef: 1,
        mDef: 1,
        pDef: 1,

        initMaAt: 0,
        initPhAt: 1,
        mAt: 0,
        pAt: 5,

        phase: 0,
        enrage: 1,

        stunned: 0,
        improves: [],
        deck: [],
        discards: [],
        hand: [],
        allies: [],
        onPlayed: []
    });

    const [ attackRound, setAttackRound ] = useState([]);
    const [ eventRound, setEventRound ] = useState([]);

    const [ player, setPlayer ] = useState({
        _id: "",
        name: "Jugador",
        type: "character",
        initMaxHp: 20,
        initHp: 20,
        maxHP: 20,
        hp: 20,
        damage: 0,
    
        initMaDef: 0,
        initPhDef: 1,
        mDef: 0,
        pDef: 1,

        initMaAt: 0,
        initPhAt: 1,
        mAt: 0,
        pAt: 1,

        stunned: 0,
        exhausted: 0,
        improves: [],
        allies: [],
        deck: [],
        maxHand: 4,
        hand: [],
        discards: []
    });

    const [ action, setAction ] = useState(0);
    const [ cardToPlay, setCardToPlay ] = useState(null);
    const [ cardsToPay, setCardsToPay ] = useState([]);
    const [ target, setTarget ] = useState(null);

    const [ rotation, setRotation ] = useState([]);
    const [ playing, setPlaying ] = useState(null);
    const [ turns, setTurns ] = useState(0);

    // Setea el player con los datos del personaje y villano seleccionados
    useEffect(() => {
        const timeout = setTimeout(() => {
            const deck = defaultChars[0].deck.map(card => {
                return {...card, _id: generateID()};
            });
            const plr = {
                ...defaultChars[0],
                _id: generateID(),
                hand: [],
                discards: [],
                stunned: 0,
                damage: 0,
                improves: [],
                allies: [],
                initMaAt: defaultChars[0].mAt,
                initPhAt: defaultChars[0].pAt,
                initMaDef: defaultChars[0].mDef,
                initPhDef: defaultChars[0].pDef,
                initMaxHp: defaultChars[0].maxHP,
                initHp: defaultChars[0].hp,
                deck
            }

            setPlayer(plr);

            const villainDeck = villains[0].deck.map(card => {
                return {...card, _id: generateID()};
            });
            const vlln = {
                ...villains[0],
                _id: generateID(),

                initMaAt: villains[0].mAt,
                initPhAt: villains[0].pAt,
                initMaDef: villains[0].mDef,
                initPhDef: villains[0].pDef,
                initMaxHp: villains[0].maxHP,
                initHp: villains[0].hp,

                phase: 0,
                stunned: 0,

                hand: [],
                improves: [],
                deck: villainDeck,
                discards: [],
                allies: [],
                onPlayed: []
            }
            setVillain(vlln);

            setRotation([plr, vlln]);
        }, 250);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => setPlaying(rotation[0]), 100);
        return () => clearTimeout(timeout);
    }, [rotation]);

    useEffect(() => {
        if (!playing) return;
        if (playing.type === "villain") {
            setPlayer(handleGetHand);
            const players = rotation.filter(r => r.type !== "villain");
            setAttackRound(players);
            setEventRound(players);
        };
    } , [playing]);

    useEffect(() => {
        if (playing?.type !== "villain") return;
        if (attackRound.length) {
            setVillain(handleGetVillainCard)
            return;
        };
        if (eventRound.length) {
            setVillain(handleGetVillainCard);

            setVillain(villainEvents);
            setEventRound(nextTargetRound);
            return;
        };
        const timeout = setTimeout(() => {
            setPlayer(prev => applyOnPlayedEvents(prev, villain.onPlayed));
            setTimeout(() => {
                setVillain(setActiveOnPlayedCards);
                handleNextTurn();
            }, 100);
        }, 100);
        return () => clearTimeout(timeout);
    }, [attackRound, eventRound]);

    // Pasar turnos
    const handleNextTurn = () => {
        if (playing?.type === "character") {
            const index = rotation.findIndex(r => r._id === playing._id);
            setPlaying(rotation[index+1]);
        };
        if (playing?.type === "villain") {
            const players = rotation.filter(r => r.type !== "villain");
            players.push(players.shift());
            setRotation([...players, villain]);
            setTurns(prev => prev + 1);
        };
    };

    // Selecciona la carta para jugar y las cartas que la pagarán
    const handleSelect = (card) => {
        if (action === 0) {
            if (cardToPlay !== null && card._id === cardToPlay?._id) {
                setCardToPlay(null);
            };
            if (cardToPlay !== null && card._id !== cardToPlay?._id || cardToPlay === null) {
                setCardToPlay(card)
            };
        };
        if (action === 1) {
            if (cardsToPay.find(ctp => ctp._id === card._id)) {
                setCardsToPay(prev => prev.filter(ctp => ctp._id !== card._id));
            } else {
                if (card._id !== cardToPlay.id) setCardsToPay(prev => [...prev, card]);
            };
        };
    };

    // Función para pagar cartas de Mejora
    const improveCards = (a, newHand, newDiscard) => {
        const newImprove = [...a.improves, cardToPlay];

        let totalMaxHP = a.initMaxHp;
        let totalHP = a.initHp - a.damage;

        let totalPhAt = a.initPhAt;
        let totalMaAt = a.initMaAt;

        let totalPhADef = a.initPhDef;
        let totalMaDef = a.initMaDef;

        newImprove.forEach(iCard => {
            const { pAt, mAt, pDef, mDef, maxHP } = iCard;
            if (pAt) totalPhAt += pAt;
            if (mAt) totalMaAt += mAt;
            if (pDef) totalPhADef += pDef;
            if (mDef) totalMaDef += mDef;
            if (maxHP) {
                totalMaxHP += maxHP;
                totalHP += maxHP;
            };
        });

        totalHP = totalHP > totalMaxHP ? totalMaxHP : totalHP;

        return { 
            ...a,
            maxHP: totalMaxHP,
            hp: totalHP,

            pAt: totalPhAt,
            mAt: totalMaAt,

            pDef: totalPhADef,
            mDef: totalMaDef,

            improves: newImprove,  
            hand: newHand,
            discards: newDiscard
        };
    };

    // Función para pagar cartas de Aliados
    const allyCards = (a, newHand, newDiscard) => {
        const newAllies = [...a.allies, cardToPlay];

        return { 
            ...a,
            hand: newHand,
            discards: newDiscard,
            allies: newAllies
        };
    };

    // Función para pagar cartas de Evento
    const eventCards = (a, newHand, newDiscard) => {
        newDiscard.push(cardToPlay);

        const { hp, pAt } = cardToPlay;

        if (pAt) {
            let aAttack = a.pAt + pAt;
            let dDefense = target.pDef;
    
            const total = aAttack - dDefense < 0 ? 0 : aAttack - dDefense;
    
            const totalDamage = target.damage + total;
            const newHPvalue = target.hp - total;

            console.log(`${a.name} ataca fisicamente a ${target.name} y le causa ${total} de daño físico`);

            if (target.type === "villain") {
                setVillain(prev => {return {...prev, hp: newHPvalue, damage: totalDamage}});
            }

            return { 
                ...a,
                hand: newHand,
                discards: newDiscard
            };
        };
        
        if (hp) {
            const newHP = a.hp + hp;
        
            return { 
                ...a,
                hp: newHP,
                hand: newHand,
                discards: newDiscard
            };
        }
    };

    // Función para jugadr una carta, pagando su coste y descartando las cartas seleccionadas para el pago
    const handlePlayCard = () => {
        if (cardsToPay.length === 0) return console.log('No has seleccionado ninguga carta para pagar el coste.');

        let totalValue = 0;
        cardsToPay.forEach((card) => totalValue += card.value);
        if (cardToPlay.cost > totalValue) return console.log(`El coste de esta carta es más alto. Coste: ${cardToPlay.cost}. Llevas: ${totalValue}`);

        if (cardToPlay.type === "event" && ["pAt", "mAt"].includes(cardToPlay.subType) && !target && action === 1) return setAction(2);

        if (cardToPlay.type === "event" && ["pAt", "mAt"].includes(cardToPlay.subType) && !target) return console.log('Selecciona un objetivo primero');

        setPlayer(prev => {
            const a = prev;
            const actualHand = [...a.hand]
            const newHand = actualHand.filter(c => c._id !== cardToPlay._id).filter(c => !cardsToPay.find(ctp => ctp._id === c._id));
            const newDiscard = [...a.discards, ...cardsToPay];
            if (cardToPlay.type === "improve") return improveCards(a, newHand, newDiscard);
            if (cardToPlay.type === "ally") return allyCards(a, newHand, newDiscard);
            if (cardToPlay.type === "event") return eventCards(a, newHand, newDiscard);

        });

        setCardToPlay(null);
        setCardsToPay([]);
        setTarget(null);
        setAction(0);
    };

    // Ataque
    const handleVillainAttack = (d, a, isDefending) => {
        if (!d) return console.log('Debes seleccionar un defensor')
        const isMagic = a.mAt > a.pAt

        let attack = isMagic ? a.mAt : a.pAt;
        let defense = isMagic ? d.mDef : d.pDef;
        defense = isDefending ? defense : 0
        attack += a.hand[0].value;

        const total = attack - defense < 0 ? 0 : attack - defense;

        const totalDamage = d.damage + total;
        const newHPvalue = d.hp - total;

        console.log(`${a.name} ataca ${isMagic ? "mágicamente" : "fisicamente"} a ${d.name} y le causa ${total} de daño físico`);

        if (d.type === "ally") {

            d.hp = newHPvalue;
            d.damage = totalDamage;

            setPlayer(prev => {
                const pr = prev;
                const allies = [...pr.allies];
                const newDiscards = [...pr.discards];
                const allyIndex = allies.findIndex(ele => ele._id === a._id);
                if (d.hp <= 0) {
                    allies.splice(allyIndex, 1);
                    newDiscards.push(d);
                } else allies.splice(allyIndex, 1, d);
                return {...pr, allies, discards: newDiscards};
            });
        } else {
            setPlayer({...d, hp: newHPvalue, damage: totalDamage, exhausted: isDefending ? 1 : 0});
        };

        setAttackRound(prev => {
            const p = prev;
            const [ first, ...rest ] = p;
            return rest;
        });
    };

    const handleAttack = (a, isMagic = false) => {
        if (!a) return console.log('No hay atacante seleccionado');
        if (a.exhausted) return console.log('No puedes atacar. Esta carta está agotada');
        if (a.stunned) {
            if (a.type === "character") {
                setPlayer(prev => {
                    return {...prev, exhausted: 1, stunned: 0}
                });
            } else {
                setPlayer(prev => {
                    const p = prev;
                    const allies = p.allies;
                    const allyIndex = allies.findIndex(ele => ele._id === a._id);
                    const ally = {...a, stunned: 0, exhausted: 1};
                    allies.splice(allyIndex, 1, ally);
                    return {...p, allies}
                });
            }
            

            return console.log("Ya no estás stuneado");
        };

        let aAttack = isMagic ? a.mAt : a.pAt;

        

        setVillain(prev => {
            const p = prev;

            let dDefense = isMagic ? p.mDef : p.pDef;
            const total = aAttack - dDefense < 0 ? 0 : aAttack - dDefense;

            const totalDamage = p.damage + total;
            const newHPvalue = p.hp - total;

            console.log(`${a.name} ataca ${isMagic ? "mágicamente" : "fisicamente"} a ${p.name} y le causa ${total} de daño físico`);

            return {...p, hp: newHPvalue, damage: totalDamage}
        });

        if (a.type && a.type === "ally") {
            const ally = {...a};

            ally.exhausted = 1;

            const counter = villain.mAt > villain.pAt ? villain.mAt - a.mDef < 0 ? 0 :  villain.mAt - a.mDef : villain.pAt - a.pDef < 0 ? 0 : villain.pAt - a.pDef;

            ally.hp = ally.hp - counter;

            console.log(`${villain.name} contraataca ${ villain.mAt > villain.pAt ? "mágicamente" : "físicamente"} a tu aliado ${a.name} y le inflige ${counter} de daño. ${ally.hp <= 0 ? `${a.name} ha sido derrotado.` : ""}`);

            setPlayer(prev => {
                const pr = prev;
                const allies = [...pr.allies];
                const newDiscards = [...pr.discards];
                const allyIndex = allies.findIndex(ele => ele._id === a._id);
                if (ally.hp <= 0) {
                    allies.splice(allyIndex, 1);
                    newDiscards.push(ally);
                } else allies.splice(allyIndex, 1, ally);
                return {...pr, allies, discards: newDiscards};
            });
        } else {
            setPlayer(prev => { return { ...prev, exhausted: 1}});
        };

        setCardToPlay(null);
    };

    // Seleccionar carta para jugar
    const handleAccept = () => {
        if (cardToPlay.type === "improve") {
            if (player.improves.length) {
                let cannotUse = false;
                let count = 0;
                player.improves.forEach(card => {
                    // Armas de una mano y escudo
                    if (cardToPlay.slot === 0) {
                        if (card.slot === 1) return cannotUse = true;
                        if (card.slot === 0) ++count;
                        if (count >= 2) return cannotUse = true;
                    };
                    // Armas de dos manos
                    if (cardToPlay.slot === 1) {
                        if (card.slot === 0 || card.slot === 1) return cannotUse = true;
                    };
                    // Armadura (cabeza, peto, grebas)
                    if (
                        cardToPlay.slot === 2 || 
                        cardToPlay.slot === 3 || 
                        cardToPlay.slot === 4
                    ) {
                        if (card.slot === cardToPlay.slot) return cannotUse = true;
                    };
                    // Collares
                    if (cardToPlay.slot === 5) {
                        if (card.slot === 5) ++count;
                        if (count >= 3) return cannotUse = true;
                    };
                    // Anillos
                    if (cardToPlay.slot === 6) {
                        if (card.slot === 6) ++count;
                        if (count >= 4) return cannotUse = true;
                    };
                    // Trinkets
                    if (cardToPlay.slot === 7) {
                        if (card.slot === 7) ++count;
                        if (count >= 2) return cannotUse = true;
                    };
                });
                if (cannotUse) return console.log('No puedes jugar esta carta. Ya has alcanzado el máximo para este Slot.');
            };
        };

        if (cardToPlay.type === "ally") {
            if (player.allies.length === 3) return console.log("No puedes jugar más aliados.");
        };
        setAction(prev => prev + 1);
    };

    // Cancelar acción
    const handleOnCancelAction = () => {
        setCardToPlay(null);
        setAction(0);
        setCardsToPay([]);
        setTarget(null)
    };

    // Función para comprobar si la carta ALLY está en juego
    const checkPlayedAlly = (card) => {
        if (!card) return false;
        const allies = player.allies;
        const found = allies.find( ally => ally._id === card._id);
        if (found) return true;
        return false;
    };

    return (
        <div className='w-full flex flex-col justify-between'>

            <div className='border border-indigo-500 rounded-lg p-5'>
                <div className='flex justify-between'>
                    <button type='button' className={`card-size border border-indigo-600 ${target?.type === "villain" ? "border-2" : ""} rounded-lg text-sm transition-transform duration-500`} onClick={() => setTarget(prev => prev ? prev.type === "villain" ? null : villain : villain)}>
                        <VillainCard villain={villain} />
                    </button>

                    {villain.hand[0] && <div className='card-size border border-indigo-600 rounded-lg bg-white'>
                        <VillainCards card={villain.hand[0]} />
                    </div>}

                    <div className={`card-size border ${villain.deck.length === 0 ? "bg-white border-gray-400" : "bg-blue-100 border-indigo-600"} border-indigo-600 rounded-lg bg-blue-100`} onClick={handleGetVillainCard}>{villain.deck.length}</div>
                </div>
                
                <div  className='flex justify-between'>
                    {villain.onPlayed.map((card) => 
                        <div key={card._id} className='card-size border border-indigo-600 rounded-lg text-sm transition-transform duration-200'>
                            <VillainOnPlayed card={card} />
                        </div>
                    ) }

                </div>
            </div>

            <div className='block border border-indigo-500 rounded-lg p-5'>
                <div className='flex justify-between'>
                    <button type='button' disabled={player.exhausted} className={`card-size border border-indigo-600 ${cardToPlay?.type === "character" ? "border-2" : ""} rounded-lg text-sm transition-transform duration-500 ${!player.exhausted ? "rotate-0" : "rotate-90"}`} onClick={() => setCardToPlay(prev => prev ? prev.type === "character" ? null : player : player)}>
                        <CharCard char={player} />
                    </button>

                    <PlayerActBttns handles={{handleNextTurn, handleAttack, checkPlayedAlly, handleOnCancelAction, handleVillainAttack, handleAccept, handlePlayCard}} cardToPlay={cardToPlay} cardsToPay={cardsToPay} villain={villain} playing={playing} player={player} action={action} setAction={setAction} target={target} />

                </div>

                <EquipSlots improves={player.improves} />

                <div className='w-full flex'>
                    {player.allies.map((card) => 
                        <button key={card._id} disabled={card.exhausted} className={`card-size border border-indigo-600 ${cardToPlay?._id === card._id ? "border-2" : ""} rounded-lg text-sm transition-transform duration-500 ${!card.exhausted ? "rotate-0" : "rotate-90"}`} onClick={() => setCardToPlay(prev => prev ? prev._id === card._id ? null : card : card)}>
                            <AllyCard card={card} />
                        </button>
                    )}
                </div>

                {/* <div className='w-full flex'>
                    {player.improves.map((card) => 
                        <div key={card._id} className='card-size border border-indigo-600 rounded-lg text-sm'>
                            <ImproveCards card={card} />
                        </div>
                    )}
                </div> */}
                
                <div className='my-10 flex'>

                    <div className='w-full flex'>
                        {player.hand.map((card) => (
                            <button key={card._id} className={`card-size border hover:border-2 border-indigo-600 rounded-lg text-sm transition-transform duration-200 ${cardToPlay?._id === card._id ? "-translate-y-5" : cardsToPay.findIndex(ctp => ctp._id === card._id) !== -1 ? "-translate-y-2" : "-translate-y-0"}`} onClick={() => handleSelect(card)}>
                               {card.type === "improve" && <ImproveCards card={card} />}
                               {card.type === "ally" && <AllyCard card={card} />}
                               {card.type === "event" && <EventCard card={card} />}
                            </button>
                        ))}
                    </div>

                    <input type='button' className={`card-size border ${player.deck.length === 0 ? "bg-white border-gray-400" : "bg-blue-100 border-indigo-600"} border-indigo-600 rounded-lg bg-blue-100 hover:cursor-pointer`} onClick={() => setPlayer(handleGetHand)} />
                </div>
            </div>

        </div>
    )
}

export default TestPage