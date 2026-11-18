import { useState } from "react";
import { createJob } from "../services/api";

const JobForm = ({ onJobAdded }) => {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newJob = await createJob({ companyName, role, status });
      onJobAdded(newJob);
      setCompanyName("");
      setRole("");
    } catch (error) {
      console.error("Failed to add job", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input
        type="text"
        placeholder="Company Name (e.g. Google)"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Role (e.g. Backend Engineer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Wishlist">Wishlist</option>
        <option value="Applied">Applied</option>
        <option value="Assessment">Assessment</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offered">Offered</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button type="submit">Add Job</button>
    </form>
  );
};
<button type="submit" className="btn-primary">
  Add Job
</button>;

export default JobForm;
