import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";

interface PageData {
  product: Product | null;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    const result: PageData = { product: null };

    const data = await fetch(
      `https://fakestoreapi.com/products/${ctx.params.product}`,
    )
      .then((res) => res.json())
      .catch(() => {
        return result;
      });

    result.product = {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.image,
      rating: {
        rate: data.rating.rate,
        count: data.rating.count,
      },
    };

    return ctx.render(result);
  },
};

export default function Product(props: PageProps<PageData>) {
  const product = props.data.product;

  return (
    <>
      <Head>
        <title>SomeShop - Product</title>
      </Head>

      {product && <>Product</>}
      {!product && <>404</>}
    </>
  );
}
