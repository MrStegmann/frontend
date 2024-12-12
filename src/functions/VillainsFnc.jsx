const applyOnPlayedEvents = (prev, onPlayed) => {
     
    const onActiveEvents = onPlayed.filter(op => op.active);

    const p = prev;
    const allies = [...p.allies];
    let newHp = p.hp;
    let damage = p.damage;
    for (const data of onActiveEvents) {
        if (data.subType === "damage") {
            newHp -= data.damage;
            damage += data.damage;
            console.log(`Sufres ${data.damage} daño por la carta activa ${data.name} del villano`);
            allies.forEach(ally => {
                console.log(ally)
                let newAllyHp = ally.maxHP;
                let newDamage = ally.damage + data.damage;
                console.log(newAllyHp)
                console.log(newDamage)
                newAllyHp -= newDamage;
                ally.damage = newDamage;
                ally.hp = newAllyHp;
                console.log(ally)
            });
        };
    };
    return {...p, hp: newHp, damage, allies};
};

const setActiveOnPlayedCards = prev => {
    const v = prev;
    const newonPlayed = [...v.onPlayed];
    for (let i=0; i < newonPlayed.length; i++) {
        if (!newonPlayed[i].active) {
            newonPlayed[i].active = true;
        };
    };
    return {...prev, onPlayed: newonPlayed}
};

const villainEvents = (prev) => {
    const p = prev;
    const hand = p.hand[0];
    if (hand && hand.type === "onPlayed") {
        hand.active = false;
        const newOnPlayed = [...p.onPlayed, hand];
        
        return {
            ...p,
            hand: [],
            onPlayed: newOnPlayed
        }
    };

    return p;
};

const nextTargetRound = prev => {
    const p = prev;
    const [ first, ...rest ] = p;
    return rest;
};

const handleGetVillainCard = (prev) => {
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
};

const handleVillainAttack = (d, a, isDefending, setPlayer, setAttackRound) => {
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

const villainGetDamage = (prev, aAttack, isMagic) => {
    const p = prev;

    let dDefense = isMagic ? p.mDef : p.pDef;
    const total = aAttack - dDefense < 0 ? 0 : aAttack - dDefense;

    const totalDamage = p.damage + total;
    const newHPvalue = p.hp - total;

    console.log(`${a.name} ataca ${isMagic ? "mágicamente" : "fisicamente"} a ${p.name} y le causa ${total} de daño físico`);

    return {...p, hp: newHPvalue, damage: totalDamage}
};

const nextToAttackRound = prev => {
    const p = prev;
    const [ first, ...rest ] = p;
    return rest;
};

const villainAttackAlly = (prev, d) => {
    const pr = prev;
    const allies = [...pr.allies];
    const newDiscards = [...pr.discards];
    const allyIndex = allies.findIndex(ele => ele._id === a._id);
    if (d.hp <= 0) {
        allies.splice(allyIndex, 1);
        newDiscards.push(d);
    } else allies.splice(allyIndex, 1, d);
    return {...pr, allies, discards: newDiscards};
}

export {
    applyOnPlayedEvents,
    setActiveOnPlayedCards,
    villainEvents,
    nextTargetRound,
    handleGetVillainCard,
    handleVillainAttack,
    villainGetDamage,
    nextToAttackRound,
    villainAttackAlly
}