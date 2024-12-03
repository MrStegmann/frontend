import { useState, useEffect } from 'react'
import ImproveCards from './ImproveCards';

const EquipSlots = ({improves}) => {
    const [ slot0, setSlot0 ] = useState([]);
    const [ slot1, setSlot1 ] = useState(null);
    const [ slot2, setSlot2 ] = useState(null);
    const [ slot3, setSlot3 ] = useState(null);
    const [ slot4, setSlot4 ] = useState(null);
    const [ slot5, setSlot5 ] = useState([]);
    const [ slot6, setSlot6 ] = useState([]);
    const [ slot7, setSlot7 ] = useState([]);

    const resetSlots = () => {
        setSlot0([]);
        setSlot1(null);

        setSlot2(null);
        setSlot3(null);
        setSlot4(null);

        setSlot5([]);
        setSlot6([]);
        setSlot7([]);
    };

    useEffect(() => {
        resetSlots();
        improves.forEach(card => {
            if (card.slot === 0) {
                setSlot0(prev => [...prev, card]);
            };
            if (card.slot === 1) {
                setSlot1(card);
            };
            if (card.slot === 2) {
                setSlot2(card);
            };
            if (card.slot === 3) {
                setSlot3(card);
            };
            if (card.slot === 4) {
                setSlot4(card);
            };
            if (card.slot === 5) {
                setSlot5(prev => [...prev, card]);
            };
            if (card.slot === 6) {
                setSlot6(prev => [...prev, card]);
            };
            if (card.slot === 7) {
                setSlot7(prev => [...prev, card]);
            };
        });
    }, [improves]);

    return (
        <div className='w-full h-full flex flex-col my-2 gap-5'>

            <div className='flex gap-2'>

                {/** Mano 1 y 2 */}
                { slot1 ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot1} />
                    </div>
                    :
                    slot0[0] ? 
                        <div className='card-size border border-indigo-600 rounded-lg '>
                            <ImproveCards card={slot0[0]} /> 
                        </div>
                        : 
                        <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }
                { slot1 ? 
                    <div className='card-size border border-gray-400 rounded-lg ' />
                    :
                    slot0[1] ? 
                        <div className='card-size border border-indigo-600 rounded-lg '>
                            <ImproveCards card={slot0[1]} /> 
                        </div>
                        : 
                        <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }
                {/** Fin Mano 1 y 2 */}

                {/** Armadura Cabeza, Pecho, Piernas */}
                {slot2 ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot2} />
                    </div>
                :
                    <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }

                {slot3 ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot3} />
                    </div>
                :
                    <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }
                {slot4 ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot4} />
                    </div>
                :
                    <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }
                {/** Fin Armadura Cabeza, Pecho, Piernas */}


                {/** Trinkets 1 y 2 */}
                {slot6[3] ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot6[3]} /> 
                    </div>
                    : 
                    <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }

                {slot7[1] ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot7[1]} /> 
                    </div>
                    : 
                    <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }
                {/** Fin Trinkets 1 y 2 */}
            </div>

            

            <div className='flex gap-2'>
                {/** Necks 1, 2 y 3 */}
                {slot5[0] ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot5[0]} /> 
                    </div>
                    : 
                    <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }

                {slot5[1] ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot5[1]} /> 
                    </div>
                    :
                    <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }

                {slot5[2] ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot5[2]} /> 
                    </div>
                    : 
                    <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }
                {/** Fin Necks 1, 2 y 3 */}

                
                {/** Anillos 1, 2, 3 y 4 */}
                {slot6[0] ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot6[0]} />
                    </div>
                    : 
                    <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }

                {slot6[1] ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot6[1]} />
                    </div>
                    : 
                    <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }

                {slot6[2] ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot6[2]} /> 
                    </div>
                    : 
                    <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }

                {slot6[3] ? 
                    <div className='card-size border border-indigo-600 rounded-lg '>
                        <ImproveCards card={slot6[3]} /> 
                    </div>
                    : 
                    <div className='card-size border border-indigo-600 rounded-lg  bg-white' />
                }
                {/** Fin Anillos 1, 2, 3 y 4 */}
            </div>
        </div>
    )
}

export default EquipSlots