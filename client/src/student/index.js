import React from 'react'
import {useSelector} from 'react-redux'

function Index() {
    const student = useSelector(state => state.students)
    return (
        <div className="student">
            <span>Hello dear <span className="dashboard-welcome__content__body__progress">{student.firstname} {student.lastname}</span> ,</span> 
            <br />
            <span>  You are a member of <span className="dashboard-welcome__content__body__progress">{student.formation}</span> guild <br />
                    You learning <span className="dashboard-welcome__content__body__progress">{student.product}</span> track  <br />
                    Good job! You have a 100% learning rate. You can finish your track on time. Keep it up!  <br />
            </span>
            <a className="btn btn-outline-danger" href="https://learn.gomycode.co/">Our Platform</a>
        </div>
    )
}

export default Index
