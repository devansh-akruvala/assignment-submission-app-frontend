import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchData from "../services/fetchServices";
import { useLocalState } from "../util/useLocalStorage";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setassignments] = useState(null);

  useEffect(() => {
    fetchData("/api/assignments", "GET", jwt).then((assignmentsData) => {
      setassignments(assignmentsData);
    });
  });

  const createAssignment = () => {
    fetchData("/api/assignments", "POST", jwt).then((assignment) => {
      window.location.href = `/assignments/${assignment.id}`;
    });
  };

  return (
    <div>
      {assignments ? (
        assignments.map((assignment) => (
          <div key={assignment.id}>
            <Link to={`/assignments/${assignment.id}`}>
              Assignment id: {assignment.id}
            </Link>
          </div>
        ))
      ) : (
        <div></div>
      )}
      <button onClick={createAssignment}>Submit new Assignments</button>
    </div>
  );
};

export default Dashboard;
