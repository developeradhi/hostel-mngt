import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Plus, X } from 'lucide-react';
import useStore from '../../store/useStore';

const RoomAllocation = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { addToast } = useStore();

  const [formData, setFormData] = useState({
    roomNumber: '', capacity: 2
  });

  const fetchRooms = async () => {
    try {
      const res = await api.get('/rooms');
      setRooms(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await api.post('/rooms', formData);
      addToast('Room created successfully!', 'success');
      setShowModal(false);
      setFormData({ roomNumber: '', capacity: 2 });
      fetchRooms();
    } catch (error) {
      addToast('Failed to create room', 'error');
    }
  };

  if (loading) return <div>Loading rooms...</div>;

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Room Allocation</h1>
          <p className="text-gray-500 mt-1">Manage hostel rooms and assignments</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary-blue text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} /> Add Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-4 border-gray-100">
              <h3 className="text-xl font-bold text-primary-blue">Room {room.roomNumber}</h3>
              <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {room.blockName}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Occupancy</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${room.occupants.length >= room.capacity ? 'bg-alert-red' : 'bg-accent-green'}`} 
                  style={{ width: `${(room.occupants.length / room.capacity) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1 text-gray-600">{room.occupants.length} / {room.capacity} filled</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Occupants</p>
              {room.occupants.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Empty room</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {room.occupants.map((occ, idx) => (
                    <span key={idx} className="bg-blue-50 text-primary-blue border border-blue-100 px-2 py-1 rounded text-xs font-medium">
                      {occ}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Room</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-black"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddRoom} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                <input required type="text" className="w-full border px-3 py-2 rounded-lg" value={formData.roomNumber} onChange={e => setFormData({...formData, roomNumber: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
                <input required type="number" min="1" max="10" className="w-full border px-3 py-2 rounded-lg" value={formData.capacity} onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})} />
              </div>
              <button type="submit" className="w-full bg-primary-blue text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 mt-4">
                Create Room
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomAllocation;
