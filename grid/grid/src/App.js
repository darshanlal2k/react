import './App.css';
import GridTable from './components/common/GridTable';
import { Route, Routes } from 'react-router-dom';
import HospitalDetails from './components/common/HospitalDetails';
import CountryChoose from './components/common/CountryChoose';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<GridTable />} />
        <Route path='hospitaldetails' element={<HospitalDetails />} />
        <Route path='countrydetails' element={<CountryChoose />} />
      </Routes>
    </div>
  );
}

export default App;
