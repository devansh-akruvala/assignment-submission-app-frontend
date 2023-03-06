import React, { useEffect, useState } from "react";
import {Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../Components/StatusBadge";
import { useUser } from "../Contexts/UserProvider";
import fetchData from "../services/fetchServices";

const Dashboard = () => {
  const navigate = useNavigate();
  const user=useUser();
  const [assignments, setassignments] = useState(null);

  useEffect(() => {
    fetchData("/api/assignments", "GET", user.jwt).then((assignmentsData) => {
      setassignments(assignmentsData);
    });
  }, []);

  const createAssignment = () => {
    fetchData("/api/assignments", "POST", user.jwt).then((assignment) => {
      navigate(`/assignments/${assignment.id}`);
    });
  };

  return (
    <div style={{margin:"2rem"}}>
      <Row>
        <Col>
        <div className="d-flex justify-content-end" onClick={() =>{
          user.setJwt(null)
          navigate("/login")
        }} style={{cursor:"pointer"}}>
          Logout
          </div></Col>
      </Row>
      <div className="mb-5">
      <Button size="lg" onClick={createAssignment}>Submit new Assignments</Button>
      </div>
      {assignments ? (
        <div className="d-grid gap-4" style={{gridTemplateColumns:"repeat(auto-fill,18rem)"}}>
          {assignments.map((assignment) => (
   
            <Card key={assignment.id} style={{ width: "18rem" }}>
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>Assignment #{assignment.number}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                <StatusBadge text={assignment.status}/>
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
                    navigate(`/assignments/${assignment.id}`);
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
