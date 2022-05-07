import Header from "./components/Header";
import Notes from "./pages/Notes";
import Note from "./pages/Note";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="container">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" exact element={<Notes />} />
            <Route path="/note/:id" element={<Note />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
