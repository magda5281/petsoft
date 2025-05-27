'use client';

import React, { createContext, useState } from 'react';

type TSearchContext = {
  searchQuery: string;
  handleChangeSearchQuery: (newValue: string) => void;
};
type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  //state
  const [searchQuery, setSearchQuery] = useState('');

  //derived state

  //actions/ event handlers
  const handleChangeSearchQuery = (newValue: string) => {
    setSearchQuery(newValue);
  };
  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleChangeSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
