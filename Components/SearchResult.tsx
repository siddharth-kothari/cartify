import React from "react";
import SearchItem from "./SearchItem";

const SearchResult = ({ searchResults, isResultOpen }: any) => {
  return (
    <div
      className="absolute sm:top-[30px] !mx-5 sm:!mx-0 bg-white shadow-lg rounded-md z-30 w-auto sm:sw-full"
      style={{ margin: "0px" }}
    >
      {searchResults.map((res: any) => (
        <SearchItem result={res} key={res.id} isResultOpen={isResultOpen} />
      ))}
    </div>
  );
};

export default SearchResult;
