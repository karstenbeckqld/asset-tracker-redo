import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {TokenType} from "@/app/types/CryptoTypes";

// Get the latest cryptocurrency data from the project API.
const useCurrencies = () => {
    const fetchTokens = () =>
        axios
            .get<TokenType[]>('api/currencies')
            .then((res) => res.data);

    return useQuery<TokenType[], Error>({
        queryKey: ['tokens'],
        queryFn: fetchTokens,
    });
}

export default useCurrencies;