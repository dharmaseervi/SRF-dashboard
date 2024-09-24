'use client'
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useDebounce } from 'use-debounce';

const initialRequestsData = [
  { id: 1, method: 'Card', merchantName: 'Merchant A', featureRequest: 'Increase success rate', status: 'pending' },
  { id: 2, method: 'UPI', merchantName: 'Merchant B', featureRequest: 'Add cashback feature', status: 'pending' },
  { id: 3, method: 'Netbanking', merchantName: 'Merchant C', featureRequest: 'Improve security', status: 'pending' },
  // (add more data as needed)
];

function ApproveRejectDashboard() {
  const [requests, setRequests] = useState(initialRequestsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300); // Debounce the search term

  const handleApprove = (id) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status: 'approved' } : request
    ));
  };

  const handleReject = (id) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status: 'rejected' } : request
    ));
  };

  const filteredRequests = requests.filter(request =>
    request.merchantName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    request.id.toString().includes(debouncedSearchTerm)
  );

  const counts = requests.reduce((acc, request) => {
    acc[request.status] = (acc[request.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className=" min-h-screen p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Approve/Reject Requests</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {['approved', 'rejected', 'pending'].map(status => (
          <Card
            key={status}
          >
            <CardHeader>
              <CardTitle className={`text-${status === 'approved' ? 'green-600' : status === 'rejected' ? 'red-600' : 'yellow-600'} text-xl font-semibold`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}: {counts[status] || 0}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-500">
              <p>Total {status} requests: {counts[status] || 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <Input
          className="w-full sm:w-96 bg-white border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 p-4"
          placeholder="Search by Request ID or Merchant Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Requests Section */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Requests by Status</h2>

        {/* Display filtered results */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredRequests.map(request => (
              <Card key={request.id} className="border border-gray-200 bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-transform">
                <CardContent>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-700">Request ID: {request.id}</p>
                      <p className="text-gray-500">Merchant Name: {request.merchantName}</p>
                      <p className="text-gray-500">Feature Request: {request.featureRequest}</p>
                      <p className={`font-semibold mt-2 ${request.status === 'pending' ? 'text-yellow-600' : request.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                        Status: {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </p>
                    </div>
                    {request.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button variant="secondary" className="bg-green-500 text-white hover:bg-green-600 transition duration-200 ease-in-out" onClick={() => handleApprove(request.id)}>
                          Approve
                        </Button>
                        <Button variant="destructive" className="bg-red-500 text-white hover:bg-red-600 transition duration-200 ease-in-out" onClick={() => handleReject(request.id)}>
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No requests found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
}

export default ApproveRejectDashboard;
