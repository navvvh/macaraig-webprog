import { Outlet } from 'react-router-dom';
import street from '../assets/street.webp';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-black text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="flex items-center justify-center border-b-2 border-zinc-300 bg-black p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-zinc-300 lg:p-16">
          <img src={street} alt="Street" />
        </div>

        <main className="flex items-center bg-black px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;