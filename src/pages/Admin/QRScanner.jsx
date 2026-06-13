import React, { useState } from 'react';
import { ScanLine, CheckCircle, Search, QrCode } from 'lucide-react';
import useStore from '../../store/useStore';

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const { addToast } = useStore();

  const simulateScan = () => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate network delay for scan validation
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        visitorName: 'Michael Scott',
        hostStudent: 'Jim Halpert',
        room: '304',
        purpose: 'Friend',
        validUntil: '08:00 PM',
        status: 'valid'
      });
      addToast("Pass Validated Successfully", "success");
    }, 1500);
  };

  const handleCheckIn = () => {
    addToast("Visitor Checked In", "success");
    setScanResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ScanLine className="text-primary-blue" />
            Digital Pass Scanner
          </h1>
          <p className="text-gray-500 mt-1">Scan student and visitor QR codes for check-in/out.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative w-64 h-64 border-4 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 mb-8 overflow-hidden">
            {isScanning ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-full h-2 bg-blue-500 absolute top-0 animate-scan-line shadow-[0_0_15px_#3B82F6]"></div>
                <QrCode size={64} className="text-blue-500 animate-pulse" />
                <p className="mt-4 text-blue-600 font-medium">Scanning...</p>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <QrCode size={64} className="mx-auto mb-2 opacity-50" />
                <p>Position QR Code within frame</p>
              </div>
            )}
          </div>
          
          <button 
            onClick={simulateScan}
            disabled={isScanning}
            className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md w-full max-w-xs ${
              isScanning ? 'bg-blue-300 cursor-not-allowed' : 'bg-primary-blue hover:bg-blue-700'
            }`}
          >
            {isScanning ? 'Scanning...' : 'Simulate Scan'}
          </button>
        </div>

        <div>
          {scanResult ? (
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-green-500 animate-slide-up h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <CheckCircle size={32} className="text-green-500" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Pass Validated</h3>
                  <p className="text-sm text-green-600 font-medium">Active & Approved</p>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Visitor Name</p>
                  <p className="text-lg font-semibold text-gray-800">{scanResult.visitorName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Host Student</p>
                    <p className="text-md font-semibold text-gray-800">{scanResult.hostStudent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Room Number</p>
                    <p className="text-md font-semibold text-gray-800">{scanResult.room}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Purpose</p>
                    <p className="text-md font-semibold text-gray-800">{scanResult.purpose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Valid Until</p>
                    <p className="text-md font-semibold text-gray-800">{scanResult.validUntil}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100">
                <button 
                  onClick={handleCheckIn}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-colors shadow-sm"
                >
                  Confirm Check-In
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-full flex flex-col items-center justify-center text-gray-400">
              <Search size={48} className="mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Waiting for Scan...</h3>
              <p className="text-center text-sm px-4">
                Scan a visitor or student out-pass QR code to view details and process check-in/check-out.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
