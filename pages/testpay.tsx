// Install this npm package for working: npm i @paypal/react-paypal-js
import { useState, useEffect } from 'react'
import {
  PayPalScriptProvider,
  BraintreePayPalButtons,
  usePayPalScriptReducer,
  DISPATCH_ACTION,
} from '@paypal/react-paypal-js'

// This values are the props in the UI
const style = { label: 'paypal', layout: 'vertical' }
const amount = '2'
// const addressFromBachmans = {
//     recipientName: "Scruff McGruff",
//     line1: "1234 Main St.",
//     line2: "Unit 1",
//     city: "Chicago",
//     countryCode: "US",
//     postalCode: "60652",
//     state: "IL",
//     phone: "123.456.7890", // can be written like 1234567890 also
// }

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options }, dispatch] = usePayPalScriptReducer()

  useEffect(() => {
    dispatch({
      type: 'resetOptions' as DISPATCH_ACTION.RESET_OPTIONS,
      value: {
        ...options,
        currency: currency,
      },
    })
  }, [currency])

  return (
    <BraintreePayPalButtons
      // style={style}
      disabled={false}
      // fundingSource="" // Available values are: ["paypal", "card", "credit", "paylater", "venmo"]
      forceReRender={[style, amount]}
      createOrder={function (data, actions) {
        return actions.braintree
          .createPayment({
            flow: 'checkout',
            amount: amount, // Here change the amount if needed
            currency: 'USD', // Here change the currency if needed
            intent: 'capture',
            enableShippingAddress: true,
            shippingAddressEditable: false,
            // shippingAddressOverride: addressFromBachmans,
          })
          .then((orderId) => {
            // arrives here upon finishing create_payment_resource API:
            // Your code here after create the order
            console.log('before returning order id : ', orderId)
            alert('ORder ID : ' + orderId)
            return orderId
          })
      }}
      onApprove={function (data, actions) {
        return actions.braintree.tokenizePayment(data).then((payload) => {
          // Your code here after capture the order
          console.log('into approve side')
          console.log(JSON.stringify(payload))
        })
      }}
    />
  )
}

export default function App() {
  const [clientToken, setClientToken] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(
          'https://react-paypal-js-storybook.fly.dev/api/braintree/generate-client-token',
          { method: 'POST' }
        )
      ).json()
      console.log('this is token :', response?.client_token)
      console.log('this is Token :', response?.clientToken)
      setClientToken(response?.client_token || response?.clientToken)

      // setClientToken('MIIBCgKCAQEA0R/qemAuwkbY5MRNY3zJFlBLlaabXnkqjREYLWmQyou7SL55lxAGmNComz5m3huDbgNTpFSWqJcSmXF0gFzBIcE2LIboGuLsKZktM/evS/ISWZ2nHbZk2eN7WcXWVLhh5ivSZE4uyAAvgsV2ogR7kRLShXKjxsxu8zUZKKrhz8lwFjgs08jttN0zUYICdUtrv5a5v2kS0/OsYIAUNoeMCD8J12VoO3vn34CgCViEo9s9mzHpUL24H3mHU/DdsvHPiAKVADD1EOPQtUfSe9E73PFUvahfYUTYBt4q1Ze95OrFEp4Hnw9c/hMGYhNnwJTNDPAyukPV8tkK+tDf5V+GCQIDAQAB')
    })()
  }, [])

  return (
    <>
      {clientToken ? (
        <div style={{ maxWidth: '750px', minHeight: '200px' }}>
          <PayPalScriptProvider
            options={{
              clientId: 'test',
              components: 'buttons',
              // dataUserIdToken: "your-tokenization-key-here",
              // dataClientToken: clientToken,
              intent: 'capture',
              vault: false,
            }}
          >
            <ButtonWrapper currency={'USD'} />
          </PayPalScriptProvider>
        </div>
      ) : (
        <h1>Loading token...</h1>
      )}
    </>
  )
}
