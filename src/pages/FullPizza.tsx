import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [items, setItems] = React.useState<{
    imageUrl: string;
    title: string;
    price: number; 
  }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://63c418a0a908563575316ae6.mockapi.io/items/${id}`
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

  if (!items) return <>Loading...</>;

  return (
    <div className="fullItem">
      <img src={items.imageUrl} alt="pizza" />
      <h2>{items.title}</h2>
      <h4>{items.price} $</h4>
    </div>
  );
};

export default FullPizza;
