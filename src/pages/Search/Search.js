import React from "react";
import Header from "../../components/Header/Header";
import ListRepositories from "../../components/ListRepositories";
import SearchInput from "../../components/SearchInput";

const Search = () => {
  return (
    <div>
      <Header />
      <SearchInput />
      <ListRepositories />
    </div>
  );
};

export default Search;
