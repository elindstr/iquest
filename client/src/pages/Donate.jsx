import { useEffect, useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

function Donate(props) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        fetch('api/config').then(async (r) => {
            const {publishableKey} = await r.json();
            
            console.log(publishableKey)
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            body: JSON.stringify({}),
        }).then(async (r) => {
            const { clientSecret } = await r.json();
            
            console.log(clientSecret)
            setClientSecret(clientSecret);
        });
    }, []);

    return (
        <>
            <h1> Donate </h1>
            <p> This project was made with ❤️ by indie developers. Please consider supporting us. </p><br/>

            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
            
        </>
    );
};



export default Donate;
