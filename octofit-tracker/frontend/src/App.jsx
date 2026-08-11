import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl } from './lib/api';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="app-title">OctoFit Tracker</h1>
          <p className="app-subtitle mb-0">React 19 presentation tier for the multi-tier app</p>
        </div>
        <p className="api-chip mb-0">API base: {getApiBaseUrl()}</p>
      </header>

      <nav className="nav nav-pills app-nav" aria-label="OctoFit sections">
        <NavLink to="/users" className="nav-link">Users</NavLink>
        <NavLink to="/activities" className="nav-link">Activities</NavLink>
        <NavLink to="/teams" className="nav-link">Teams</NavLink>
        <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>
        <NavLink to="/workouts" className="nav-link">Workouts</NavLink>
      </nav>

      <main className="app-main card shadow-sm border-0">
        <div className="card-body">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
