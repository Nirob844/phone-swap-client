import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Route/Route';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
