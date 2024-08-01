import wallet from "./wallet/wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import bs58  from "bs58";


// Define our Mint address
const mint = publicKey('HUDMqRiGZKbeUR6bWfgisSghS6e6rNpoBv5VKuCxYPio')

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(signer));

(async () => {
    try {
        
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
           
           mint: mint,
           mintAuthority: signer,
            
        };

        let data: DataV2Args = {
          name: 'TREOZ',
          symbol: 'TREO',
          uri: 'https://arweave.net/1234',
          sellerFeeBasisPoints: 100,
          creators: null,
          collection:null,
          uses:null
        };

        let args: CreateMetadataAccountV3InstructionArgs = {
            data,
            isMutable: true,
            collectionDetails:null
        };

        let tx = createMetadataAccountV3(umi,{
            ...accounts,
            ...args
        });

        let result = await tx.sendAndConfirm(umi);
        console.log(bs58.encode(result.signature));
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
