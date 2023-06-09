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

      <section class="py-10 bg-gray-100">
        <div class="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {props.data.products.map((product) => {
            return (
              <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 transition-all">
                <a href={`products/${product.id}`}>
                  <div class="relative flex items-end overflow-hidden rounded-xl">
                    <img
                      src={product.image}
                      class="object-scale-down h-[135px] w-full"
                      alt="Product Image"
                    />
                    <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="ml-1 text-sm text-slate-400">
                        {product.rating.rate}
                      </span>
                    </div>
                  </div>

                  <div class="mt-1 p-2">
                    <h2 class="truncate">
                      {product.title}
                    </h2>
                    <p class="mt-1 text-sm text-slate-400">
                      {product.category}
                    </p>

                    <div class="mt-3 flex items-end justify-between">
                      <p class="text-lg font-bold text-blue-500">
                        ${product.price}
                      </p>

                      <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>

                        <button class="text-sm">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
