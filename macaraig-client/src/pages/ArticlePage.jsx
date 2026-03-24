import Button from '../components/Button';
import assets from "../assets/Hajjima.png";

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Stories Behind Don't Stop Apparel
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Explore the inspiration, mindset, and culture behind the brand. Learn what drives the “Don’t Stop” philosophy.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Brand Insights
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-[4/3] rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img src={assets} alt="brand" className="w-full h-full object-cover" />
            </div>

            <p className="mt-4 text-[11px] uppercase text-zinc-500">
              Article 01
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              The Meaning Behind “Don't Stop”
            </h3>
            <p className="mt-3 text-sm text-zinc-600">
              Discover the mindset and message that defines the Don't Stop Apparel brand.
            </p>

            <Button className="mt-4">Read More</Button>
          </article>

          
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-[4/3] rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img src={assets} alt="brand" className="w-full h-full object-cover" />
            </div>

            <p className="mt-4 text-[11px] uppercase text-zinc-500">
              Article 02
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Streetwear Culture Today
            </h3>
            <p className="mt-3 text-sm text-zinc-600">
              A look into how streetwear became a global movement and lifestyle.
            </p>

            <Button className="mt-4">Read More</Button>
          </article>

          
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-[4/3] rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img src={assets} alt="brand" className="w-full h-full object-cover" />
            </div>

            <p className="mt-4 text-[11px] uppercase text-zinc-500">
              Article 03
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              From Idea to Brand
            </h3>
            <p className="mt-3 text-sm text-zinc-600">
              How Don't Stop Apparel started and evolved into a clothing identity.
            </p>

            <Button className="mt-4">Read More</Button>
          </article>

          
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-[4/3] rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img src={assets} alt="brand" className="w-full h-full object-cover" />
            </div>

            <p className="mt-4 text-[11px] uppercase text-zinc-500">
              Article 04
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Building Confidence Through Style
            </h3>
            <p className="mt-3 text-sm text-zinc-600">
              How fashion influences confidence and personal expression.
            </p>

            <Button className="mt-4">Read More</Button>
          </article>

        </div>
      </section>
    </div>
  );
};

export default ArticlePage;