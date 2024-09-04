import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardComp from '../components/DashboardComp';
import Sidebar from '../components/sidebar/Sidebar';


export default function Dashboard() {
  
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <DashboardComp/>
      <Sidebar/>
    </div>
  );
}
