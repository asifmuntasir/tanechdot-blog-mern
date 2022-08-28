import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar__element">
                <h2>Settings</h2>
            </div>
            <div className="sidebar__element">
                <Link to={'/updateName'}>Change Name</Link>
            </div>
            <div className="sidebar__element">
                <Link to={'/updatePassword'}>Change Password</Link>
            </div>
        </div>
    );
};

export default SideBar;