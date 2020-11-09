import React from "react";
import { fetchRepositories } from "../../redux/search/operations";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setSearchInput } from "../../redux/search/actions";

const SearchInput = () => {
  const dispatch = useDispatch();
  const q = useSelector((state) => state.search.input);
  const pagination = useSelector((state) => state.search.pagination);
  const { page, perPage } = pagination;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setPage(1));
    dispatch(fetchRepositories({ q, page, per_page: perPage }));
  };

  const onChange = (e) => {
    dispatch(setSearchInput(e.target.value));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter name"
          onChange={onChange}
        ></input>
        <div>
          <button>Send</button>
        </div>
      </form>
    </>
  );
};
export default SearchInput;
