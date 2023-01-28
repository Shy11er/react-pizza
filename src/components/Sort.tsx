import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSort } from "../redux/slices/filterSlice";

type SortItem = {
  name: string;
  sortProperty: string;
}

// type PopupClick = React.MouseEvent<HTMLBodyElement> & {
//   srcElement: Node[];
// }

export const sorts: SortItem[] = [
  { name: "popularity (Descending)", sortProperty: "rating" },
  { name: "popularity (Ascending)", sortProperty: "-rating" },
  { name: "price (Descending)", sortProperty: "price" },
  { name: "price (Ascending)", sortProperty: "-price" },
  { name: "alphabet (Descending)", sortProperty: "title" },
  { name: "alphabet (Ascending)", sortProperty: "-title" },
];

const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state:any) => state.filter.sort);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside= (event: MouseEvent) => {
      const _event = (event.srcElement as HTMLBodyElement).className;

      if (!_event.includes('SORT')) {
        setOpen(false);
      }
    } 
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    }
  }, []);

  return (
    <div className="sort SORT">
      <div className="sort__label SORT">
        <svg
          className="SORT"
          onClick={() => {
            setOpen(!open);
          }}
          style={open === false ? { transform: "rotate(180deg)" } : {}}
          cursor="pointer"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="SORT"
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b className="SORT">Sort by:</b>
        <span
          className="SORT"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {sort.name}
        </span>
      </div>
      {open && (
        <div className="sort__popup SORT">
          <ul>
            {sorts.map((item, index) => {
              return (
                <li
                  className={
                    item.sortProperty === sort.sortProperty
                      ? "active SORT"
                      : "SORT"
                  }
                  key={index}
                  onClick={() => {
                    setOpen(false);
                    dispatch(setSort(item));
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;