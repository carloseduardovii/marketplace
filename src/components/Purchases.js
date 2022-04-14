import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/purchases.css';

const Purchases = ({isPurchasesOpen}) => {

    const purchases = useSelector(state => state.purchases)
    console.log(purchases)

    return (
        <div className={`purchases-modal ${isPurchasesOpen ? 'open' : ''}`}>
            My Purchases
            {
                purchases.map(purchase => (
                    <div>HOLA</div>
                ))
            }
        </div>
    );
};

export default Purchases;