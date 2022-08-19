import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import AppNavbar from './components/header/Header';
import Trainings from './components/trainings/Trainings';
import { Provider } from "react-redux";
import ViewTraining from './components/viewTraining/ViewTraining';
import { store } from "./store";
import TrainingsDataTable from "./components/trainingsDataTable/TrainingsDataTable";
// import AddTraining from "./components/addTraining/AddTraining";
// import EditTraining from "./"

function App() {

  return (
    <Provider store={store}>
    <Router>
      <AppNavbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<TrainingsDataTable />} /> 
          {/* Create a home component */}
          <Route path="/Trainings" element={<TrainingsDataTable />} />
          <Route path="/Trainings/:id"  element={<ViewTraining />} />
          {/* <Route path="/Trainings/AddTraining" element={<AddTraining />} /> */}
          {/* <Route path="/Trainings/EditTraining/:id" element={<EditTraining />} /> */}
          <Route path="Trainings/ViewTraining/:id" element={<ViewTraining />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  )
}

export default App
