import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-zinc-950">
      <div className="mb-8">
        <h1 className="text-8xl font-black italic text-orange-600 tracking-tighter">
          404
        </h1>
        <h2 className="text-xl font-bold text-white uppercase tracking-widest mt-2">
          Page Not Found
        </h2>
      </div>

      <div className="max-w-sm">
        <p className="text-zinc-500 text-sm leading-relaxed">
          The content you are looking for is unavailable or has been moved.
        </p>
        
        <div className="mt-10 flex flex-col gap-3 justify-center">
          <Link to="/">
            <Button variant="primary" className="w-full">
              Back to Home
            </Button>
          </Link>
          <Link to="/articles">
            <Button variant="secondary" className="w-full">
              View All Drops
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;