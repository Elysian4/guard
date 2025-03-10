import React, { useState } from "react"; 

import { Smartphone, Wifi, Plus, Trash2, X } from "lucide-react"; 

import { Dialog } from "@headlessui/react"; 

 

const DevicePairing = () => { 

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const pairingCode = "1234-5678"; // Example pairing code 

 

  return ( 

    <div className="min-h-screen pt-16"> 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> 

        <div className="bg-white rounded-lg shadow-lg p-6"> 

          <div className="flex items-center justify-between mb-6"> 

            <h1 className="text-2xl font-bold text-gray-900">Device Pairing</h1> 

            <button 

              onClick={() => setIsModalOpen(true)} 

              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" 

            > 

              <Plus className="w-4 h-4" /> 

              <span>Add New Device</span> 

            </button> 

          </div> 

 

          <div className="space-y-6"> 

            {/* Active Device */} 

            <div className="border rounded-lg p-4"> 

              <div className="flex items-center justify-between"> 

                <div className="flex items-center gap-3"> 

                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center"> 

                    <Smartphone className="w-6 h-6 text-green-600" /> 

                  </div> 

                  <div> 

                    <h3 className="font-medium text-gray-900">Primary Phone</h3> 

                    <div className="flex items-center gap-2 text-sm text-green-600"> 

                      <Wifi className="w-4 h-4" /> 

                      <span>Connected</span> 

                    </div> 

                  </div> 

                </div> 

                <button className="text-red-600 hover:text-red-700"> 

                  <Trash2 className="w-5 h-5" /> 

                </button> 

              </div> 

            </div> 

          </div> 

        </div> 

      </div> 

 

      {/* Modal for QR Code and Pairing Code */} 

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"> 

        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96"> 

          <div className="flex justify-between items-center mb-4"> 

            <h2 className="text-lg font-semibold">Pair a New Device</h2> 

            <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-800"> 

              <X className="w-5 h-5" /> 

            </button> 

          </div> 

           

          <div className="flex flex-col items-center"> 

            <div className="border p-4 rounded-lg mb-2"> 

              <img src="/qr-placeholder.png" alt="QR Code" className="w-32 h-32" /> 

            </div> 

            <p className="text-gray-700 font-medium text-lg mb-4">Code: <span className="font-bold">{pairingCode}</span></p> 

             

            <p>Or</p> 

             

 

            <input 

              type="text" 

              placeholder="Enter pairing code" 

              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 

            /> 

             

            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"> 

              Pair Device 

            </button> 

          </div> 

        </Dialog.Panel> 

      </Dialog> 

    </div> 

  ); 

}; 

 

export default DevicePairing; 

 

 