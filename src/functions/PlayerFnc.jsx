// Reestablece la mano. Si no le quedan cartas en el deck, reestablece el desck con las descartadas
const handleGetHand = (prev) => {
    if (prev.maxHand === prev.hand.length) {
        console.log('Ya tienes la mano completa');
        return prev;
    };
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

    return {
        ...a, 
        exhausted: 0,
        allies: prev.allies.map(a => { return {...a, exhausted: 0}}), 
        hand: newHand, 
        deck: actualDeck, 
        discards: actualDiscards
    };

};


    // Función para pagar cartas de Mejora
    const improveCards = (a, newHand, newDiscard, cardToPlay) => {
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
    const allyCards = (a, newHand, newDiscard, cardToPlay) => {
        const newAllies = [...a.allies, cardToPlay];

        return { 
            ...a,
            hand: newHand,
            discards: newDiscard,
            allies: newAllies
        };
    };

    // Función para pagar cartas de Evento
    const eventCards = (a, target, newHand, newDiscard, cardToPlay) => {
        newDiscard.push(cardToPlay);

        const { hp, pAt } = cardToPlay;

        if (pAt) {
            let aAttack = a.pAt + pAt;
            let dDefense = target.pDef;
    
            const total = aAttack - dDefense < 0 ? 0 : aAttack - dDefense;
    
            const totalDamage = target.damage + total;
            const newHPvalue = target.hp - total;

            console.log(`${a.name} ataca fisicamente a ${target.name} y le causa ${total} de daño físico`);

            return [
                { 
                    ...a,
                    hand: newHand,
                    discards: newDiscard
                },
                { hp: newHPvalue, damage: totalDamage}
            ];
        };
        
        if (hp) {
            const newHP = a.hp + hp;
        
            return [{ 
                ...a,
                hp: newHP,
                hand: newHand,
                discards: newDiscard
            }];
        }
    };

const setPlayedCard = (prev, target, cardToPlay, cardsToPay, cb) => {
    const a = prev;
    const actualHand = [...a.hand]
    const newHand = actualHand.filter(c => c._id !== cardToPlay._id).filter(c => !cardsToPay.find(ctp => ctp._id === c._id));
    const newDiscard = [...a.discards, ...cardsToPay];
    if (cardToPlay.type === "improve") return improveCards(a, newHand, newDiscard, cardToPlay);
    if (cardToPlay.type === "ally") return allyCards(a, newHand, newDiscard, cardToPlay);
    if (cardToPlay.type === "event") {
        const [ player, villain ] = eventCards(a, target, newHand, newDiscard, cardToPlay);
        cb(villain);
        return player;
    };
};

const setPlayerExhausted = prev => {
    return {...prev, exhausted: 1}
};

const attackWithAlly = (prev, ally) => {
    const pr = prev;
    const allies = [...pr.allies];
    const newDiscards = [...pr.discards];
    const allyIndex = allies.findIndex(ele => ele._id === ally._id);
    if (ally.hp <= 0) {
        allies.splice(allyIndex, 1);
        newDiscards.push(ally);
    } else allies.splice(allyIndex, 1, ally);
    return {...pr, allies, discards: newDiscards};
};

const setPlayerExhaustedNotStunned = prev => {
    return {...prev, exhausted: 1, stunned: 0}
};

const setAlliExhaustedNotStunned = (prev, a) => {
    const p = prev;
    const allies = p.allies;
    const allyIndex = allies.findIndex(ele => ele._id === a._id);
    const ally = {...a, stunned: 0, exhausted: 1};
    allies.splice(allyIndex, 1, ally);
    return {...p, allies}
}

export { 
    handleGetHand,
    setPlayedCard,
    setPlayerExhausted,
    attackWithAlly,
    setPlayerExhaustedNotStunned,
    setAlliExhaustedNotStunned
}