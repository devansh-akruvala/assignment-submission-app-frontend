import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocalState } from '../util/useLocalStorage'

const AssignmentView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt")

    const [assignment, setassignment] = useState({
        "githubUrl":"",
        "branch":""
    })


    const assignmentId = window.location.href.split("/assignments/")[1]

    const updateAssignment = (props, value) => {
        const newAssignment = {...assignment}
        newAssignment[props] = value;
        setassignment(newAssignment)
    }

    const save=()=>{
        fetch(`/api/assignments/${assignmentId}`, {
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "PUT",
            body:JSON.stringify(assignment)
        }).then((response) => {
            if (response.status === 200)
                return response.json();
        }).then((assignmentData) => {
            setassignment(assignmentData);

        })
    }    
    useEffect(() => {
        fetch(`/api/assignments/${assignmentId}`, {
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "GET",
        }).then((response) => {
            if (response.status === 200)
                return response.json();
        }).then((assignmentData) => {
            setassignment(assignmentData);

        })
    }, [])

    return (
        <div>
            {assignment ? <div>

                <h2>Status: {assignment.status}</h2>
                <h3>GitHub URL: <input type="url" id="githubUrl" onChange={(e) => updateAssignment('githubUrl',e.target.value)} value={assignment.githubUrl} /></h3>
                <h3>Branch: <input type="text" id="branch" onChange={(e) => updateAssignment('branch',e.target.value)}  value={assignment.branch}/></h3>
                <button onClick={save}>Submit Assignment</button>
            </div> : <div></div>}
        </div>
    )
}

export default AssignmentView