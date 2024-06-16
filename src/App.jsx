import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx";
import Venues from "./pages/Venues.jsx";
import EditEvent from "./pages/EditEvent.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/edit-event" element={<EditEvent />} />
      </Routes>
    </Router>
  );
}

export default App;