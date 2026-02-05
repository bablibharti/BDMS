import { useEffect, useState } from "react";
import {
  ShieldCheck,
  UserCheck,
  UserX,
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

const roleVariant = {
  admin: "secondary",
  donor: "default",
  receiver: "outline",
};

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const verifyDonor = async (id) => {
    await API.put(`/verify/${id}`);
    fetchUsers();
  };

  const blockUser = async (id) => {
    await API.put(`/block/${id}`);
    fetchUsers();
  };

  const unblockUser = async (id) => {
    await API.put(`/unblock/${id}`);
    fetchUsers();
  };

  const renderStatus = (u) => {
    if (u.isBlocked)
      return <Badge variant="destructive">BLOCKED</Badge>;

    if (u.role === "donor" && u.isVerified)
      return <Badge className="bg-green-600">VERIFIED</Badge>;

    if (u.role === "donor")
      return <Badge variant="secondary">UNVERIFIED</Badge>;

    return null;
  };

  return (
    <div className="p-8 bg-muted/40 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {users.map((u) => (
          <Card key={u._id}>
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle>{u.name}</CardTitle>
                <CardDescription>{u.email}</CardDescription>
              </div>

              <Badge variant={roleVariant[u.role]}>
                {u.role.toUpperCase()}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex gap-2">
                {renderStatus(u)}
              </div>

              <div className="flex gap-3">
                {/* VERIFY DONOR */}
                {u.role === "donor" && !u.isVerified && !u.isBlocked && (
                  <Button
                    onClick={() => verifyDonor(u._id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Verify
                  </Button>
                )}

                {/* BLOCK / UNBLOCK */}
                {!u.isBlocked ? (
                  <Button
                    variant="destructive"
                    onClick={() => blockUser(u._id)}
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Block
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => unblockUser(u._id)}
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
    </div>
  );
};

export default Users;
