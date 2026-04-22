import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import Layout from './components/Layout';
// import AuthLayout from './components/AuthLayout'; // Siguraduhing mayroon kang file na ito

// Pages
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import ArticlePage from './pages/LandingPages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Pages (I-uncomment o i-adjust base sa actual file names mo)
// import SignInPage from './pages/Auth/SignInPage';
// import SignUpPage from './pages/Auth/SignUpPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticleListPage />,
      },
      {
        path: 'articles/:name',
        element: <ArticlePage />,
      },
    ],
  },
  {
    path: 'auth',
    // element: <AuthLayout />, // I-uncomment kapag ready na ang AuthLayout
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'signin',
        // element: <SignInPage />,
      },
      {
        path: 'signup',
        // element: <SignUpPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;