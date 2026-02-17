import { useEffect, useState } from "react";
import { 
  Users, Activity, CheckCircle, Clock, MapPin, Droplet, 
  AlertCircle, Loader2 
} from "lucide-react";
import API from "../../services/adminApi";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: CheckCircle,
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: CheckCircle,
  },
};

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [matchedDonors, setMatchedDonors] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await API.get("/requests");
      setRequests(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    try {
      await API.put(`/request/approve/${id}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const autoMatch = async (id) => {
    try {
      const res = await API.post(`/request/auto-match/${id}`);
      setMatchedDonors(res.data.donors || []);
      setSelectedRequest(id);
    } catch (err) {
      console.error(err);
    }
  };

  const assignDonor = async (donorId) => {
    try {
      await API.put(`/request/assign/${selectedRequest}`, { donorId });
      setMatchedDonors([]);
      setSelectedRequest(null);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 text-white p-2.5 rounded-lg shadow-sm">
                <Droplet className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Blood Requests
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  {requests.length} active requests • {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="h-12 w-12 animate-spin text-red-600 mb-4" />
            <p className="text-slate-600 font-medium">Loading blood requests...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-800 font-medium mb-4">{error}</p>
            <Button onClick={fetchRequests} variant="outline">
              Try Again
            </Button>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow border border-slate-200 p-12 text-center max-w-3xl mx-auto">
            <Droplet className="h-20 w-20 text-slate-300 mx-auto mb-6 opacity-70" />
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              No Blood Requests Yet
            </h2>
            <p className="text-slate-600 text-lg">
              When receivers create urgent requests, they will appear here for approval and donor matching.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Requests Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {requests.map((req) => {
                const status = statusConfig[req.status] || statusConfig.pending;
                const StatusIcon = status.icon;

                return (
                  <Card
                    key={req._id}
                    className="overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-xl group"
                  >
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-red-700 transition-colors">
                            {req.patientName}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1.5 text-slate-600">
                            <MapPin className="h-4 w-4 opacity-80" />
                            {req.city} • {req.hospital || "Not specified"}
                          </CardDescription>
                        </div>

                        <Badge
                          variant="outline"
                          className={`px-3 py-1.5 text-xs font-medium ${status.color}`}
                        >
                          <StatusIcon className="h-4 w-4 mr-1.5" />
                          {status.label}
                        </Badge>
                      </div>
                    </CardHeader>

                    <Separator className="bg-slate-100" />

                    <CardContent className="pt-6 space-y-6">
                      <div className="grid grid-cols-2 gap-5 text-sm">
                        <div>
                          <p className="text-slate-500 font-medium">Blood Group</p>
                          <p className="font-bold text-red-700 text-base mt-0.5">{req.bloodGroup}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-medium">Units Needed</p>
                          <p className="font-bold text-slate-900 text-base mt-0.5">{req.unitsNeeded}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-3">
                        {req.status === "pending" && (
                          <Button
                            onClick={() => approveRequest(req._id)}
                            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-sm transition-all"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                        )}

                        {req.status === "approved" && (
                          <Button
                            variant="outline"
                            onClick={() => autoMatch(req._id)}
                            className="border-red-200 hover:bg-red-50 hover:text-red-800 text-red-700 transition-all"
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Auto-match Donors
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Matched Donors Panel */}
            {matchedDonors.length > 0 && (
              <Card className="mt-12 border-slate-200 shadow-xl rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                    <Activity className="h-6 w-6 text-red-600" />
                    Matched Donors
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Select a donor to fulfill request #{selectedRequest?.slice(-6)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6 space-y-4">
                  {matchedDonors.map((donor) => (
                    <div
                      key={donor._id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-red-200 transition-all duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-700 font-bold text-xl border border-red-100 shadow-sm">
                          {donor.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{donor.name}</p>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mt-1">
                            <div className="flex items-center gap-1.5">
                              <Droplet className="h-4 w-4 text-red-600" />
                              <span className="font-medium">{donor.bloodGroup}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" />
                              {donor.city}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => assignDonor(donor._id)}
                        className="bg-red-600 hover:bg-red-700 text-white min-w-[140px] transition-all"
                      >
                        Assign Donor
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Requests;