// components/Sidebar.js
import React from 'react';
import { TrendingUpIcon } from 'lucide-react';
const Sidebar = () => {
    return (
        <div>
            {/* <img src="https://via.placeholder.com/300x400" alt="Side" className="img-fluid mb-3" /> */}
            <div className="bg-white p-3 rounded shadow">
                <div className='d-flex align-items-center mb-3 gap-2'>
                    <TrendingUpIcon size={18} className='text-secondary' />
                    <strong>Temas Populares</strong>
                </div>
                <ul className="list-unstyled mb-0">
                    <li className='mb-3'>
                        <div className="border-start ps-3">
                            <a href="#" className='fw-semibold'>Hidrógeno Verde</a>
                        </div>
                    </li>
                    <li className='mb-3'>
                        <div className="border-start ps-3">
                            <a href="#" className='fw-semibold'>H2</a>
                        </div>
                    </li>

                    {/* <li><a href="#"></a></li>
                    <li><a href="#">Título 4</a></li>
                    <li><a href="#">Título 5</a></li> */}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
