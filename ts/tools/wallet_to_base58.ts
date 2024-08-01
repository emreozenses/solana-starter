import bs58 from 'bs58'
import prompt from 'prompt'

/*(async () => {
    // Start our prompt
    prompt.start()

    // Take in base58 string
    console.log('Enter your wallet file:');
    const { privkey } = await prompt.get(['privkey']);
    // Decode private key
    const wallet = bs58.encode(Buffer.from(JSON.parse(privkey as string)));
    // Print out wallet
    console.log(`Your base58-encoded private key is:\n${wallet}`);
})()*/


const kp = bs58.decode(
  '3xPCV2PmNN6wBUss2D873HbupuD2xWpksV2aaj7Cj1jnHWCYkL8ETDj1RcH7JstqSivy6XrJkCb4nN8oyszSNSho'
);

console.log("my secret key: " + kp);
