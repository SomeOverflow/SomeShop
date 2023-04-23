import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";

interface PageData {
  products: Product[];
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
    const amount = 25;
    const data = await fetch(
      `https://fakestoreapi.com/products?limit=${amount}`,
    ).then((res) => res.json());

    const result: PageData = { products: [] };

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        result.products.push({
          id: element.id,
          title: element.title,
          price: element.price,
          description: element.description,
          category: element.category,
          image: element.image,
          rating: {
            rate: element.rating.rate,
            count: element.rating.count,
          },
        });
      }
    }

    return ctx.render(result);
  },
};

export default function Home(props: PageProps<PageData>) {
  return (
    <>
      <Head>
        <title>SomeShop</title>
      </Head>

    </>
  );
}
