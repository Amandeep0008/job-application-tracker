import { useEffect, useState } from "react";
import { fetchStats } from "../services/api";

const StatsBoard = ({ refreshTrigger }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    loadStats();
  }, [refreshTrigger]);

  return (
    <div className="stats-container">
      {stats.length === 0 ? (
        <p>No stats available yet.</p>
      ) : (
        stats.map((stat) => (
          <div key={stat._id} className="stat-card">
            <h2 className="stat-count">{stat.count}</h2>
            <p className="stat-label">{stat._id}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default StatsBoard;
