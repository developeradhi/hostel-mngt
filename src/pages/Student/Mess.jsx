import React, { useState } from 'react';
import { Utensils, Star, ThumbsUp, MessageSquare } from 'lucide-react';
import useStore from '../../store/useStore';

const MessManagement = () => {
  const { addToast } = useStore();
  const [feedback, setFeedback] = useState('');

  const weeklyMenu = [
    { day: 'Monday', breakfast: 'Idli, Sambar, Chutney', lunch: 'Rice, Dal, Mixed Veg, Chapati', dinner: 'Fried Rice, Manchurian, Soup' },
    { day: 'Tuesday', breakfast: 'Poha, Jalebi, Milk', lunch: 'Rajma, Rice, Raita, Salad', dinner: 'Roti, Paneer Butter Masala, Sweet' },
    { day: 'Wednesday', breakfast: 'Aloo Paratha, Curd', lunch: 'Chole, Bhature, Lassi', dinner: 'Dal Tadka, Jeera Rice, Papad' },
    { day: 'Thursday', breakfast: 'Upma, Tea/Coffee', lunch: 'Rice, Sambar, Rasam, Poriyal', dinner: 'Chapati, Egg Curry / Veg Kurma' },
    { day: 'Friday', breakfast: 'Dosa, Chutney', lunch: 'Veg Biryani, Raita', dinner: 'Noodles, Chilli Paneer' },
    { day: 'Saturday', breakfast: 'Puri, Sabzi', lunch: 'Rice, Dal Makhani, Roti', dinner: 'Pav Bhaji, Dessert' },
    { day: 'Sunday', breakfast: 'Bread Omelette / Jam', lunch: 'Special Chicken / Paneer Masala, Pulao', dinner: 'Khichdi, Kadhi' },
  ];

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    addToast('Mess feedback submitted successfully!', 'success');
    setFeedback('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Utensils className="text-primary-blue" />
            Mess Management
          </h1>
          <p className="text-gray-500 mt-1">View the weekly menu, track meals, and provide feedback.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-primary-blue p-4 text-white">
              <h3 className="font-bold text-lg">Weekly Menu</h3>
              <p className="text-blue-100 text-sm mt-1">Today is {today}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 font-semibold text-gray-600">Day</th>
                    <th className="p-4 font-semibold text-gray-600">Breakfast</th>
                    <th className="p-4 font-semibold text-gray-600">Lunch</th>
                    <th className="p-4 font-semibold text-gray-600">Dinner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {weeklyMenu.map((menu) => (
                    <tr key={menu.day} className={menu.day === today ? 'bg-blue-50' : ''}>
                      <td className="p-4 font-medium text-gray-800">
                        {menu.day}
                        {menu.day === today && <span className="ml-2 text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase">Today</span>}
                      </td>
                      <td className="p-4 text-gray-600">{menu.breakfast}</td>
                      <td className="p-4 text-gray-600">{menu.lunch}</td>
                      <td className="p-4 text-gray-600">{menu.dinner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <h3 className="font-bold text-gray-800 mb-2">Today's Meal Opt-Out</h3>
            <p className="text-sm text-gray-500 mb-4">Going out? Opt-out of meals to avoid food wastage.</p>
            <div className="flex justify-center gap-3">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition">Lunch</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition">Dinner</button>
            </div>
            <p className="text-xs text-alert-red mt-3">Opt-out deadline: 10:00 AM daily</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare size={18} />
              Submit Feedback
            </h3>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rate Today's Food</label>
                <div className="flex gap-1 text-gray-300">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={24} className="cursor-pointer hover:text-yellow-400 transition-colors" />
                  ))}
                </div>
              </div>
              <div>
                <textarea 
                  required
                  placeholder="Tell us what can be improved..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue outline-none resize-none h-24 text-sm"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-primary-blue text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessManagement;
