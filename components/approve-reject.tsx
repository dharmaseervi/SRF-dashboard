"use client"

import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, AlertCircle } from "lucide-react"
import { toast } from '@/hooks/use-toast'


const initialRequestsData = [
  { id: 1, method: 'Card', merchantName: 'Merchant A', featureRequest: 'Increase success rate', status: 'pending', priority: 'high' },
  { id: 2, method: 'UPI', merchantName: 'Merchant B', featureRequest: 'Add cashback feature', status: 'pending', priority: 'medium' },
  { id: 3, method: 'Netbanking', merchantName: 'Merchant C', featureRequest: 'Improve security', status: 'pending', priority: 'low' },
  { id: 4, method: 'Wallet', merchantName: 'Merchant D', featureRequest: 'Implement new payment gateway', status: 'approved', priority: 'high' },
  { id: 5, method: 'Card', merchantName: 'Merchant E', featureRequest: 'Add multi-currency support', status: 'rejected', priority: 'medium' },
]

export default function ApproveRejectDashboard() {
  const [requests, setRequests] = useState(initialRequestsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [comment, setComment] = useState('')

  const handleApprove = (id: number) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status: 'approved' } : request
    ))
    toast({
      title: "Request Approved",
      description: `Request ID ${id} has been approved.`,
    })
  }

  const handleReject = (id: number) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status: 'rejected' } : request
    ))
    toast({
      title: "Request Rejected",
      description: `Request ID ${id} has been rejected.`,
    })
  }

  const handleCommentSubmit = () => {
    if (selectedRequest && comment) {
      // In a real application, you would send this comment to a backend
      console.log(`Comment for Request ID ${selectedRequest.id}: ${comment}`)
      setComment('')
      setSelectedRequest(null)
      toast({
        title: "Comment Submitted",
        description: `Your comment for Request ID ${selectedRequest.id} has been recorded.`,
      })
    }
  }

  const filteredRequests = requests.filter(request =>
    (request.merchantName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    request.id.toString().includes(debouncedSearchTerm)) &&
    (statusFilter === 'all' || request.status === statusFilter) &&
    (priorityFilter === 'all' || request.priority === priorityFilter)
  )

  const counts = requests.reduce((acc, request) => {
    acc[request.status] = (acc[request.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Approve/Reject Requests</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {['approved', 'rejected', 'pending'].map(status => (
          <Card key={status}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </CardTitle>
              <Badge variant={status === 'approved' ? 'success' : status === 'rejected' ? 'destructive' : 'default'}>
                {counts[status] || 0}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts[status] || 0}</div>
              <p className="text-xs text-muted-foreground">
                Total {status} requests
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <div className="flex items-center space-x-2 w-full md:w-1/3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            className="flex-1"
            placeholder="Search by Request ID or Merchant Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 w-full md:w-1/3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 w-full md:w-1/3">
          <AlertCircle className="w-4 h-4 text-muted-foreground" />
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Requests by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Merchant Name</TableHead>
                <TableHead>Feature Request</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map(request => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.merchantName}</TableCell>
                  <TableCell>{request.featureRequest}</TableCell>
                  <TableCell>{request.method}</TableCell>
                  <TableCell>
                    <Badge variant={request.priority === 'high' ? 'destructive' : request.priority === 'medium' ? 'default' : 'secondary'}>
                      {request.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={request.status === 'approved' ? 'success' : request.status === 'rejected' ? 'destructive' : 'default'}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {request.status === 'pending' && (
                        <>
                          <Button size="sm" onClick={() => handleApprove(request.id)}>
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(request.id)}>
                            Reject
                          </Button>
                        </>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedRequest(request)}>
                            Comment
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Comment</DialogTitle>
                            <DialogDescription>
                              Add a comment for Request ID: {selectedRequest?.id}
                            </DialogDescription>
                          </DialogHeader>
                          <Textarea
                            placeholder="Type your comment here."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <Button onClick={handleCommentSubmit}>Submit Comment</Button>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRequests.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No requests found matching your search criteria.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}