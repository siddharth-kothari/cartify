import React from "react";
import SearchItem from "./SearchItem";

const SearchResult = ({ searchResults, isResultOpen }: any) => {
  return (
    <div
      className="absolute top-[30px] bg-white shadow-lg rounded-md z-30 w-full"
      style={{ margin: "0px" }}
    >
      {searchResults.map((res: any) => (
        <SearchItem result={res} key={res.id} isResultOpen={isResultOpen} />
      ))}
    </div>
  );
};

export default SearchResult;
