import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';
import styles from '../pages/DonatePage.module.css';

export default function CheckoutForm() {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/donate`
            },
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage("Payment status: " + paymentIntent.status);
        } else {
            setMessage('Unexpected state');
        }

        setIsProcessing(false);
    };

    return (
        <form id='payment-form' onSubmit={handleSubmit}>
            <PaymentElement />
            <button className={styles.button} disabled={isProcessing} id='submit'>
                <span id='button-text'>
                    {isProcessing ? 'Processing ...' : 'Pay now'}
                </span>
            </button>
            {message && <div id="payment-message">{message} </div>}

            <br/><br/>
            <button className={styles.button} onClick={() => navigate('/')}>Back to Dashboard</button>
        </form>
    )
};