import React from 'react';
import '../styles/purchases.css';

const Purchases = ({isPurchasesOpen}) => {
    return (
        <div className={`purchases-modal ${isPurchasesOpen ? 'open' : ''}`}>
            My Purchases
        </div>
    );
};

export default Purchases;