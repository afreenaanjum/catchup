import React from 'react'
import {Link} from 'react-router-dom'

function MainNav() {
    return (
        <div className="main-nav">
            <ul>
                <li> <Link to=""> About</Link></li>
                <li> <Link to=""> Login</Link></li>
                <li> <Link to=""> Country</Link></li>
            </ul>
        </div>
    )
}

export default MainNav
