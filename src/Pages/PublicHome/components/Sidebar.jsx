// components/Sidebar.js
import React from 'react';

const Sidebar = () => {
    return (
        <div>
            {/* <img src="https://via.placeholder.com/300x400" alt="Side" className="img-fluid mb-3" /> */}
            <div className="bg-white p-3 rounded shadow-sm">
                <h6>Topics</h6>
                <ul className="list-unstyled">
                    <li><a href="#">Hidrógeno Verde</a></li>
                    <li><a href="#">H2</a></li>
                    {/* <li><a href="#"></a></li>
                    <li><a href="#">Título 4</a></li>
                    <li><a href="#">Título 5</a></li> */}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
