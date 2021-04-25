import {ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import React from 'react'

export default function ToastNotify() {
    return (
        <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        draggable
        pauseOnHover
        closeOnClick
        style={{zIndex:10000}}
        />
    )
}
