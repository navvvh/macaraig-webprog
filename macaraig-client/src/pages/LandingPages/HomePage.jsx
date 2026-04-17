import Button from '../../components/Button';
import assets from "../../assets/Hajjima.png";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-12 bg-white text-zinc-900">
      <section className="border-b-2 border-zinc-200 bg-zinc-50 px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2 items-center max-w-7xl mx-auto">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-zinc-500">
              Streetwear Brand
            </p>
            <h1 className="text-5xl font-black text-zinc-950 italic tracking-tighter uppercase">
              HAJIMA <span className="text-orange-600">APPAREL</span>
            </h1>
            <p className="mt-6 text-zinc-600 text-lg leading-relaxed max-w-lg">
              A streetwear brand built on passion, hustle, and the mindset to never stop. Elevating street culture through premium designs.
            </p>
            <p className="mt-4 font-black italic text-2xl text-zinc-900 uppercase tracking-widest">
              "DON'T STOP."
            </p>
            <div className="mt-8">
              <Button to="/about" variant="primary">Explore Brand</Button>
            </div>
          </div>
          <div className="flex items-center justify-center p-4">
            <img src={assets} alt="logo" className="w-full h-full object-contain max-h-[400px]" />
          </div>
        </div>
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto w-full">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {['Streetwear', 'Limited Drops', 'Premium Quality', 'Local Brand'].map((text, i) => (
            <div key={i} className="p-8 border-2 border-zinc-200 bg-zinc-50 rounded-2xl hover:border-orange-600 transition-colors group text-center">
              <p className="text-xl font-black text-zinc-950 uppercase italic">{text.split(' ')[0]}</p>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{text.split(' ')[1] || 'Culture'}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t-2 border-zinc-200 bg-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-zinc-950 italic mb-10 uppercase tracking-tighter">Current <span className="text-orange-600">Drops</span></h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: "Graphic T-Shirt", d: "Bold designs that represent hustle and street culture." },
              { t: "Hoodies", d: "Comfort meets style with our premium hoodie collection." },
              { t: "Accessories", d: "Complete the look with our signature grind gear." }
            ].map((item, i) => (
              <div key={i} className="p-6 border-2 border-zinc-200 bg-zinc-50 rounded-3xl hover:border-orange-600 transition-all flex flex-col items-center text-center">
                <div className="aspect-square w-full rounded-xl bg-white p-4 mb-6 border border-zinc-100 flex items-center justify-center">
                    <img src={assets} alt={item.t} className="w-full h-full object-contain" />
                </div>
                <h3 className="font-black text-zinc-950 uppercase italic text-xl leading-tight">{item.t}</h3>
                <p className="mt-3 text-zinc-600 text-sm leading-relaxed flex-grow">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;