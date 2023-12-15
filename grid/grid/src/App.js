import './App.css';
import GridTable from './components/common/GridTable';
import { Route, Routes } from 'react-router-dom';
import HospitalDetails from './components/common/HospitalDetails';
import EditDetails from './components/common/EditDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<GridTable />} />
        <Route path='gridtable' element={<GridTable />} />
        <Route path='hospitaldetails' element={<HospitalDetails />} />
        <Route path='editdetails' element={<EditDetails />} />
      </Routes>
    </div>
  );
}

export default App;
