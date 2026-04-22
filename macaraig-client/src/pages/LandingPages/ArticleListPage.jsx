import Button from '../../components/Button';
import articles from '../../assets/article-content.js';

import Yourtext from "../../assets/Yourtext.png";

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col bg-zinc-950">
     
      <section className="border-b-2 border-orange-600 bg-zinc-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-orange-500">
            Journal
          </p>
          <h1 className="max-w-xl text-4xl font-black italic leading-tight text-white sm:text-5xl uppercase tracking-tighter">
            THE <span className="text-orange-600">GRIND</span> FILES
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
            Latest drops, styling guides, and the stories behind the hustle. 
          </p>
          <div className="mt-8">
            <Button to="/" variant="secondary">Back Home</Button>
          </div>
        </div>
      </section>

     
      <section className="px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.name} className="flex flex-col border-2 border-zinc-900 bg-zinc-900/50 rounded-3xl overflow-hidden hover:border-orange-600 transition-all p-6 group">
              
              {/* ITO ANG NAWAWALA: Image Container */}
              <div className="mb-6 flex aspect-square items-center justify-center rounded-2xl bg-zinc-800 overflow-hidden border border-zinc-700">
                <img 
                  src={article.image || Yourtext} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>

              <h3 className="text-xl font-black text-white uppercase italic mb-4">{article.title}</h3>
              <p className="text-zinc-400 text-sm mb-6 line-clamp-3 text-justify">
                {article.content[0]}
              </p>
              <Button to={`/articles/${article.name}`} variant="primary" className="mt-auto">
                Read More
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticleListPage;