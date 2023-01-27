import React from "react";
import debounce from "lodash.debounce";

import { useDispatch } from "react-redux";
import { setSearchValue } from "../redux/slices/filterSlice";

import close from "../assets/img/close.svg";
import searchLoop from "../assets/img/search.svg";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef();

  const updateSearchValue = React.useCallback(
    debounce((ev) => {
      dispatch(setSearchValue(ev));
    }, 500),
    []
  );

  const onChangeInput = (ev) => {
    setValue(ev.target.value);
    updateSearchValue(ev.target.value);
  };

  const onClickClose = () => {
    setValue("");
    dispatch(setSearchValue(""));
    inputRef.current.focus();
  };

  return (
    <div className="search__header__logo">
      <img src={searchLoop} alt="search" className="search__loop__input" />
      <input
        ref={inputRef}
        className="search__header"
        placeholder="Search pizza..."
        value={value}
        onChange={(ev) => {
          onChangeInput(ev);
        }}
      />
      {value && (
        <img
          src={close}
          alt='close'
          className="search__close__input"
          onClick={onClickClose}
        />
      )}
    </div>
  );
};

export default Search;
