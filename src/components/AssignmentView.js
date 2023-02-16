import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../services/fetchServices";
import { useLocalState } from "../util/useLocalStorage";

const AssignmentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [assignment, setassignment] = useState({
    githubUrl: "",
    branch: "",
  });

  const assignmentId = window.location.href.split("/assignments/")[1];

  const updateAssignment = (props, value) => {
    const newAssignment = { ...assignment };
    newAssignment[props] = value;
    setassignment(newAssignment);
  };

  const save = () => {
    fetchData(`/api/assignments/${assignmentId}`,"PUT",jwt, assignment).then(
      (assignmentData) => {
        setassignment(assignmentData);
      }
    );
  };
  useEffect(() => {
    fetchData(`/api/assignments/${assignmentId}`,"GET",jwt)
      .then((assignmentData) => {
        setassignment(assignmentData);
      });
  }, []);

  return (
    <div>
      {assignment ? (
        <div>
          <h2>Status: {assignment.status}</h2>
          <h3>
            GitHub URL:{" "}
            <input
              type="url"
              id="githubUrl"
              onChange={(e) => updateAssignment("githubUrl", e.target.value)}
              value={assignment.githubUrl}
            />
          </h3>
          <h3>
            Branch:{" "}
            <input
              type="text"
              id="branch"
              onChange={(e) => updateAssignment("branch", e.target.value)}
              value={assignment.branch}
            />
          </h3>
          <button onClick={save}>Submit Assignment</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AssignmentView;
