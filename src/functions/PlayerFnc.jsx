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

export { 
    handleGetHand
}