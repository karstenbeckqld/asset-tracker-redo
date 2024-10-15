import React from 'react'
import useCurrencies from "@/app/react-query/hooks/useCurrencies";
import CurrencyList from "@/app/components/CurrencyList";
// import CryptoCurrency from '../components/Currency';

const CurrenciesPage = () => {

    const {data, error} = useCurrencies();

    if (error) return <div>Error fetching data</div>

    return (
        <>
            <div>Currencies</div>
            <div>
                {data ? <CurrencyList cryptoData={data} /> : []}
            </div>
        </>
    )
}

export default CurrenciesPage;