import Button from '../../components/Button';
import assets from "../../assets/Hajjima.png";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          
          <img
                src={assets}
                alt="Don't Stop Apparel"
                className="w-full h-full object-cover rounded-[1.25rem]"
              />

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Our Brand
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              HAJJIMA APPAREL
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              HAJJIMA APPAREL is a streetwear clothing brand built on passion, hustle, and self-expression.
              Our designs represent the mindset of never giving up and always pushing forward no matter the situation.
            </p>

            <p className="mt-3 font-semibold text-zinc-800">
              "Don't Stop."
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Brand Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            What we represent
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">100%</p>
            <p className="mt-2 text-[11px] uppercase text-zinc-500">
              Streetwear
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Limited</p>
            <p className="mt-2 text-[11px] uppercase text-zinc-500">
              Drops
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Premium</p>
            <p className="mt-2 text-[11px] uppercase text-zinc-500">
              Quality
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Local</p>
            <p className="mt-2 text-[11px] uppercase text-zinc-500">
              Brand
            </p>
          </div>
        </div>
      </section>

      
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] uppercase text-zinc-500">
              Our Identity
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              Built for the Hustle
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Our Mission</h3>
                <p className="mt-3 text-sm text-zinc-600">
                  To inspire people through clothing that represents determination and confidence.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Our Vision</h3>
                <p className="mt-3 text-sm text-zinc-600">
                  To become a recognized streetwear brand that represents hustle culture worldwide.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Our Style</h3>
                <p className="mt-3 text-sm text-zinc-600">
                  Minimal, bold, and expressive designs that reflect individuality.
                </p>
              </article>
            </div>
          </div>

          
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] uppercase text-zinc-500">
              Brand Visuals
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[1,2,3,4].map((item) => (
                <div key={item} className="flex aspect-square rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                  <img
                    src={assets}
                    alt="brand"
                    className="w-full h-full object-cover rounded-[1.25rem]"
                  />
                </div>
              ))}
            </div>

            <Button className="mt-5">View Collection</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;