import { Fragment, useEffect, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { CartContext } from "../context";
import Swal from "sweetalert2";
import { Select, Option } from "@material-tailwind/react";
import { useParams } from "react-router-dom";

export function Example({ open, openCloseModal }) {
  const [order, setOrder] = useState({});
  const { cart, setCart } = useContext(CartContext);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const { id } = useParams();
  const [cost, setCost] = useState({});
  console.log(city);
  useEffect(() => {
    async function fetchProvince() {
      try {
        const { data } = await axios.get("http://localhost:3000/provinces", {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        });

        setProvince(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProvince();
  }, []);
console.log(cost);
  async function fetchCityByProv(id) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/cities",
        { province: id },
        {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        }
      );

      setCity(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCost() {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/cost",
        {
          destination: city.CityId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        }
      );

      console.log(data, 'testestes');

      setCost(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCost();
  }, [city])

  

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={openCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={openCloseModal}
                          >
                            <span
                              className="absolute -inset-0.5"
                              onClick={openCloseModal}
                            />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <form action="">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              <li className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={cart.imgUrl}
                                    alt="image"
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <p>{cart.name}</p>
                                      </h3>
                                      <p className="ml-4">
                                        {cart?.price?.toLocaleString("id-ID")}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {cart.quantity}
                                    </p>
                                    <div
                                      className="flex"
                                      style={{ marginLeft: "120px" }}
                                    >
                                      <button
                                        onClick={() => {
                                          setCart({
                                            ...cart,
                                            quantity: cart.quantity
                                              ? cart.quantity + 1
                                              : 1,
                                          });
                                        }}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Add
                                      </button>
                                    </div>
                                    <div className="flex">
                                      <button className="font-medium text-pink-600 hover:text-pink-500">
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <div>
                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="country"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Province
                                  </label>
                                  <div className="mt-2">
                                    <Select
                                      size="md"
                                      label="Select Version"
                                      onChange={(id) => {
                                        fetchCityByProv(id);
                                      }}
                                    >
                                      {province?.map((el, idx) => {
                                        return (
                                          <Option key={idx} value={el.ProvinceId}>
                                            {el.province}
                                          </Option>
                                        );
                                      })}
                                    </Select>
                                  </div>
                                </div>
                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="country"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    City
                                  </label>
                                  <div className="mt-2">
                                    <Select size="md" label="Select Version">
                                      {city?.map((el, idx) => {
                                        // console.log(el);
                                        return (
                                          <Option key={idx} value={el.CityId}>
                                            {el.type} {el.city}
                                          </Option>
                                        );
                                      })}
                                    </Select>
                                  </div>
                                </div>
                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="country"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Street Address
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="street-address"
                                      id="street-address"
                                      autoComplete="street-address"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                              </div>
                            </ul>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Shipping Fee</p>
                        <p>
                          {cost ? cost.value : 'Please input product'}
                        </p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          {(cart.quantity * cart.price).toLocaleString("id-ID")}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-pink-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-600"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={openCloseModal}
                            style={{ marginLeft: "5px" }}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
