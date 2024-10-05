import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../app/app'
import {fetchLowStockCount} from '../app/app';
import { HiBellAlert } from "react-icons/hi2";

function State() {
    const [state, setState] = useContext(AppContext);
    const [lowStockCount, setLowStockCount]= useState(0);
    useEffect(()=>{
        getLowStockCount();
    }, [lowStockCount, state]);
    const getLowStockCount = () => {
        fetchLowStockCount().then((resp) => {
            setLowStockCount(resp.data);
        }).catch(err => {
            console.log(err);
        });      
    
    };

    return (
        <button type="button" className="btn  position-relative" style={{ backgroundColor: '#f8f9fa' }}>
            <HiBellAlert style={{fontSize:"1.6rem"}} />
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {lowStockCount}
                <span class="visually-hidden">unread messages</span>
            </span>
        </button>
    )
}

export default State