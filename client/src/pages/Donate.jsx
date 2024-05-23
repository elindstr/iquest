import { useEffect, useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const publishableKey = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

function Payment(props) {
    const [stripePromise, setStripePromise] = useState(null);

    
    setStripePromise(loadStripe(publishableKey));

    return (
        <>
            <h1> Oh god i hope this works</h1>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
            </Elements>
        </>
    );
};


export default Donate;