import wallet from "./wallet/wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
      // Follow this JSON structure
      // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
      const imageUrl = 'https://arweave.net/1wOSy0Y3H5S0RjYB6ysQEIaOWhN9lVrBHE1pfKVWh8s'
       const metadata = {
           name: "Ruggy",
           symbol: "RGY",
           description: "generated rug image",
           image: imageUrl,
           attributes: [
               {trait_type: 'color', value: 'orange'},
               {trait_type: 'rarity', value: '2'}
               
           ],
           properties: {
               files: [
                   {
                       type: "image/png",
                       uri: imageUrl
                   },
               ]
           },
           creators: []
       };
       const myUri = await umi.uploader.uploadJson(metadata);
       console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
