import React, { useEffect, useRef, useState } from 'react';
import { Camera, CheckCircle, XCircle, ScanFace } from 'lucide-react';
import useStore from '../../store/useStore';

const EntryGate = () => {
  const videoRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null); // 'success', 'denied', or null
  const [stream, setStream] = useState(null);
  const { addToast } = useStore();

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Camera access denied", error);
      addToast("Camera access denied or unavailable.", "error");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line
  }, []);

  const simulateScan = () => {
    if (!stream) {
      addToast("Camera is not active", "error");
      return;
    }
    setIsScanning(true);
    setScanResult(null);

    // Simulate AI processing delay
    setTimeout(() => {
      setIsScanning(false);
      // Randomly simulate success or failure for demo
      const isSuccess = Math.random() > 0.3; 
      setScanResult(isSuccess ? 'success' : 'denied');
      
      if (isSuccess) {
        addToast("Identity Verified: John Doe (Room 204)", "success");
      } else {
        addToast("Identity Unrecognized. Access Denied.", "error");
      }

      // Reset after 4 seconds
      setTimeout(() => setScanResult(null), 4000);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ScanFace className="text-primary-blue" />
            AI Gate Verification
          </h1>
          <p className="text-gray-500 mt-1">Facial recognition terminal for secure campus entry.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-black rounded-2xl overflow-hidden relative shadow-lg min-h-[400px] flex items-center justify-center border-4 border-gray-800">
          {stream ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className={`w-full h-full object-cover transition-opacity ${isScanning ? 'opacity-70' : 'opacity-100'}`}
            />
          ) : (
            <div className="text-gray-500 flex flex-col items-center">
              <Camera size={48} className="mb-2" />
              <p>Camera inactive</p>
              <button onClick={startCamera} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Enable Camera</button>
            </div>
          )}

          {/* Scanning Overlay Grid */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-blue-500 relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-blue-400"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-blue-400"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-blue-400"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-blue-400"></div>
                {/* Scanning line animation */}
                <div className="w-full h-1 bg-blue-400 absolute top-0 animate-scan-line shadow-[0_0_8px_#60A5FA]"></div>
              </div>
            </div>
          )}

          {/* Result Overlay */}
          {scanResult === 'success' && (
            <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex flex-col items-center justify-center animate-fade-in z-20">
              <CheckCircle size={80} className="text-green-500 bg-white rounded-full mb-4 shadow-lg" />
              <h2 className="text-2xl font-bold text-white drop-shadow-md">Access Granted</h2>
              <p className="text-white font-medium drop-shadow-md">John Doe - Student (Room 204)</p>
            </div>
          )}

          {scanResult === 'denied' && (
            <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex flex-col items-center justify-center animate-fade-in z-20">
              <XCircle size={80} className="text-red-500 bg-white rounded-full mb-4 shadow-lg" />
              <h2 className="text-2xl font-bold text-white drop-shadow-md">Access Denied</h2>
              <p className="text-white font-medium drop-shadow-md">Identity Unrecognized</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">Terminal Status</h3>
            <div className="flex items-center gap-2 mb-4 text-sm">
              <div className={`w-3 h-3 rounded-full ${stream ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-600">{stream ? 'Online & Ready' : 'Offline'}</span>
            </div>
            <button 
              onClick={simulateScan}
              disabled={isScanning || !stream}
              className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-md ${
                isScanning ? 'bg-blue-400 cursor-not-allowed' : 'bg-primary-blue hover:bg-blue-700'
              }`}
            >
              {isScanning ? 'Processing Identity...' : 'Manual Trigger Scan'}
            </button>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Powered by AI Vision API
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
            <h3 className="font-bold text-gray-800 mb-4">Recent Scans</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm border-b pb-2">
                <div>
                  <p className="font-medium text-gray-700">Alice Smith</p>
                  <p className="text-xs text-gray-500">10:42 AM</p>
                </div>
                <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-semibold">Granted</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b pb-2">
                <div>
                  <p className="font-medium text-gray-700">Unknown Face</p>
                  <p className="text-xs text-gray-500">09:15 AM</p>
                </div>
                <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold">Denied</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-gray-700">Bob Jones</p>
                  <p className="text-xs text-gray-500">08:30 AM</p>
                </div>
                <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-semibold">Granted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryGate;
