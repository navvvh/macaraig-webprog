import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses = 'mt-2 w-full rounded-xl border-2 border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-600 focus:bg-zinc-800 placeholder:text-zinc-600';

const SignInPage = () => {
  return (
    <div className="w-full max-w-md">
      <p className="mb-2 text-[11px] font-black uppercase tracking-[0.4em] text-orange-600">
        Member Access
      </p>
      <h1 className="text-4xl font-black italic tracking-tighter text-orange-600 uppercase sm:text-5xl">
        WELCOME <span className="text-white">BACK</span>
      </h1>
      
      <form className="mt-10 space-y-6">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
          <input type="email" placeholder="hustle@hajima.com" className={inputClasses} />
        </div>

        <div>
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Password</label>
            <button type="button" className="text-[10px] uppercase font-bold text-orange-600 hover:text-white transition">Forgot?</button>
          </div>
          <input type="password" placeholder="••••••••" className={inputClasses} />
        </div>

        <Button type="submit" variant="primary" className="w-full py-4 text-xs tracking-[0.2em] font-black italic uppercase">
          Enter the Grind
        </Button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-zinc-200"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold uppercase text-zinc-400 tracking-widest">Or</span>
          <div className="flex-grow border-t border-zinc-200"></div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="button" variant="secondary" className="w-full py-3 text-[10px] font-bold uppercase">Google</Button>
          <Button type="button" variant="secondary" className="w-full py-3 text-[10px] font-bold uppercase">Apple ID</Button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-zinc-500">
        New to the family?{' '}
        <Link to="/auth/signup" className="font-black italic uppercase text-white hover:text-orange-600 transition">
          Join the Movement
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;