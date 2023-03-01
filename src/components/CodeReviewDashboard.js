import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import fetchData from "../services/fetchServices";
import { useLocalState } from "../util/useLocalStorage";
import jwt_decode from "jwt-decode";

const CodeReviewDashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setassignments] = useState(null);

  useEffect(() => {
    fetchData("/api/assignments", "GET", jwt).then((assignmentsData) => {
      setassignments(assignmentsData);
    });
  }, []);

  const claimAssignment = (assignment) => {
    const jwtDecode = jwt_decode(jwt);
    const user = {
      username: jwtDecode.sub,
    };
    assignment.codeReviewer = user;
    assignment.status = "In Review";
    fetchData(`/api/assignments/${assignment.id}`, "PUT", jwt, assignment).then(
      (updatedAssignment) => {
        const assignmentCopy = [...assignments];
        const index=assignmentCopy.findIndex(assignmentCopy=>assignmentCopy.id===assignment.id);
        assignmentCopy[index]=updatedAssignment;
        setassignments(assignmentCopy)
      }
    );
  };

  const editReview=(assignment)=>{
    window.location.href=`/assignments/${assignment.id}`;
  }


  return (
    <div style={{ margin: "2rem" }}>
      <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            onClick={() => {
              setJwt(null);
              window.location.href = "/login";
            }}
            style={{ cursor: "pointer" }}
          >
            Logout
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="h1">Code Reviewer Dashboard</div>
        </Col>
      </Row>

      <div className="assignment-wrapper in-review">
        <div className="assignment-wrapper-title h3 px-2">In Review</div>
        {assignments && assignments
              .filter((assignments) => assignments.status === "In Review").length>0 ? (
          <div
            className="d-grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill,18rem)" }}
          >
            {assignments 
              .filter((assignments) => assignments.status === "In Review")
              .map((assignment) => (
                <Card key={assignment.id} style={{ width: "18rem" }}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <Badge pill bg="info" style={{ fontSize: "1em" }}>
                        {assignment.status}
                      </Badge>
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
                        editReview(assignment);
                      }}
                    >
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No Assignments Found</div>
        )}
      </div>
      <div className="assignment-wrapper submitted">
        <div className="assignment-wrapper-title h3 px-2">Needs Update</div>
        {assignments && assignments
              .filter((assignments) => assignments.status === "Needs Update").length>0 ? (
          <div
            className="d-grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill,18rem)" }}
          >
            {assignments
              .filter((assignments) => assignments.status === "Needs Update")
              .map((assignment) => (
                <Card key={assignment.id} style={{ width: "18rem" }}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <Badge pill bg="info" style={{ fontSize: "1em" }}>
                        {assignment.status}
                      </Badge>
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
                        editReview(assignment)
                      }}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>
            No Assignments Found
          </div>
        )}
      </div>
      <div className="assignment-wrapper needs-update">
        <div className="assignment-wrapper-title h3 px-2">Awaiting review</div>
        {assignments && assignments
              .filter((assignments) => assignments.status === "Submitted").length>0 ?  (
          <div
            className="d-grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill,18rem)" }}
          >
            {assignments
              .filter((assignments) => assignments.status === "Submitted")
              .map((assignment) => (
                <Card key={assignment.id} style={{ width: "18rem" }}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <Badge pill bg="info" style={{ fontSize: "1em" }}>
                        {assignment.status}
                      </Badge>
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
                        claimAssignment(assignment);
                      }}
                    >
                      Claim
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>
            No Assignment Found
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeReviewDashboard;
