/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Input, Spinner, BookListUL } from "components/lib";
import { BookRow } from "components/book-row";
import { FaSearch, FaTimes } from "react-icons/fa";
import Tooltip from "@reach/tooltip";
import "@reach/tooltip/styles.css";
import { useEffect, useState } from "react";
import { BooksResponse } from "types/book";
import { client } from "utils/api-client";
import * as colors from "styles/colors";
import { useAsync } from "hooks/async";

const DiscoverBookScreen = () => {
  const { isLoading, isSuccess, isError, run, data, error } = useAsync<
    BooksResponse
  >();
  const [query, setQuery] = useState("");
  const [queried, setQueried] = useState(false);

  useEffect(() => {
    if (!queried) return;
    run(client(`books?query=${encodeURI(query)}`));
  }, [queried, query, run]);

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    setQueried(true);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueried(false);
    setQuery(event.target.value);
  };

  return (
    <div
      css={{ maxWidth: 800, margin: "auto", width: "90vw", padding: "40px 0" }}
    >
      <form
        onSubmit={handleSearchSubmit}
        css={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        <Input
          placeholder="Search books..."
          id="search"
          value={query}
          onChange={handleQueryChange}
          css={{ width: "100%" }}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "0",
                height: "100%",
                position: "relative",
                marginLeft: "-35px",
                background: "transparent",
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label="error" css={{ color: colors.danger }} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>
      {isError ? (
        <div css={{ color: colors.danger }}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.books.length ? (
          <BookListUL css={{ marginTop: 20 }}>
            {data.books.map((book) => (
              <li key={book.id}>
                <BookRow book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search</p>
        )
      ) : null}
    </div>
  );
};

export { DiscoverBookScreen };
