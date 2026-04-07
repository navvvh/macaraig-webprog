import { Link } from 'react-router-dom';
import Button from './Button';
import assets from "../assets/Your text.png";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article key={article.name} className="rounded-3xl border-2 border-zinc-900 bg-zinc-900 p-6 hover:border-orange-600 transition-all group">
          <div className="flex aspect-square items-center justify-center rounded-2xl bg-zinc-800 overflow-hidden border border-zinc-700">
            <img 
              src={article.image || assets} 
              alt={article.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.24em] text-orange-500">
            Drop {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-2 text-xl font-black text-white uppercase italic leading-tight">{article.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            {article.content[0].substring(0, 100)}...
          </p>
          <Link to={`/articles/${article.name}`}>
            <Button variant="primary" className="mt-6 w-full">Read More</Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;