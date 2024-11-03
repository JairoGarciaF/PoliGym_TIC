import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { IconButton, TextField, Menu, MenuItem, Switch, FormControlLabel, ListItemIcon } from '@mui/material';
import { TbDotsVertical } from 'react-icons/tb';
import { FaShieldAlt, FaUser, FaSearch, FaEye, FaEyeSlash, FaList } from "react-icons/fa";
import { IoMale, IoFemale, IoMaleFemale } from "react-icons/io5";
import { GenderGraph } from './GenderGraph';



//TAbla de usuarios por horario con suma ****
//pastel tipo de usuario11

export const General = ({ usuarios }) => {


    return (
        <div className="h-[calc(100%-36px-49px)]  grid grid-rows-12 p-4 bg-slate-100 rounded-xl mt-2 open-sans gap-4 grid-cols-12">

            <GenderGraph usuarios={usuarios} />



        </div>
    );
};