import React, { useState } from 'react';
import useStore from '../store/useStore';
import { Menu, Bell, Info } from 'lucide-react';

const Navbar = ({ toggleMobileMenu }) => {
  const { user } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);

  // Simulated notifications regarding fees and child updates
  const notifications = user?.role === 'student' ? [
    { id: 1, text: "Fee Reminder: Semester 2 fees due in 5 days.", time: "1 hr ago", type: "warning" },
    { id: 2, text: "Leave Request Approved by Warden.", time: "3 hrs ago", type: "success" }
  ] : [
    { id: 3, text: "Fee Alert: 15 students have pending fees.", time: "10 mins ago", type: "warning" },
    { id: 4, text: "Capacity Alert: Hostel block A is 92% full.", time: "2 hrs ago", type: "info" }
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-500 hover:text-gray-700"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 md:hidden">HostelHub</h2>
      </div>

      <div className="flex items-center gap-6 ml-auto relative">
        <div className="relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
          <Bell size={22} className="text-gray-600 hover:text-primary-blue transition-colors" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {notifications.length}
          </span>
        </div>

        {showNotifications && (
          <div className="absolute top-12 right-12 w-80 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-50 animate-slide-up">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Notifications</h3>
              <span className="text-xs text-primary-blue cursor-pointer">Mark all read</span>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.map(notif => (
                <div key={notif.id} className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 items-start">
                  <div className={`mt-0.5 rounded-full p-1 ${notif.type === 'warning' ? 'bg-orange-100 text-orange-500' : 'bg-blue-100 text-blue-500'}`}>
                    <Info size={14} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">{notif.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 text-center text-xs text-gray-500 bg-gray-50 cursor-pointer hover:text-primary-blue">
              View all notifications
            </div>
          </div>
        )}

        <div className="text-right hidden sm:block border-l border-gray-200 pl-4">
          <p className="text-sm font-semibold text-gray-800">{user?.fullName}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold shadow-sm">
          {user?.fullName?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
