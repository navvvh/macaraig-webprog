
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import UserService from '../../UserService';

const inputClasses = 'mt-2 w-full rounded-xl border-2 border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-600 focus:bg-zinc-800 placeholder:text-zinc-600';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await UserService.registerUser({
        firstName,
        lastName,
        email,
        password,
        role: 'viewer',
      });
      navigate('/auth/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="w-full max-w-md">
      <p className="mb-2 text-[11px] font-black uppercase tracking-[0.4em] text-orange-600">
        New Account
      </p>
      <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase sm:text-5xl">
        JOIN THE <span className="text-orange-600">GRIND</span>
      </h1>

      {error && <p className="mt-4 text-red-500 text-sm font-bold">{error}</p>}

      <form className="mt-10 space-y-5" onSubmit={handleSignUp}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">First Name</label>
            <input
              type="text"
              placeholder="Vhan"
              className={inputClasses}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Last Name</label>
            <input
              type="text"
              placeholder="Hajj"
              className={inputClasses}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
          <input
            type="email"
            placeholder="hustle@hajima.com"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" variant="primary" className="w-full py-4 text-xs tracking-[0.2em] font-black italic uppercase mt-4">
          Create Profile
        </Button>
      </form>

      <p className="mt-10 text-center text-sm text-zinc-500">
        Part of the collective?{' '}
        <Link to="/auth/signin" className="font-black italic uppercase text-white hover:text-orange-600 transition">
          Log In Here
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;