import Button from '../components/Button';
import ArticleList from '../components/ArticleList';
import articles from '../assets/article-content.js';

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
        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange-500">
            Brand Overview
          </p>
          <h2 className="mt-2 text-3xl font-black text-white italic uppercase tracking-tighter">
            What we represent
          </h2>
        </div>
        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;