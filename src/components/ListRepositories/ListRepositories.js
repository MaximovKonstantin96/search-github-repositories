import { useEffect, useMemo } from "react";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { setPage } from "../../redux/search/actions";
import { fetchRepositories } from "../../redux/search/operations";
import { createPages } from "../../utils";

const ListRepositories = () => {
  const dispatch = useDispatch();

  const isFetching = useSelector((state) => state.search.isFetching);
  const pagination = useSelector((state) => state.search.pagination);
  const lists = useSelector((state) => state.search.repositories);
  const q = useSelector((state) => state.search.input);
  const { page, perPage, totalCount } = pagination;
  const pagesCount = useMemo(() => Math.ceil(totalCount / perPage), [
    pagination,
    q,
  ]);

  const pages = createPages(pagesCount, page);

  useEffect(() => {
    dispatch(fetchRepositories({ q, page, per_page: perPage }));
  }, [page]);

  if (isFetching)
    return (
      <LoaderWrapper>
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </LoaderWrapper>
    );

  return (
    <>
      {lists.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>URL</th>
            </tr>
            {lists.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.name}</td>
                  <td>{value.id}</td>
                  <td>{value.url}</td>
                </tr>
              );
            })}
          </thead>
        </Table>
      )}

      <Pagination>
        {pages.map((p, index) => {
          return (
            <Page
              key={index}
              isCurrentPage={page === p}
              onClick={() => dispatch(setPage(p))}
            >
              {p}
            </Page>
          );
        })}
      </Pagination>
    </>
  );
};

const LoaderWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Pagination = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
`;

const Page = styled.span`
  border: 1px solid lightblue;
  border-radius: 100%;
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;

  ${({ isCurrentPage }) =>
    isCurrentPage &&
    `border: 2px solid blue;
       font-weight: 700;
      `}
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th,
  td,
  tr {
    padding: 5px;
  }
  th {
    text-align: left;
  }
`;

export default ListRepositories;
