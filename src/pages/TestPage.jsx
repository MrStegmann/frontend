import { useEffect, useState } from 'react';
import generateID from '../functions/generateID';
import defaultChars from "../temp/defaultChars.json";
import villains from "../temp/villain.json";
import ImproveCards from '../components/ImproveCards';
import AllyCard from '../components/AllyCard';
import Attacking from '../components/Attacking';
import CharCard from '../components/CharCard';
import EventCard from '../components/EventCard';
import EquipSlots from '../components/EquipSlots';
import VillainCard from '../components/VillainCard';
import VillainCards from '../components/VillainCards';

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
        hand: []
    });

    const [ villainCard, setVillainCard ] = useState(null);

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
            setPlayer({
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
            });

            const villainDeck = villains[0].deck.map(card => {
                return {...card, _id: generateID()};
            });
            setVillain({
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
                discards: []
            })
        }, 250);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (player._id === "") return;
        const timeout = setTimeout(() => {
            setRotation([player, villain]);
        }, 100);
        return () => clearTimeout(timeout);
    }, [player]);

    useEffect(() => {
        const timeout = setTimeout(() => setPlaying(rotation[0]), 100);
        return () => clearTimeout(timeout);
    }, [rotation]);

    useEffect(() => {
        if (!playing) return;
        if (playing.type === "villain") {
            setPlayer(prev => {
                return {
                    ...prev,
                    exhausted: 0,
                    allies: prev.allies.map(a => { return {...a, exhausted: 0}})
                };
            });
            handleGetHand();
            villainTurn();
        };
    } , [playing]);

    const villainTurn = () => {
        console.log(villain);
    };

    const handleGetVillainCard = () => {
        setVillain(prev => {
            const v = prev;
            if (v.deck[0]) {
                const [ first, ...rest ] = v.deck;
                const newHand = [first];
                const newDeck = rest;
                const newDiscards = [...v.discards, first];
                return {
                    ...v,
                    deck: newDeck,
                    discards: newDiscards,
                    hand: newHand
                };
            }
            // Barajar pila de descartes
            let newDeck = [...v.discards];
            const [ first, ...rest ] = newDeck;
            const newHand = [first];
            newDeck = rest;
            const newDiscards = [...v.discards, first];
            const newLvlEnrage = v.enrage + 1;
            return {
                ...v,
                deck: newDeck,
                discards: newDiscards,
                hand: newHand,
                enrage: newLvlEnrage
            };
        });
    };

    // Pasar turnos
    const handleNextTurn = () => {
        if (playing.type === "character") {
            const index = rotation.findIndex(r => r._id === playing._id);
            setPlaying(rotation[index+1]);
        };
        if (playing.type === "villain") {

            const players = rotation.filter(r => r.type !== "villain");
            players.push(players.shift());
            setRotation([...players, villain]);
            setTurns(prev => prev + 1);
        };
    };

    // Reestablece la mano. Si no le quedan cartas en el deck, reestablece el desck con las descartadas
    const handleGetHand = () => {
        if (player.maxHand === player.hand.length) return console.log('Ya tienes la mano completa');
 
        setPlayer(prev => {
            const a = prev;
            const maxToGet = a.maxHand - a.hand.length;
            let actualDiscards = [...a.discards];
            let actualDeck =  [...a.deck];
            if (actualDeck.length < maxToGet) {
                actualDeck = [...a.deck, ...actualDiscards];
                actualDiscards = [];
                console.log("Se ha reestablecido tu Deck con las descartadas")
            };

            const newHand = [...a.hand, ...actualDeck.splice(0, maxToGet)];
  
            return {...a, hand: newHand, deck: actualDeck, discards: actualDiscards};
        });
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
    const handleAttack = (a, d, aSetter, dSetter, isMagic = false) => {
        if (a.exhausted) return console.log('No puedes atacar. Esta carta está agotada');
        if (a.stunned) {
            aSetter(prev => {
                return {...prev, exhausted: 1, stunned: 0}
            });

            return console.log("Ya no estás stuneado");
        };

        let aAttack = isMagic ? a.mAt : a.pAt;

        let dDefense = isMagic ? d.mDef : d.pDef;

        const total = aAttack - dDefense < 0 ? 0 : aAttack - dDefense;

        const totalDamage = d.damage + total;
        const newHPvalue = d.hp - total;

        console.log(`${a.name} ataca ${isMagic ? "mágicamente" : "fisicamente"} a ${d.name} y le causa ${total} de daño físico`);

        dSetter({...d, hp: newHPvalue, damage: totalDamage});

        if (a.type && a.type === "ally") {
            const ally = {...a};

            ally.exhausted = 1;

            const counter = d.mAt > d.pAt ? d.mAt - a.mDef < 0 ? 0 :  d.mAt - a.mDef : d.pAt - a.pDef < 0 ? 0 : d.pAt - a.pDef;

            ally.hp = ally.hp - counter;

            console.log(`${d.name} contraataca ${ d.mAt > d.pAt ? "mágicamente" : "físicamente"} a tu aliado ${a.name} y le inflige ${counter} de daño. ${ally.hp <= 0 ? `${a.name} ha sido derrotado.` : ""}`);

            aSetter(prev => {
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
            aSetter(prev => { return { ...prev, exhausted: 1}});
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

    // Función para comprobar si la carta ALLY está en juego
    const checkPlayedAly = (card) => {
        if (!card) return false;
        const allies = player.allies;
        const found = allies.find( ally => ally._id === card._id);
        if (found) return true;
        return false;
    };

    return (
        <div className='w-full flex flex-col justify-between'>

            <div className='border border-indigo-500 rounded-lg p-5 flex justify-between'>
                <button type='button' className={`card-size border border-indigo-600 ${target?.type === "villain" ? "border-2" : ""} rounded-lg text-sm transition-transform duration-500`} onClick={() => setTarget(prev => prev ? prev.type === "villain" ? null : villain : villain)}>
                    <VillainCard villain={villain} />
                </button>

                {villain.hand[0] && <div className='card-size border border-indigo-600 rounded-lg bg-white'>
                    <VillainCards card={villain.hand[0]} />
                </div>}

                <div className={`card-size border ${villain.deck.length === 0 ? "bg-white border-gray-400" : "bg-blue-100 border-indigo-600"} border-indigo-600 rounded-lg bg-blue-100`} onClick={handleGetVillainCard}>{villain.deck.length}</div>
                
            </div>

            <div className='block border border-indigo-500 rounded-lg p-5'>
                <div className='flex justify-between'>
                    <button type='button' disabled={player.exhausted} className={`card-size border border-indigo-600 ${cardToPlay?.type === "character" ? "border-2" : ""} rounded-lg text-sm transition-transform duration-500 ${!player.exhausted ? "rotate-0" : "rotate-90"}`} onClick={() => setCardToPlay(prev => prev ? prev.type === "character" ? null : player : player)}>
                        <CharCard char={player} />
                    </button>

                    <button type='button' onClick={handleNextTurn} className='px-5 py-2 my-auto border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white'>Pasar turno</button>

                    {   (
                            cardToPlay?.type === "character" || 
                            (
                                cardToPlay?.type === "ally" && checkPlayedAly(cardToPlay)
                            )
                        ) && 
                        <Attacking onCancel={() => setCardToPlay(null)} handleAttack={handleAttack} cardToPlay={cardToPlay} setPlayer={setPlayer} villain={villain} setVillain={setVillain} />
                    }



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


                <div className='w-full flex flex-col items-center my-2'>
                    {action === 0 && 
                        <>
                            <p>Selecciona una carta que jugar</p>

                            {cardToPlay?.type !== "character" && cardToPlay && !checkPlayedAly(cardToPlay) && (
                                <div className='w-full flex flex-row gap-5 justify-center'>
                                    <button className='px-4 py-1 border border-indigo-500 rounded-xl hover:bg-indigo-600 hover:text-gray-100 font-bold'  onClick={handleAccept}>Aceptar</button>

                                    <button className='px-4 py-1 border border-indigo-500 rounded-xl hover:bg-indigo-600 hover:text-gray-100 font-bold' onClick={() => {
                                        if (action === 0) {
                                            setCardToPlay(null)
                                        } else {
                                            setAction(prev => prev - 1)
                                        }
                                    }}>Cancelar</button>
                            
                                </div>
                            )}
                        </>
                    }
                    {action === 1 && 
                        <>
                            <p>Selecciona las cartas para pagar</p>

                            {cardToPlay && (
                                <div className='w-full flex flex-row gap-5 justify-center'>
                                    <button className='px-4 py-1 border border-indigo-500 rounded-xl hover:bg-indigo-600 hover:text-gray-100 font-bold' onClick={handlePlayCard}>Aceptar</button>

                                    <button className='px-4 py-1 border border-indigo-500 rounded-xl hover:bg-indigo-600 hover:text-gray-100 font-bold' onClick={() => {
                                        setCardToPlay([])
                                        setAction(prev => prev - 1)
                                    }}>Cancelar</button>
                            
                                </div>
                            )}
                        </>
                    }
                    {action === 2 && 
                        <>
                            <p>Selecciona tu objetivo</p>

                            {target && (
                                <div className='w-full flex flex-row gap-5 justify-center'>
                                    <button className='px-4 py-1 border border-indigo-500 rounded-xl hover:bg-indigo-600 hover:text-gray-100 font-bold' onClick={handlePlayCard}>Aceptar</button>

                                    <button className='px-4 py-1 border border-indigo-500 rounded-xl hover:bg-indigo-600 hover:text-gray-100 font-bold' onClick={() => {
                                        setCardToPlay([]);
                                        setAction(0);
                                        setTarget(null);
                                    }}>Cancelar</button>
                            
                                </div>
                            )}
                        </>
                    }
                </div>
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

                    <input type='button' className={`card-size border ${player.deck.length === 0 ? "bg-white border-gray-400" : "bg-blue-100 border-indigo-600"} border-indigo-600 rounded-lg bg-blue-100 hover:cursor-pointer`} onClick={handleGetHand} />
                </div>
            </div>

        </div>
    )
}

export default TestPage