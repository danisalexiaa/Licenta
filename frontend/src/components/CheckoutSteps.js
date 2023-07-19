import React from 'react'

export default function CheckoutSteps(props) {
    return (
        <div className='row checkout-steps'>
            <div className={props.step1 ? 'active' : ''}>Logare</div>
            <div className={props.step2 ? 'active' : ''}>Generare bilet</div>
            <div className={props.step3 ? 'active' : ''}>Plata</div>
            <div className={props.step4 ? 'active' : ''}>Trimite comanda</div>
        </div>
    )
}
