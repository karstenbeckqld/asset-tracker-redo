import React from 'react'
import useTokens from "@/app/react-query/hooks/useTokens";

const Currencies = () => {

    const {data, error} = useTokens();

    if (error) return <div>Error fetching data</div>

    return (
        <>
            <div>Currencies</div>
            <div>
                {data?.map((token) => (
                    <div key={token.cmc_rank}>
                        <div>{token.name}</div>
                        <div>{token.symbol}</div>
                    </div>
                ))}
            </div>
        </>
                    )
}

export default Currencies