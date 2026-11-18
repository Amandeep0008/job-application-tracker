import { useEffect, useState } from "react";
import { fetchJobs, deleteJob, updateJob } from "./services/api";
import JobForm from "./components/JobForm";
import StatsBoard from "./components/StatsBoard";
import Auth from "./components/Auth";
import "./App.css";

function App() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user")),
  );
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAuth = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setJobs([]);
    setLoading(true);
  };

  useEffect(() => {
    if (!user) return;
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        if (error.response?.status === 401) handleLogout(); // token expired
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, [user]);

  const handleJobAdded = (newJob) => setJobs([newJob, ...jobs]);

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedJob = await updateJob(id, { status: newStatus });
      setJobs(jobs.map((job) => (job._id === id ? updatedJob : job)));
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  // Not logged in: show the login/register screen
  if (!user) return <Auth onAuth={handleAuth} />;

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading dashboard...
      </h2>
    );

  return (
    <div className="app-container">
      <div className="top-bar">
        <span>Hi, {user.name}</span>
        <button className="btn-delete" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div className="header">
        <h1>Application Tracker</h1>
        <p>Monitor your job search pipeline</p>
      </div>

      <StatsBoard refreshTrigger={jobs} />
      <JobForm onJobAdded={handleJobAdded} />

      <div className="job-list">
        {jobs.length === 0 ? (
          <p style={{ textAlign: "center", color: "#64748b" }}>
            No jobs in the pipeline yet.
          </p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-info">
                <h3 className="job-title">{job.companyName}</h3>
                <p className="job-role">{job.role}</p>
                <span className={`status-badge status-${job.status}`}>
                  {job.status}
                </span>
              </div>

              <div className="actions-group">
                <select
                  value={job.status}
                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                >
                  <option value="Wishlist">Wishlist</option>
                  <option value="Applied">Applied</option>
                  <option value="Assessment">Assessment</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offered">Offered</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(job._id)}
                >
                  Drop
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
