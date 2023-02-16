import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocalState } from '../util/useLocalStorage'

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt")
  const [assignments, setassignments] = useState(null)

  useEffect(() => {
    fetch("/api/assignments", {
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      method: "GET",
    }).then((response)=>{
      if(response.status===200)
        return response.json();
    }).then((assignmentsData)=>{
        setassignments(assignmentsData);
    })
  },)
  



  const createAssignment = () => {
    console.log("CALLED")
    fetch("/api/assignments", {
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      method: "post",
    }).then((response) => {
      if (response.status === 200)
        return response.json();
    }).then((assignment) => {
      console.log(assignment)
      window.location.href=`/assignments/${assignment.id}`;
    })
  }

  return (
    <div>
      {assignments?assignments.map((assignment)=><div>
       <Link to={`/assignments/${assignment.id}`}>Assignment id: {assignment.id}</Link>

      </div>):<div></div>}
      <button onClick={createAssignment}>Submit new Assignments</button>
    </div>
  )
}

export default Dashboard