import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {CryptoData} from "@/app/types/CryptoCurrency";

// Get the latest cryptocurrency data from the project API.
const useCurrencies = () => {
    const fetchTokens = () =>
        axios
            .get<CryptoData[]>('api/currencies')
            .then((res) => res.data);

    return useQuery<CryptoData[], Error>({
        queryKey: ['tokens'],
        queryFn: fetchTokens,
    });
}

export default useCurrencies;