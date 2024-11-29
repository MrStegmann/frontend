import { useState, useEffect } from 'react'
import ImproveCards from './ImproveCards';

const EquipSlots = ({improves, children}) => {
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
        <div className='w-full h-full flex my-2 gap-5'>
            <div className='flex flex-col gap-2'>
                { slot1 ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot1} />
                    </div>
                    :
                    slot0[0] ? 
                        <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                            <ImproveCards card={slot0[0]} /> 
                        </div>
                        : 
                        <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }

                {slot2 ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot2} />
                    </div>
                :
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }

                {slot3 ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot3} />
                    </div>
                :
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }
                {slot4 ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot4} />
                    </div>
                :
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }

                {slot6[0] ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot6[0]} />
                    </div>
                    : 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }

                {slot6[1] ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot6[1]} />
                    </div>
                    : 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }

                {slot6[2] ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot6[2]} />
                    </div>
                    : 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }
                
            </div>

            <div className='flex flex-col'>
                {children}
            </div>

            <div className='flex flex-col gap-2'>
                { slot1 ? 
                    <div className='px-2 py-1 w-12 h-12 border border-gray-400 rounded-lg text-sm' />
                    :
                    slot0[1] ? 
                        <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                            <ImproveCards card={slot0[1]} /> 
                        </div>
                        : 
                        <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }

                {slot5[0] ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot5[0]} /> 
                    </div>
                    : 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }

                {slot5[1] ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot5[1]} /> 
                    </div>
                    :
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }

                {slot5[2] ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot5[2]} /> 
                    </div>
                    : 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }

                {slot6[2] ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot6[2]} /> 
                    </div>
                    : 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }

                {slot6[3] ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot6[3]} /> 
                    </div>
                    : 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }

                {slot7[1] ? 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm'>
                        <ImproveCards card={slot7[1]} /> 
                    </div>
                    : 
                    <div className='px-2 py-1 w-12 h-12 border border-indigo-600 rounded-lg text-sm bg-white' />
                }
            </div>
        </div>
    )
}

export default EquipSlots