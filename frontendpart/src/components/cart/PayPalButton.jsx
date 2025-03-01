// // import React from 'react'
// // import {PayPalButtons,PayPalScriptProvide, PayPalScriptProvider} from "@paypal/react-paypal-js";
// // const PayPalButton = ({amunt, onSuccess,onError}) => {
// //   return (
   
   
   
// //     <PayPalScriptProvider options={{'cilent-id':"AW1GyUcll41fs3U-CAUzAKubEBP7j17qPRdopcLGmxIGTA0kwxIqir85rFVbU-hSTKXhV27_Lw-Cmamd"}}/>
// //  <PayPalButtons style={{layout:'vertical'}} ;
// //  createOrder={(data,actions)=>{
// //     return actions.order.create({purchase_units:[{amount:{value:amount}}]})
// //  }}


// // )
// // onApprove={(data,actions)}=>{
// // rseturn action.order.capture[].then(onSuccess}
// // }
// // }

// // export default PayPalButton
// import React from "react";
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

// const PayPalButton = ({ amount, onSuccess, onError }) => {
//   return (
//     <PayPalScriptProvider 
//     // options={{ "client-id": "AW1GyUcll41fs3U-CAUzAKubEBP7j17qPRdopcLGmxIGTA0kwxIqir85rFVbU-hSTKXhV27_Lw-Cmamd" }} it is also crt,but we have written cliedn id in .env file ,so we need to import that 
//     options={{"client-id":import.meta.env.VITE_PAYPAL_CLIENT_ID}}
//     >
//       <PayPalButtons
//         style={{ layout: "vertical" }}
//         createOrder={(data, actions) => {
//           return actions.order.create({
//             purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2) } }]
//           });
//         }}
//         onApprove={(data, actions) => {
//           return actions.order.capture().then(onSuccess).catch(onError);
//         }}
//       />
//     </PayPalScriptProvider>
//   );
// };

// export default PayPalButton;



import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2) } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess).catch(onError);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
