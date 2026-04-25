import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportUpload from "./components/ReportUpload";

function App() {
  return (
    <Router>
      <div className="p-12 h-screen">
        <header>
          <h1 className="text-3xl font-bold text-slate-800">Report Analyzer</h1>
        </header>

        <main>
          <Routes>
            <Route path="/report-upload" element={<ReportUpload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
