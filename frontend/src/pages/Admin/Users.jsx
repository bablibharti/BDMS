import { useEffect, useState } from "react";
import {
  ShieldCheck,
  UserCheck,
  UserX,
  Users as UsersIcon,
  Loader2,
  AlertCircle,
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

const roleVariant = {
  admin: "secondary",
  donor: "default",
  receiver: "outline",
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await API.get("/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const verifyDonor = async (id) => {
    try {
      await API.put(`/verify/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const blockUser = async (id) => {
    try {
      await API.put(`/block/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const unblockUser = async (id) => {
    try {
      await API.put(`/unblock/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const renderStatus = (u) => {
    if (u.isBlocked)
      return (
        <Badge 
          variant="outline" 
          className="bg-red-100 text-red-800 border-red-200 px-3 py-1 text-xs font-medium flex items-center gap-1.5"
        >
          <UserX className="h-3.5 w-3.5" />
          BLOCKED
        </Badge>
      );

    if (u.role === "donor" && u.isVerified)
      return (
        <Badge 
          className="bg-emerald-100 text-emerald-800 border-emerald-200 px-3 py-1 text-xs font-medium flex items-center gap-1.5"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          VERIFIED
        </Badge>
      );

    if (u.role === "donor")
      return (
        <Badge 
          variant="secondary" 
          className="px-3 py-1 text-xs font-medium"
        >
          UNVERIFIED
        </Badge>
      );

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white p-2.5 rounded-lg shadow-sm">
                <UsersIcon className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  User Management
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  {users.length} total users
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mb-4" />
            <p className="text-slate-600 font-medium">Loading users...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-800 font-medium mb-4">{error}</p>
            <Button onClick={fetchUsers}>Retry</Button>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-white rounded-2xl shadow border border-slate-200 p-12 text-center max-w-3xl mx-auto">
            <UsersIcon className="h-20 w-20 text-slate-300 mx-auto mb-6 opacity-70" />
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              No Users Registered Yet
            </h2>
            <p className="text-slate-600 text-lg">
              When users sign up (donors, receivers or admins), they will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((u) => (
              <Card
                key={u._id}
                className="overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-xl group"
              >
                <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {u.name}
                      </CardTitle>
                      <CardDescription className="text-slate-600 break-all">
                        {u.email}
                      </CardDescription>
                    </div>

                    <Badge
                      variant={roleVariant[u.role]}
                      className="text-xs uppercase font-medium px-3 py-1 shadow-sm"
                    >
                      {u.role}
                    </Badge>
                  </div>

                  <div className="mt-4">{renderStatus(u)}</div>
                </CardHeader>

                <Separator className="bg-slate-100" />

                <CardContent className="pt-6 pb-6">
                  <div className="flex flex-wrap gap-3">
                    {u.role === "donor" && !u.isVerified && !u.isBlocked && (
                      <Button
                        onClick={() => verifyDonor(u._id)}
                        className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-sm transition-all"
                        size="sm"
                      >
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Verify Donor
                      </Button>
                    )}

                    {!u.isBlocked ? (
                      <Button
                        variant="destructive"
                        onClick={() => blockUser(u._id)}
                        size="sm"
                        className="shadow-sm transition-all"
                      >
                        <UserX className="w-4 h-4 mr-2" />
                        Block User
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => unblockUser(u._id)}
                        size="sm"
                        className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 transition-all"
                      >
                        <UserCheck className="w-4 h-4 mr-2" />
                        Unblock
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Users;