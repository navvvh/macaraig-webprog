import Button from '../components/Button';
import assets from "../assets/Hajjima.png";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900">
              DON'T STOP APPAREL
            </h1>
            <p className="mt-4 text-zinc-600">
              A streetwear brand built on passion, hustle, and the mindset to never stop.
            </p>
            <p className="mt-2 font-semibold text-zinc-800">
              "Don't Stop."
            </p>

            <div className="mt-6">
              <Button to="/about" variant="primary">Explore Brand</Button>
            </div>
          </div>

          <img src={assets} alt="logo" className="rounded-2xl w-full object-cover" />
        </div>
      </section>

      
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-6 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-5 border-2 border-zinc-900 rounded-xl">
            <p className="text-2xl font-bold">100%</p>
            <p>Streetwear Style</p>
          </div>
          <div className="p-5 border-2 border-zinc-900 rounded-xl">
            <p className="text-2xl font-bold">Limited</p>
            <p>Drops</p>
          </div>
          <div className="p-5 border-2 border-zinc-900 rounded-xl">
            <p className="text-2xl font-bold">Premium</p>
            <p>Quality</p>
          </div>
          <div className="p-5 border-2 border-zinc-900 rounded-xl">
            <p className="text-2xl font-bold">Local</p>
            <p>Brand</p>
          </div>
        </div>
      </section>

      
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-6 py-10">
        <div className="grid gap-4 md:grid-cols-3">

          <div className="p-5 border-2 border-zinc-900 rounded-xl">
            <img src={assets} className="rounded-xl" />
            <h3 className="mt-3 font-bold">Graphic T-Shirt</h3>
            <p>Bold designs that represent hustle and street culture.</p>
          </div>

          <div className="p-5 border-2 border-zinc-900 rounded-xl">
            <img src={assets} className="rounded-xl" />
            <h3 className="mt-3 font-bold">Hoodies</h3>
            <p>Comfort meets style with our premium hoodie collection.</p>
          </div>

          <div className="p-5 border-2 border-zinc-900 rounded-xl">
            <img src={assets} className="rounded-xl" />
            <h3 className="mt-3 font-bold">Caps</h3>
            <p>Complete your fit with our signature caps.</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HomePage;