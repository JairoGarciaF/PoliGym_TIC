import React from 'react'
import { StatCards } from './StatCards'
import { UsersTable } from './UsersTable'
import { UsersGraph } from './UsersGraph'
import { ExercisesGraph } from './ExercisesGraph'
import { RoutinesGraph } from './RoutinesGraph'
import { PlansGraph } from './PlansGraph'


export const Grid = () => {
    return (
        <div className='h-[calc(100%-32px-8px)] grid grid-rows-12 mt-2 open-sans gap-3 grid-cols-12'>
            <StatCards />
            <UsersTable />
            <UsersGraph />
            <ExercisesGraph />
            <RoutinesGraph />
            <PlansGraph />
        </div>
    )
}

