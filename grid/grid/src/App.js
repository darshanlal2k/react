import './App.css';
import GridTable from './components/common/GridTable';
import { Route, Routes } from 'react-router-dom';
import HospitalDetails from './components/common/HospitalDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<GridTable />} />
        <Route path='hospitaldetails' element={<HospitalDetails />} />
        
      </Routes>
    </div>
  );
}

export default App;
