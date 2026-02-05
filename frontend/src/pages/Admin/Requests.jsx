import { useEffect, useState } from "react";
import { Users, Activity, CheckCircle } from "lucide-react";
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

const statusVariant = {
  pending: "secondary",
  approved: "outline",
  completed: "default",
};

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [matchedDonors, setMatchedDonors] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchRequests = async () => {
    const res = await API.get("/requests");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    await API.put(`/request/approve/${id}`);
    fetchRequests();
  };

  const autoMatch = async (id) => {
    const res = await API.post(`/request/auto-match/${id}`);
    setMatchedDonors(res.data.donors);
    setSelectedRequest(id);
  };

  const assignDonor = async (donorId) => {
    await API.put(`/request/assign/${selectedRequest}`, { donorId });
    setMatchedDonors([]);
    setSelectedRequest(null);
    fetchRequests();
  };

  return (
    <div className="p-8 bg-muted/40 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Blood Requests</h1>

      {/* REQUEST CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {requests.map((req) => (
          <Card key={req._id}>
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle>{req.patientName}</CardTitle>
                <CardDescription>
                  {req.city} • {req.hospital || "Hospital not specified"}
                </CardDescription>
              </div>

              <Badge variant={statusVariant[req.status]}>
                {req.status.toUpperCase()}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium">Blood Group:</span>{" "}
                  {req.bloodGroup}
                </p>
                <p>
                  <span className="font-medium">Units Needed:</span>{" "}
                  {req.unitsNeeded}
                </p>
              </div>

              <div className="flex gap-3">
                {req.status === "pending" && (
                  <Button onClick={() => approveRequest(req._id)}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                )}

                {req.status === "approved" && (
                  <Button
                    variant="outline"
                    onClick={() => autoMatch(req._id)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Auto-match Donors
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MATCHED DONORS */}
      {matchedDonors.length > 0 && (
        <Card className="mt-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="text-primary" />
              Matched Donors
            </CardTitle>
            <CardDescription>
              Select a donor to complete the request
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {matchedDonors.map((donor) => (
              <div
                key={donor._id}
                className="flex justify-between items-center border rounded-lg p-4"
              >
                <div>
                  <p className="font-medium">{donor.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {donor.bloodGroup} • {donor.city}
                  </p>
                </div>

                <Button onClick={() => assignDonor(donor._id)}>
                  Assign
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Requests;
