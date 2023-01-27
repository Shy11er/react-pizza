import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const FullPizza = () => {
  const { id } = useParams();
  const [items, setItems] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://63c418a0a908563575316ae6.mockapi.io/items/${id.toString()}`
        );

        setItems(data);
      } catch (err) {
        console.error(err);
        alert("Sorry we can't accommodate your request!");
        navigate("/");
      }
    }

    fetchData();
  }, []);

  if (!items) return;

  return (
    <div>
      <img src={items.imageUrl} alt="pizza" />
      <h2>{items.title}</h2>
      <h4>{items.price} $</h4>
    </div>
  );
};

export default FullPizza;
