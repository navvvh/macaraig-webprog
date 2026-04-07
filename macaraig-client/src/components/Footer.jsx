import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto bg-zinc-950 text-white pt-16 pb-8 px-6 lg:px-12 border-t-4 border-orange-600">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          
          <div className="md:col-span-2">
            <h3 className="text-4xl font-black italic tracking-tighter text-orange-500 mb-4">
              HAJIMA <span className="text-white">APPAREL</span>
            </h3>
            <p className="text-zinc-400 max-w-sm leading-relaxed text-sm">
              Don't stop the grind. Elevating street culture through premium quality and bold designs. Born in the streets, made for the world.
            </p>
          </div>

          
          <div>
            <h4 className="text-orange-500 font-bold uppercase text-xs tracking-[0.3em] mb-6">Collections</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/articles" className="hover:text-orange-500 transition-all duration-300">New Arrivals</Link></li>
              <li><Link to="/articles" className="hover:text-orange-500 transition-all duration-300">Graphic Tees</Link></li>
              <li><Link to="/articles" className="hover:text-orange-500 transition-all duration-300">Street Hoodies</Link></li>
              <li><Link to="/articles" className="hover:text-orange-500 transition-all duration-300">Accessories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-orange-500 font-bold uppercase text-xs tracking-[0.3em] mb-6">Support</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/about" className="hover:text-orange-500 transition-all duration-300">About the Brand</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition-all duration-300">Size Guide</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition-all duration-300">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Socials & Copyright */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            {/* Social Icons (Represented by circles) */}
            <a href="#" className="h-10 w-10 bg-orange-600 rounded-lg flex items-center justify-center hover:bg-white hover:text-orange-600 transition-all">
               <span className="font-bold">IG</span>
            </a>
            <a href="#" className="h-10 w-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-all">
               <span className="font-bold text-sm">FB</span>
            </a>
            <a href="#" className="h-10 w-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-all">
               <span className="font-bold text-sm">X</span>
            </a>
          </div>
          
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
            &copy; 2026 HAJIMA APPAREL CO. | Designed for the bold.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;