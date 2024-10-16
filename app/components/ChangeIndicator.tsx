import React from 'react'
import { CryptoData } from '../types/CryptoCurrency';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

interface ChangeIndicatorProps {
    token: CryptoData;
}

const changeStyles = 'percent flex items-center justify-center w-20 gap-2 my-auto py-1 px-1 rounded-lg text-sm text-center font-bold';

const removeMinus = (value: number) => {
    const stringValue = value.toFixed(2);
    return stringValue.replace('-', '');
}

function ChangeIndicator({ token }: ChangeIndicatorProps) {
  return (
    <div className={token.quote.USD.percent_change_24h > 0
        ? `${changeStyles} text-green-400 bg-green-400/15 `
        : `${changeStyles} text-red-600 bg-red-500/15`}>

        {token.quote.USD.percent_change_24h > 0 ? (
            <>
                <TriangleUpIcon /> {token.quote.USD.percent_change_24h.toFixed(2)}%
            </>
        ) : (
            <>
                <TriangleDownIcon /> {removeMinus(token.quote.USD.percent_change_24h)}%
            </>
        )}
    </div>
  )
}

export default ChangeIndicator