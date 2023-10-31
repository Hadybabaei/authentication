// import Sms from "interfaces/smsSender.interface";
// const MailosaurClient = require('mailosaur')

// const mailosaur = new MailosaurClient('IY0UHXLtSB8ov3BEUEglUltuxezTEhln');
// const testStart = new Date(); // Only look for messages after our test began

// // Send an SMS message to your test number...
// const smsSender = async(options:Sms):Promise<void>=>{
//   const message = await mailosaur.messages.get('04kn6hn4', {
//     sentTo: '00989210848772', // YOUR_TEST_NUMBER,
//     body:"hey",
//     text:"asdasd"
//   }, {
//     receivedAfter: testStart
//   });
//   console.log(message.text.body); // "Your order number is 51223"
// console.log(message.text.codes[0].value); // "51223"
// }




// export default smsSender; 