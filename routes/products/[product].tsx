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
    const data = await fetch(
      `https://fakestoreapi.com/products/${ctx.params.product}`,
    )
      .then((res) => res.json())
      .catch(() => {
        return null;
      });

    const result: PageData = { product: null };

    if (data == null) {
      return ctx.render(result);
    }

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
  const product: null | Product = props.data.product;

  return (
    <>
      <Head>
        <title>SomeShop - Product</title>
      </Head>

      {product && (
        <>
          <section class="min-w-screen min-h-screen bg-white flex items-center p-5 lg:p-10 overflow-hidden relative">
            <div class="w-full max-w-6xl rounded bg-white shadow-2xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
              <div class="md:flex items-center -mx-10">
                <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                  <div class="relative">
                    <img
                      src={product.image}
                      class="object-scale-down h-[500px] w-full relative z-10"
                      alt="Product Image"
                    />
                    <div class="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0">
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/2 px-10">
                  <div class="mb-10">
                    <h1 class="font-bold uppercase text-2xl mb-5">
                      {product.title}
                    </h1>
                    <p class="text-sm">
                      {product.description}
                    </p>
                  </div>
                  <div>
                    <div class="inline-block align-bottom mr-5">
                      <span class="text-2xl leading-none align-baseline">
                        $
                      </span>
                      <span class="font-bold text-5xl leading-none align-baseline">
                        {product.price.toString().split(".")[0]}
                      </span>
                      {product.price.toString().split(".")[1] &&
                        (
                          <span class="text-2xl leading-none align-baseline">
                            .{product.price.toString().split(".")[1]}
                          </span>
                        )}
                    </div>
                    <div class="inline-block align-bottom">
                      <button class="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                        <i class="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      {!product && (
        <>
          <section class="min-w-screen min-h-screen bg-white flex items-center p-5 lg:p-10 overflow-hidden relative">
            <div class="w-full max-w-6xl rounded bg-white shadow-2xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
              <div class="flex flex-col items-center justify-center">
                <h1 class="w-full h-full text-9xl text-center">404</h1>
                <p>This product could not be found</p>
                <a href="/" class="pt-2 pb-2 pl-3 pr-3 bg-gray-300 mt-5 rounded">Get Home!</a>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
