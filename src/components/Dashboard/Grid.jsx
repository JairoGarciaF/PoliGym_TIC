import React from 'react'
import { StatCards } from './StatCards'
import { UsersTable } from './UsersTable'
import { ExercisesGraph } from './ExercisesGraph'
import { RoutinesGraph } from './RoutinesGraph'
import { PlansGraph } from './PlansGraph'
import { TopUsers } from './TopUsers'


export const Grid = () => {
    return (
        <div className='h-[calc(100%-36px-8px)] grid grid-rows-12 p-4 bg-slate-100 rounded-xl mt-2 open-sans gap-4 grid-cols-12'>
            <StatCards />
            {/* <UsersTable /> */}
            <TopUsers />
            <ExercisesGraph />
            <RoutinesGraph />
            <PlansGraph />
        </div>
    )
}


