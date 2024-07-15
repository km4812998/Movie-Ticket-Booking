import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './stylesheets/alignments.css';
import './stylesheets/custom.css';
import './stylesheets/form.css';
import './stylesheets/layout.css';
import './stylesheets/text-elements.css';
import './stylesheets/theme.css';
import './stylesheets/sizes.css';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import TheatresForMovie from './pages/TheatresForMovie';
import BookShow from './pages/BookShow';
// import { useSelector } from 'react-redux';

function App() {
  // const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {/* {loading && (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      )}  */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <TheatresForMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-show/:id"
            element={
              <ProtectedRoute>
                <BookShow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
