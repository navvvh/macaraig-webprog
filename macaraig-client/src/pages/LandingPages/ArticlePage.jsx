import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import articles from "../../assets/article-content.js";
import NotFoundPage from "../NotFoundPage";

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find(article => article.name === name);

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex w-full flex-col bg-zinc-950">
      <section className="border-b-2 border-orange-600 bg-zinc-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Button to="/articles" className="bg-transparent border border-zinc-700 text-zinc-400 hover:text-orange-500 hover:border-orange-500 transition-all">
              &larr; Back to Drops
            </Button>
          </div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-orange-500">
            Hajima Exclusive
          </p>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl italic uppercase tracking-tighter">
            {article.title}
          </h1>
          <p className="mt-4 text-sm font-medium text-zinc-500 uppercase tracking-widest">
            {article.name.replace(/-/g, ' ')}
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex aspect-video items-center justify-center rounded-2xl border-2 border-orange-600 bg-zinc-900 mb-12 overflow-hidden shadow-[0_0_20px_rgba(234,88,12,0.15)]">
            <div className="text-orange-600 font-black text-6xl opacity-10 select-none tracking-tighter">HAJIMA</div>
          </div>

          <div className="space-y-8">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-lg leading-8 text-zinc-300 font-medium whitespace-pre-wrap text-justify">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 border-t border-zinc-800 pt-8 flex justify-center">
            <Button to="/articles" variant="primary">View More Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;