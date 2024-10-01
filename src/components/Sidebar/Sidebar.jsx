import React from 'react'
import { Profile } from './Profile'
import { RouteSelect } from './RouteSelect'

export const Sidebar = () => {
    return (
        <div>
            <div className='overflow-y-scrol sticky top-4 h-[calc(100vh-32px-56px)]'>
                <div className='flex flex-col items-center pb-5'>
                    <img src="./PoliGymLogo.png" alt="PoliGym Logo" className='h-20 w-min' />
                </div>
                <RouteSelect />
            </div>


            <Profile />
        </div>

    )
}

