import React, { useContext, useEffect, useState } from "react";

import {
  HeaderGallery,
  CardProduct,
  ModalLogin,
} from "../components/Home";
import { Layout } from "../components";
import { Button, buttonVariants } from "../ui";
import { AuthenticatedContext, WindowSizeContext } from "../context";
import { SURA_CREATE_POST_INFO } from "../utils/constants";
import { client } from "../../supabase/client";
import Line from "../components/Loader/Line";

const headerImages = [
  {
    id: "1",
    image: "https://shorturl.at/xKRW3",
  },
  {
    id: "2",
    image: "https://shorturl.at/nxyV1",
  },
  {
    id: "3",
    image: "https://shorturl.at/FPX01",
  },
  {
    id: "4",
    image: "https://shorturl.at/abkpX",
  },
];

const categories = [
  {
    id: "1",
    text: "Todos",
  },
  {
    id: "2",
    text: "Informatica",
  },
  {
    id: "3",
    text: "Muebles",
  },
  {
    id: "4",
    text: "Prendas",
  },
];

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const { isAuthenticated } = useContext(AuthenticatedContext);

  const [products, setProducts] = useState<any | null>(null);
  const [errorProduct, setErrorProduct] = useState<any | null>(null);

  const [showModalLogin, setShowModalLogin] = useState<boolean>(
    !isAuthenticated
  );

  useEffect(() => {
    (async () => {
      const { data: products, error: errorProducts } = await client
        .from("Product")
        .select("*");

      if (errorProducts) {
        console.log("Productos no encontrados");
        return;
      }

      setErrorProduct(errorProducts);
      setProducts(products);
    })();
  }, []);

  const [categorySelected, setCategorySelected] =
    useState<string>("1");
  const { windowSize } = useContext(WindowSizeContext);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    localStorage.setItem(SURA_CREATE_POST_INFO, "");
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout>
      <ModalLogin show={showModalLogin} setShow={setShowModalLogin} />

      <div className="p-5 pb-2">
        <HeaderGallery data={headerImages} />
      </div>

      <div
        className={`${
          scrollY > 300 && "shadow-lg"
        } sticky top-0 z-20 bg-white py-3 flex w-[${
          windowSize - 20
        }px] overflow-x-auto pl-5 gap-3 hide-scrollbar`}
      >
        {categories.map((category, index: number) => (
          <Button
            key={category.id}
            onClick={() => setCategorySelected(category.id)}
            className={buttonVariants({
              variant: `${
                category.id === categorySelected
                  ? "default"
                  : "outline"
              }`,
              className: `h-12 flex-1 px-7 focus:outline-none focus:ring-opacity-0 focus:ring-0 ${
                index === categories.length - 1 ? "mr-5" : "mr-0"
              }`,
            })}
          >
            {category.text}
          </Button>
        ))}
      </div>

      {!products && !errorProduct ? (
        <div className="p-5 pt-2 grid grid-cols-2 gap-x-5 gap-y-6">
          <Line rounded="md" width="full" height="40" />
          <Line rounded="md" width="full" height="40" />
          <Line rounded="md" width="full" height="40" />
          <Line rounded="md" width="full" height="40" />
        </div>
      ) : errorProduct ? (
        <div>error</div>
      ) : products?.length === 0 ? (
        <div>no hay</div>
      ) : (
        <div className="p-5 pt-2 grid grid-cols-2 gap-x-5 gap-y-6">
          {products.map((product: any) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Home;
