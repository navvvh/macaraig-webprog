import './index.css';
import Layout from './components/Layout';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from "./pages/LandingPages/ArticleListPage";
import ArticlePage from './pages/LandingPages/ArticlePage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from './pages/NotFoundPage';

const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/articles',
      element: <ArticleListPage />
    },
    {
      path: '/articles/:name',
      element: <ArticlePage />
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ]
}];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;