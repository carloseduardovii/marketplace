
import { HashRouter, Route, Routes } from 'react-router-dom';
import { LoadingScreen, NavBar } from './components';
import './App.css';
import { Products, ProductDetail, Purchases } from './pages';
import { useSelector } from 'react-redux';


function App() {

  const isLoading = useSelector((state) => state.isLoading)

  return (
    <div className="App">
      <HashRouter>
        {isLoading && <LoadingScreen/>}
        <NavBar />
        <Routes>
          <Route path="/" element={<Products />}></Route>
          <Route path="/product/:id" element={<ProductDetail />}></Route>
          <Route path="/purchases" element={<Purchases/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
