import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { Context } from "./context/Context";
import Dashboard from "./pages/Dashboard";
import About from "./pages/about/About"
import Search from "./pages/Search"
import { Link } from "react-router-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={user ? <Home /> : <Register />}/>
        <Route path="/login" element={user ? <Home /> : <Login />}/>
        <Route path="/write" element={user ? <Write /> : <Register />}/>
        <Route path="/settings" element={user ? <Settings /> : <Register />}/>
        <Route path="/dashboard" element={(user && user.isAdmin) ? <Dashboard /> : <Home />}/>
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Insight Ink Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="/#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="/#">
            Privacy
          </Link>
        </nav>
      </footer>
    </BrowserRouter>
  );
}

export default App;
