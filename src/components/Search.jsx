import React from "react";

const Search = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  };

  return (
    <div className="search__header__logo">
      <svg
        style={{
          cursor: "pointer",
          position: "absolute",
          top: "15px",
          left: "30px",
        }}
        width="24"
        height="24"
        fill="#bebebe"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
      </svg>

      <input
        className="search__header"
        placeholder="Search pizza..."
        value={searchValue}
        onChange={onChangeSearchInput}
      />
      {searchValue && (
        <svg
          className="search__header__close"
          onClick={() => {setSearchValue("")}}
          clipRule="evenodd"
          fillRule="evenodd"
          fill="#bebebe"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
