import './App.css';
import Register from './Register';
import Login from './Login';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Dashboard from './Dashboard';
import UploadNotes from './UploadNotes';
import NotesList from './NotesList';
import QuizPage from './QuizPage';
import ResultsPage from './ResultsPage';
import Homepage from './Homepage';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/upload" element={<UploadNotes/>}/>
      <Route path='/noteslist' element={<NotesList/>}/>
      <Route path="/quiz" element={<QuizPage />} />
      <Route path='/result' element={<ResultsPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;
