import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Plus, X } from 'lucide-react';
import useStore from '../../store/useStore';

const Students = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { addToast } = useStore();
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', role: 'student', roomId: ''
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', formData);
      addToast('User created successfully!', 'success');
      setShowModal(false);
      setFormData({ fullName: '', email: '', password: '', role: 'student', roomId: '' });
      fetchUsers(); // Refresh list
    } catch (error) {
      addToast('Failed to create user', 'error');
    }
  };

  if (loading) return <div>Loading directory...</div>;

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff & Student Directory</h1>
          <p className="text-gray-500 mt-1">Manage global users, wardens, and students</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary-blue text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">System ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Room</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{u.studentId}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-800">{u.userId?.fullName}</div>
                    <div className="text-xs text-gray-500">{u.userId?.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                      u.role === 'warden' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{u.roomId?.roomNumber || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs font-semibold uppercase bg-green-100 text-accent-green">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Register New User</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-black"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" className="w-full border px-3 py-2 rounded-lg" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email / Username</label>
                <input required type="text" className="w-full border px-3 py-2 rounded-lg" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
                <input required type="password" className="w-full border px-3 py-2 rounded-lg" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">System Role</label>
                <select className="w-full border px-3 py-2 rounded-lg bg-white" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="student">Student</option>
                  <option value="warden">Warden</option>
                  <option value="admin">Global Admin</option>
                </select>
              </div>
              {formData.role === 'student' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Assignment (ID)</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-lg" placeholder="Optional" value={formData.roomId} onChange={e => setFormData({...formData, roomId: e.target.value})} />
                </div>
              )}
              <button type="submit" className="w-full bg-primary-blue text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 mt-4">
                Create User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
