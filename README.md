# HostelHub: AI-Powered Hostel Management Portal

HostelHub is a comprehensive, role-based hostel management platform designed to replace scattered messages and paper registers with a single source of truth for students, parents, wardens, and admin staff.

## The AI Twist
This project features advanced intelligent integrations:
- **AI Face Verification**: Facial recognition terminal simulation for secure entry gates.
- **Smart Analytics**: Dynamic dashboard charts for occupancy trends and complaint categorizations.
- **Intelligent Crowd Alerts**: Predictive capacity management that alerts administrators when occupancy exceeds safety thresholds.
- **QR Digital Passes**: Generate and scan digital out-passes and visitor passes.

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/RootNode-Rebels/hostel-management.git
   cd hostel-management
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   No `.env` file is required for local UI development, as the frontend connects to a hosted backend URL (`https://hostelhub-backend-ashen.vercel.app/api`).
   *(Note: If you plan to run the backend locally, you will need a `.env` file with `MONGO_URI` and `JWT_SECRET`, but for the frontend Vite app, it works out of the box).*

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Navigate to `http://localhost:5173`. 
   *Use the dummy credentials provided on the login screen to access the Student, Warden, or Admin portals.*

## Project Structure
- `src/pages/Admin/EntryGate.jsx`: AI Facial Recognition simulation.
- `src/pages/Admin/QRScanner.jsx`: Admin QR check-in terminal.
- `src/pages/Admin/Dashboard.jsx`: AI Analytics and Capacity Alerts.
- `src/components/Navbar.jsx`: Management and Parent Notification system.

## Hosting
The app is fully optimized to be deployed seamlessly on **Vercel** or **Netlify**.
