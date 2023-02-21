import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";

import fetchData from "../services/fetchServices";
import { useLocalState } from "../util/useLocalStorage";

const AssignmentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [assignment, setassignment] = useState({
    githubUrl: "",
    branch: "",
    number: null,
    status: null
  });
  const [assignmentEnums, setassignmentEnums] = useState([]);
  const [assignmentStatusEnum, setassignmentStatusEnum] = useState([]);

  const assignmentId = window.location.href.split("/assignments/")[1];

  const previousAssignment =  useRef(assignment)

  const updateAssignment = (props, value) => {
    const newAssignment = { ...assignment };
    newAssignment[props] = value;
     setassignment(newAssignment);
  };

  const updateData= ()=>{
    fetchData(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
      (assignmentData) => {
        setassignment(assignmentData);
      }
    );
  }

  const save = () => {
    if (assignment.status === assignmentStatusEnum[0].status) {
        updateAssignment('status',assignmentStatusEnum[1].status)
    }
    else{
      updateData();
    }

  };

  useEffect(() => {
    if(previousAssignment.current.status!=assignment.status){
      updateData();
    }
    previousAssignment.current=assignment;
  }, [assignment])
  

  useEffect(() => {

    fetchData(`/api/assignments/${assignmentId}`, "GET", jwt).then(
      (assignmentResponse) => {
        let assignmentData = assignmentResponse.assignment;

        setassignment(assignmentData);
        setassignmentEnums(assignmentResponse.assignmentEnums);
        setassignmentStatusEnum(assignmentResponse.assignmentStatusEnums);
       
      }

    );
  },[]);

  return (
    <div>
      {assignment ? (
        <Container className="mt-5">
          <Row className="d-flex align-items-center">
            <Col>
              <h1>Assignemnt #{assignment.number}</h1>
            </Col>
            <Col>
              <Badge pill bg="info" style={{ fontSize: "1em" }}>
                {assignment.status}
              </Badge>
            </Col>
          </Row>
          <Form.Group as={Row} className="my-3" controlId="dropdown">
            <Form.Label column sm="3">
              Assignment Number
            </Form.Label>
            <Col sm="9">
              <DropdownButton
                as={ButtonGroup}
                id={`dropdown`}
                variant={"info"}
                title={
                  assignment.number
                    ? `Assignment ${assignment.number}`
                    : "Select Assignment"
                }
                onSelect={(selectedAssignment) => {
                  updateAssignment("number", selectedAssignment);
                }}
              >
                {assignmentEnums.map((assignmentEnum) => {
                  return (
                    <Dropdown.Item key={assignmentEnum.assignmentNumber} eventKey={assignmentEnum.assignmentNumber}>
                      Assignment {assignmentEnum.assignmentNumber}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="githubUrl">
            <Form.Label column sm="3">
              GitHub URL
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="url"
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                value={assignment.githubUrl}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="3">
              Branch
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                onChange={(e) => updateAssignment("branch", e.target.value)}
                value={assignment.branch}
              />
            </Col>
          </Form.Group>

          <Button onClick={save}>Submit Assignment</Button>
        </Container>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AssignmentView;
