import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const Stripe = ({data}) => {
  console.log('thing is',data);
    const onToken =(token)=>{
        console.log('token',token);

    }
    return (
        <div style={{textAlign:'center',marginTop:'10%'}}>
              <StripeCheckout
        token={onToken}
        name='Shop'
        currency='INR'
        amount={data&& 9000}
        stripeKey="pk_test_51JdUJISGWmpnZE6pKYPS9YwJjyMkKiBflj9aYzInq5TgJHXnWzjcDaoC4Cy0NPdAdrbSwZdaEVZK5oPmksHfYitp002dJjesUp"
      />

      {/* <input type="file" name="" id="" /> */}
        </div>
    )
}

export default Stripe