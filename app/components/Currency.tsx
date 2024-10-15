// The component that displays the coin data.
import React from 'react';
import Image from 'next/image';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'


// The Token receives the following props which are defined in the CryptoCurrencyProps interface.
interface CryptoCurrencyProps {
    cmc_rank: number;
    name: string;
    symbol: string;
    price: number;
    percent_change_24h: number;
    market_cap: number;
}

const removeMinus = (value: number) => {
    const stringValue = value.toFixed(2);
    return stringValue.replace('-', '');
}

const showBillionOrMillion = (value: number) => {
    if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(2)} Bn`;
    } else {
        return `${(value / 1000000).toFixed(2)} Mn`;
    }
}

const CryptoCurrency = ({cmc_rank, price, percent_change_24h, symbol, market_cap}: CryptoCurrencyProps) => {

    // The changeStyles variable is used to define the styles for the colours of the value display in the %-change
    // column.
    const changeStyles = 'w-20 h-7 my-auto rounded-lg px-2 pt-1 text-center font-bold';

    return (
        <div className='flex px-8 py-1 bg-[#2F2E2E] mb-5 text-slate-50 text-xs'>
            <div className='flex-none w-1/5'>#{cmc_rank}</div>
            <div className='flex flex-row justify-start gap-2 items-center w-1/3'>
                <Image
                    className='order-1'
                    src={`/svg/${symbol.toLowerCase()}.svg`}
                    width={32}
                    height={32}
                    alt='CUR'
                />
                <div className='order-2 my-auto'>
                    <p className='order-1 text-sm font-bold'>{symbol.toUpperCase()}</p>
                    <p className='order-2 text-[#707070]'>{showBillionOrMillion(market_cap)}</p></div>
            </div>

            <div className='flex-1 w-1/5 my-auto ml-2 font-bold'>${price.toFixed(2)}</div>
            <div className={percent_change_24h > 0 ? `${changeStyles} text-green-400 bg-green-400/15 ` : `${changeStyles} text-red-600 bg-red-500/15`}>

                {percent_change_24h > 0 ? (
                    <>
                        <TriangleUpIcon /> {percent_change_24h.toFixed(2)}%
                    </>
                ) : (
                    <>
                        <TriangleDownIcon /> {removeMinus(percent_change_24h)}%
                    </>
                )}
            </div>
        </div>
    );
};

export default CryptoCurrency;