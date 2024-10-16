'use client';

import React, { useState } from 'react';
import { CryptoData } from "@/app/types/CryptoCurrency";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { sort } from 'fast-sort';
import Header from './Header';
import ChangeIndicator from './ChangeIndicator';
import Image from 'next/image';

type Props = {
    cryptoData: CryptoData[];
}

// Function to display sorting arrow
const displayArrow = (sortKey: string, activeSort: string, order: string) => {
    if (sortKey !== activeSort) {
        return <TriangleUpIcon />;
    }
    return order === 'asc' ? <TriangleDownIcon color='purple.500' /> : <TriangleUpIcon color='purple.500' />;
}

const showBillionOrMillion = (value: number) => {
    if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(2)} Bn`;
    } else {
        return `${(value / 1000000).toFixed(2)} Mn`;
    }
}

const CurrencyList = ({ cryptoData }: Props) => {

    // const [sortKey, setSortKey] = useState('cmc_rank');
    const [order, setOrder] = useState<string>('asc');
    const [sortedData, setSortedData] = useState<CryptoData[]>(cryptoData);
    const [sortKey, setSortKey] = useState('cmc_rank');
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSort = (sortParam: keyof CryptoData | 'price' | 'percent_change_24h') => {

        setSortKey(sortParam);

        const sortedData = order === 'asc'
            ? sort(cryptoData).asc(item => {
                if (sortParam === 'price') return item.quote.USD.price;
                if (sortParam === 'percent_change_24h') return item.quote.USD.percent_change_24h;
                return item[sortParam];
            })
            : sort(cryptoData).desc(item => {
                if (sortParam === 'price') return item.quote.USD.price;
                if (sortParam === 'percent_change_24h') return item.quote.USD.percent_change_24h;
                return item[sortParam];
            });

        setSortedData(sortedData);
        setOrder(order === 'asc' ? 'desc' : 'asc');
    };

    // Filter and sort tokens based on search query and sorting params
    const filteredData = sortedData.filter((token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            <div className='max-w-5xl mx-auto text-slate-200'>
                <div>
                    <Header
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
                <table className='width-auto'>
                    <thead className='h-10 bg-[#0f0909]'>
                        <tr>
                            <th className='border-b border-slate-700 pl-2 text-left'>
                                <button className='' onClick={() => handleSort('cmc_rank')}>
                                    # {displayArrow('cmc_rank', sortKey, order)}
                                </button>
                            </th>
                            <th className='border-b border-slate-600 text-left'>
                                <button className='' onClick={() => handleSort('name')}>
                                    Name {displayArrow('name', sortKey, order)}
                                </button>
                            </th>
                            <th className='border-b border-slate-600 text-left'>
                                <button className='' onClick={() => handleSort('price')}>
                                    Price {displayArrow('price', sortKey, order)}
                                </button>
                            </th>
                            <th className='border-b border-slate-600 text-right'>
                                <button className='' onClick={() => handleSort('percent_change_24h')}>
                                    24h % {displayArrow('percent_change_24h', sortKey, order)}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((token) => (
                            <tr className='h-10' key={token.cmc_rank}>
                                <td className='pl-2'>{token.cmc_rank}</td>
                                <td> <div className='flex flex-row justify-start gap-2 items-center'>
                                    <Image
                                        className='order-1'
                                        src={`/images/svg/${token.symbol.toLowerCase()}.svg`}
                                        width={32}
                                        height={32}
                                        alt='CUR'
                                    />
                                    <div className='order-2 my-auto'>
                                        <p className='order-1 text-sm font-bold'>{token.symbol.toUpperCase()}</p>
                                        <p className='order-2 text-[#707070]'>{showBillionOrMillion(token.quote.USD.market_cap)}</p></div>
                                </div></td>
                                <td>${token.quote.USD.price.toFixed(2)}</td>
                                <td>
                                    <div className="percent-indicator">
                                        <ChangeIndicator token={token} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CurrencyList;