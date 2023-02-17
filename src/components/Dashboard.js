import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
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
  }, []);

  const createAssignment = () => {
    fetchData("/api/assignments", "POST", jwt).then((assignment) => {
      window.location.href = `/assignments/${assignment.id}`;
    });
  };

  return (
    <div style={{margin:"2rem"}}>
      <div className="mb-5">
      <Button size="lg" onClick={createAssignment}>Submit new Assignments</Button>
      </div>
      {assignments ? (
        <div className="d-grid gap-4" style={{gridTemplateColumns:"repeat(auto-fill,18rem)"}}>
          {assignments.map((assignment) => (
   
            <Card key={assignment.id} style={{ width: "18rem" }}>
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>Assignment #{assignment.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  status: {assignment.status}
                </Card.Subtitle>
                <Card.Text>
                  <p>
                    <b>GitHub Url</b>: {assignment.githubUrl}
                  </p>
                  <p>
                    <b>Branch</b>: {assignment.branch}
                  </p>
                </Card.Text>
                <Button
                variant="secondary"
                  onClick={() => {
                    window.location.href = `/assignments/${assignment.id}`;
                  }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
  
          ))}
        </div>
      ) : (
        <div></div>
      )}

    </div>
  );
};

export default Dashboard;
