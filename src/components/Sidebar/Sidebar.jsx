import React from 'react'
import { Profile } from './Profile'
import { RouteSelect } from './RouteSelect'
import { TbChevronLeftPipe, TbChevronRightPipe } from "react-icons/tb";
export const Sidebar = ({ expanded, setExpanded }) => {



    return (
        <nav className={`h-full py-4 pl-4 flex flex-col overflow-hidden transition-all duration-300 flex-shrink-0 ${expanded ? 'w-[15%]' : 'w-[4%]'}`}>
            <button onClick={() => setExpanded(curr => !curr)} className={`p-1.5 flex  rounded-lg bg-stone-200 text-stone-800 hover:bg-azul-marino-100 hover:text-azul-marino-500 ${expanded ? 'self-end' : ' justify-center'}`}>
                {expanded ? <TbChevronLeftPipe className='size-5' /> : <TbChevronRightPipe className='size-5' />}
            </button>
            <div className='py-4 flex items-center justify-center h-24'>
                <img src="./PoliGymLogo.png" alt="PoliGym Logo" className={`overflow-hidden transition-all  duration-300 ${expanded ? 'max-h-16 max-w-full' : 'max-h-10 max-w-full'} object-contain`} />
            </div>
            <RouteSelect expanded={expanded} />
            <Profile expanded={expanded} />
        </nav>

    )
}

