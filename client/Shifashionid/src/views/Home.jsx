import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { StickyNavbar } from "../components/Navbar";
import axios from "axios";
import { Example } from "../components/Cart";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router";

export function Home() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function openCloseModal() {
    if (localStorage.access_token) {
      if (open === true) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    } else {
      navigate("/login");
    }
  }

  async function fetchItems() {
    try {2
      const { data } = await axios.get("http://localhost:3000/items");

      setItems(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      {/* navbar */}
      <StickyNavbar openCloseModal={openCloseModal} />
      <div className="mx-auto max-w-screen py-10 md:container md:mx-auto">
        <div className="relative mb-12 flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-xl shadow-blue-gray-900/50">
          <img
            alt="nature"
            className="h-[32rem] w-full object-cover object-center"
            src="https://assets.hermes.com/is/image/hermesedito/BIRKIN_HERO?wid=1200"
          />
        </div>
        <h2 className="mb-2 block font-sans text-4xl font-semibold leading-[1.3] tracking-normal text-blue-gray-900 antialiased text-center uppercase">
          Choose your favorite bag
        </h2>
      </div>

      {/* cart */}
      <Example open={open} openCloseModal={openCloseModal} />

      <div className="md:container md:mx-auto">
        {/* card */}
        <div className="grid md:grid-cols-3 gap-5">
          {items?.map((item) => {
            return <Card item={item} />;
          })}
        </div>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}
