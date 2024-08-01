import { Commitment, Connection, Keypair, PublicKey } from "@solana/web3.js"
import wallet from "./wallet/wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey('HUDMqRiGZKbeUR6bWfgisSghS6e6rNpoBv5VKuCxYPio');

// Recipient address
const to = new PublicKey('Ez7J7utS9AH53r2JUFFhiUzetxUfUc5Nu9jJrHey8DDB');

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromWallet = await getOrCreateAssociatedTokenAccount(
            connection,keypair,mint,keypair.publicKey
        );
        // Get the token account of the toWallet address, and if it does not exist, create it
        const toWallet = await getOrCreateAssociatedTokenAccount(
            connection,keypair,mint,to
        )
        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(
            connection,keypair,fromWallet.address,toWallet.address,keypair.publicKey,2000000
        );
        console.log(tx);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();