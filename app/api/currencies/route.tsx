// import { GetServerSideProps } from "next";
import { NextResponse } from "next/server";
import axios from "axios";
import { CryptoData } from "@/app/types/CryptoCurrency";

// Get the latest cryptocurrency data from the coin market API.
export async function GET() {

    // Make a get request to the coin market API using the API key as custom header.
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=market_cap&sort_dir=desc&limit=25 ', {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_API_KEY,
        },
    });

    const data: CryptoData[] = await response.data.data;

    // The data comes as object from coin market, why we return the data array here.
    return NextResponse.json(data);
    

}


// export const getServerSideProps: GetServerSideProps = async () => {
//     const res = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=market_cap&sort_dir=desc&limit=25', {
//         headers: {'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_API_KEY},
//     });
//     const data: CryptoData[] = await res.json();

//     return {
//         props: {
//             cryptoData: data,
//         },
//     };
// };

