import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
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
    };

    return (
        <form id='payment-form' onSubmit={handleSubmit}>
            <PaymentElement />
            <button disabled={isProcessing} id='submit'>
                <span id='button-text'>
                    {isProcessing ? 'Processing ...' : 'Pay now'}
                </span>
            </button>
        </form>

    )
}