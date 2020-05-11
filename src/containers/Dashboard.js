import React from 'react';

const Dashboard = ({ match }) => {
    const name = match.params.username
    return(
    <div>
         Hello {name}
         <button>Sign Out</button>
    </div>
    )
}

export default Dashboard;
