import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuth from "./state/store";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookAppointmentPage from "./components/pages/BookAppointmentPage";
import CreateTimeSlotPage from "./components/pages/CreateTimeSlotPage";
import AddPatientPage from "./components/pages/AddPatientPage";

const queryClient = new QueryClient();

function App() {
  const token = useAuth((state) => state.data?.token);
  const user = useAuth((state) => state.data?.user);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              token ? <Navigate to="/dashboard" replace /> : <LoginPage />
            }
          />

          <Route
            path="/dashboard"
            element={
              token ? <DashboardPage /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/book"
            element={
              token ? <BookAppointmentPage /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/patient"
            element={
              token ? <AddPatientPage /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/timeslot"
            element={
              token && user?.role === "doctor" ? (
                <CreateTimeSlotPage />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />

          <Route
            path="/"
            element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
