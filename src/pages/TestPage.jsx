import { useEffect, useState } from 'react';
import generateID from '../functions/generateID';
import defaultChars from "../temp/defaultChars.json";
import ImproveCards from '../components/ImproveCards';
import AllyCard from '../components/AllyCard';
import Attacking from '../components/Attacking';

const TestPage = () => {
    const [ villain, setVillain ] = useState({
        name: "Villano",

        initMaxHp: 20,
        initHp: 20,
        maxHP: 20,
        hp: 20,
    
        initMaDef: 1,
        initPhDef: 1,
        mDef: 1,
        pDef: 1,

        initMaAt: 0,
        initPhAt: 1,
        mAt: 0,
        pAt: 10,

        stunned: 0,
        knocked: 0,
        improves: []
    });

    const [ player, setPlayer ] = useState({
        name: "Jugador",

        initMaxHp: 20,
        initHp: 20,
        maxHP: 20,
        hp: 20,
    
        initMaDef: 0,
        initPhDef: 1,
        mDef: 0,
        pDef: 1,

        initMaAt: 0,
        initPhAt: 1,
        mAt: 0,
        pAt: 1,

        stunned: 0,
        knocked: 0,
        exhausted: 0,
        improves: [],
        allies: [],
        deck: [
            {_id: generateID(), name: "Mejora el ataque físico", subType: "pAt", pAt: 2, type: "improve", cost: 2, value: 1},
            {_id: generateID(), name: "Mejora la defensa física", pDef: 2, type: "improve", subType: "pDef", cost: 3, value: 1},
            {_id: generateID(), name: "Aumenta la vida máxima", maxHP: 2, type: "improve", subType: "maxHP", cost: 1, value: 1},
            {_id: generateID(), name: "Mejora la defensa física", pDef: 2, type: "improve", subType: "pDef", cost: 2, value: 1}
        ],
        maxHand: 4,
        hand: [],
        discards: []
    });

    const [ action, setAction ] = useState(0);
    const [ isAttacking, setIsAttacking ] = useState(false);
    const [ cardToPlay, setCardToPlay ] = useState(null);
    const [ cardsToPay, setCardsToPay ] = useState([]);

    // Setea el player con los datos del personaje por defecto
    useEffect(() => {
        const timeout = setTimeout(() => {
            const deck = defaultChars[0].deck.map(card => {
                return {...card, _id: generateID()};
            });
            setPlayer({
                ...defaultChars[0],
                hand: [],
                discards: [],
                stunned: 0,
                knocked: 0,
                improves: [],
                allies: [],
                initMaAt: 0,
                initPhAt: 1,
                initMaDef: 0,
                initPhDef: 1,
                initMaxHp: 20,
                initHp: 20,
                deck
            });
        }, 250);

        return () => clearTimeout(timeout);
    }, []);


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
        let totalHP = a.initHp;

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

    // Función para jugadr una carta, pagando su coste y descartando las cartas seleccionadas para el pago
    const handlePlayCard = () => {
        if (cardsToPay.length === 0) return console.log('No has seleccionado ninguga carta para pagar el coste.');
        let totalValue = 0;
        cardsToPay.forEach((card) => totalValue += card.value);
        if (cardToPlay.cost > totalValue) return console.log(`El coste de esta carta es más alto. Coste: ${cardToPlay.cost}. Llevas: ${totalValue}`);

        setPlayer(prev => {
            const a = prev;
            const actualHand = [...a.hand]
            const newHand = actualHand.filter(c => c._id !== cardToPlay._id).filter(c => !cardsToPay.find(ctp => ctp._id === c._id));
            const newDiscard = [...a.discards, ...cardsToPay];
            if (cardToPlay.type === "improve") return improveCards(a, newHand, newDiscard);
            if (cardToPlay.type === "ally") return allyCards(a, newHand, newDiscard);
            
        });

        setCardToPlay(null);
        setCardsToPay([]);
        setAction(0);
    };

    // Ataque
    const handleAttack = (a, d, aSetter, dSetter, isMagic = false) => {
        let aAttack = isMagic ? a.mAt : a.pAt;
        let AtImproveTotal = 0;

        let dDefense = isMagic ? d.mDef : d.pDef;
        let dDefImproveTotal = 0;

        if (a.improves.length) {
            a.improves.forEach(improve => {
                const { pAt, mAt } = improve;
                if (isMagic && mAt) AtImproveTotal += mAt;
                if (!isMagic && pAt) AtImproveTotal += pAt;
            });
        };

        if (d.improves.length) {
            d.improves.forEach(improve => {
                const { pDef, mDef } = improve;
                if (!isMagic && pDef) dDefImproveTotal += pDef;
                if (isMagic && mDef) dDefImproveTotal += mDef;
            });
        };

        aAttack = aAttack + AtImproveTotal;
        dDefense = dDefense + dDefImproveTotal;

        const total = aAttack - dDefense < 0 ? 0 : aAttack - dDefense;

        const newHPvalue = d.hp - total;

        console.log(`${a.name} ataca ${isMagic ? "mágicamente" : "fisicamente"} a ${d.name} y le causa ${total} de daño físico`)
        dSetter({...d, hp: newHPvalue});

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
        };

        setIsAttacking(false);
    };

    // Seleccionar carta para jugar
    const handleAccept = () => {
        if (cardToPlay.type === "improve") {
            if (player.improves.length) {
                let cannotUse = false;
                let count = 0;
                player.improves.forEach(card => {
                    if (cardToPlay.slot === 0) {
                        if (card.slot === 1) return cannotUse = true;
                        if (card.slot === 0) ++count;
                        if (count >= 2) return cannotUse = true;
                    };
                    if (cardToPlay.slot === 1) {
                        if (card.slot === 0 || card.slot === 1) return cannotUse = true;
                    };
                    if (
                        cardToPlay.slot === 2 || 
                        cardToPlay.slot === 3 || 
                        cardToPlay.slot === 4
                    ) {
                        if (card.slot === cardToPlay.slot) return cannotUse = true;
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

    return (
        <div className='w-full flex flex-col justify-between'>

            <div className='block border border-indigo-500 rounded-lg p-5'>
                <div className='w-full'>
                    <h2 className='font-bold text-xl mb-5'>{villain.name}</h2>
                    <p className='font-bold'>Health point: {""}<span className='font-normal'>{villain.hp}/{villain.maxHP}</span></p>
                    <p className='font-bold'>Magic Defense: {""}<span className='font-normal'>{villain.mDef}</span></p>
                    <p className='font-bold'>Physical Defense: {""}<span className='font-normal'>{villain.pDef}</span></p>
                    <p className='font-bold'>Magic Attack: {""}<span className='font-normal'>{villain.mAt}</span></p>
                    <p className='font-bold'>Physical Attack: {""}<span className='font-normal'>{villain.pAt}</span></p>
                    <p className='font-bold'>Stunned: {""}<span className='font-normal'>{villain.stunned}</span></p>
                    <p className='font-bold'>Knocked: {""}<span className='font-normal'>{villain.knocked}</span></p>

                    <button type='button' className='px-5 py-2 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white' onClick={() => handleAttack(villain, player, setPlayer)}>Atacar al Jugador físicamente</button>
                    <button type='button' className='px-5 py-2 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white' onClick={() => handleAttack(villain, player, setPlayer, true)}>Atacar al Jugador mágicamente</button>
                </div>
                <div>
                    Cartas
                </div>
                
            </div>

            <div className='block border border-indigo-500 rounded-lg p-5'>
                <div>
                    <h2 className='font-bold text-xl mb-5'>{player.name}</h2>
                    <p className='font-bold'>Health point: {""}<span className='font-normal'>{player.hp}/{player.maxHP}</span></p>
                    <p className='font-bold'>Magic Defense: {""}<span className='font-normal'>{player.mDef}</span></p>
                    <p className='font-bold'>Physical Defense: {""}<span className='font-normal'>{player.pDef}</span></p>
                    <p className='font-bold'>Magic Attack: {""}<span className='font-normal'>{player.mAt}</span></p>
                    <p className='font-bold'>Physical Attack: {""}<span className='font-normal'>{player.pAt}</span></p>
                    <p className='font-bold'>Stunned: {""}<span className='font-normal'>{player.stunned}</span></p>
                    <p className='font-bold'>Knocked: {""}<span className='font-normal'>{player.knocked}</span></p>

                    <p className='font-bold'>Deck: {""}<span className='font-normal'>{player.deck.length}</span></p>

                    <p className='font-bold'>Hand: {""}<span className='font-normal'>{player.hand.length}</span></p>

                    <p className='font-bold'>Discards: {""}<span className='font-normal'>{player.discards.length}</span></p>

                    {!isAttacking && <button type='button' className='px-5 py-2 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white' onClick={() => setIsAttacking(true)}>Atacar</button>}

                    {isAttacking && <Attacking onCancel={() => setIsAttacking(false)} handleAttack={handleAttack} player={player} setPlayer={setPlayer} villain={villain} setVillain={setVillain} />}

                </div>

                <div className='w-full flex'>
                    {player.allies.map((card) => 
                        <div key={card._id} className='px-2 py-1 h-32 w-1/5 border border-indigo-600 rounded-lg text-sm'>
                            <AllyCard card={card} />
                        </div>
                    )}
                </div>

                <div className='w-full flex'>
                    {player.improves.map((card) => 
                        <div key={card._id} className='px-2 py-1 h-32 w-1/5 border border-indigo-600 rounded-lg text-sm'>
                            <ImproveCards card={card} />
                        </div>
                    )}
                </div>


                <div className='w-full flex flex-col items-center my-2'>
                    {action === 0 && 
                        <>
                            <p>Selecciona una carta que jugar</p>

                            {cardToPlay && (
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
                </div>
                <div className='my-10 flex'>

                    <div className='w-full flex'>
                        {player.hand.map((card) => (
                            <button key={card._id} className={`px-2 py-1 h-32 w-1/5 border hover:border-2 border-indigo-600 rounded-lg text-sm transition-transform duration-200 ${cardToPlay?._id === card._id ? "-translate-y-5" : cardsToPay.findIndex(ctp => ctp._id === card._id) !== -1 ? "-translate-y-2" : "-translate-y-0"}`} onClick={() => handleSelect(card)}>
                               {card.type === "improve" && <ImproveCards card={card} />}
                               {card.type === "ally" && <AllyCard card={card} />}
                            </button>
                        ))}
                    </div>

                    <input type='button' className='h-32 w-16 border border-indigo-600 rounded-lg bg-blue-100 hover:cursor-pointer' onClick={handleGetHand} />
                </div>
            </div>

        </div>
    )
}

export default TestPage