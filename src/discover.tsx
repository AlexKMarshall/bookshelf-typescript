/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Input, Spinner, BookListUL } from "components/lib";
import { BookRow } from "components/book-row";
import { FaSearch, FaTimes } from "react-icons/fa";
import Tooltip from "@reach/tooltip";
import "@reach/tooltip/styles.css";
import { useEffect, useState } from "react";
import { BooksResponse } from "types/book";
import { client, ErrorResponse } from "utils/api-client";
import * as colors from "styles/colors";

type FetchStatus = "idle" | "pending" | "resolved" | "rejected";

const DiscoverBookScreen = () => {
  const [data, setData] = useState<BooksResponse | null>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [query, setQuery] = useState("");
  const [queried, setQueried] = useState(false);

  useEffect(() => {
    if (!queried) return;
    setStatus("pending");

    client<BooksResponse>(`books?query=${encodeURI(query)}`)
      .then((data) => {
        if ("status" in data) {
          throw new Error(
            `Unexpected status field in data: ${JSON.stringify(data)}`
          );
        }
        setData(data);
        setStatus("resolved");
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      });
  }, [queried, query]);

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

  const isLoading = status === "pending";
  const isSuccess = status === "resolved";
  const isError = status === "rejected";

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
          <pre>{error?.message}</pre>
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
