"use client";

import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
// import { useState } from "react";

// searchQuery: string, setSearchQuery: (value: string) => void

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {


    const [showSearch, setShowSearch] = useState(false);

    // Toggle search display
    const toggleDisplay = () => {
        setShowSearch(!showSearch);
        setSearchQuery("");
    };

    const header = (
        <div id='text' className='flex flex-row items-center w-full p-2.5'>
            <div className='flex flex-col w-full items-stretch justify-between text-[#ffffff] p-2.5'>
                <h1 className='text-2xl font-bold'>AssetTracker</h1>
                <p className='text-[#707070]'>Track your favourite crypto assets</p>
            </div>
        </div>
    );

    const search = (
        <div id='search' className='flex flex-row items-center w-full p-2.5 mt-2.5'>
            <Input
                type='text'
                color='white'
                placeholder='Search by name or symbol...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );

    return (
        <>
            <div className='flex flex-row items-center w-full pl-6 h-24 pt-4 mb-3'>
                {showSearch ? search : header}
                <button
                    onClick={toggleDisplay}
                    className={showSearch
                        ? `order-first bg-[#1E1E1E] p-2.5 text-[#ffffff] mt-4`
                        : `order-last bg-[#1E1E1E] p-2.5 text-[#ffffff] mt-4 mr-8`}
                >
                    {showSearch ? <CloseIcon /> : <Search2Icon />}
                </button>
            </div>
        </>
    );
}

export default Header;
