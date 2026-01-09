'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Shield,
  ShieldOff,
  Mail,
  Ban,
  CheckCircle,
  XCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  UserCog,
  Star,
  Calendar,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MockUser {
  id: string;
  email: string;
  displayName: string;
  username: string;
  role: 'admin' | 'user';
  status: 'active' | 'suspended' | 'pending';
  trustScore: number;
  eventsParticipated: number;
  joinedAt: string;
}

// Mock users data
const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'alexander.joseph.bell@gmail.com',
    displayName: 'Alexander Bell',
    username: 'alex_admin',
    role: 'admin',
    status: 'active',
    trustScore: 100,
    eventsParticipated: 15,
    joinedAt: '2024-01-15',
  },
  {
    id: '2',
    email: 'sarah.chen@example.com',
    displayName: 'Sarah Chen',
    username: 'sarah_strategy',
    role: 'user',
    status: 'active',
    trustScore: 92,
    eventsParticipated: 8,
    joinedAt: '2024-03-20',
  },
  {
    id: '3',
    email: 'marcus.j@example.com',
    displayName: 'Marcus Johnson',
    username: 'marcus_tech',
    role: 'user',
    status: 'active',
    trustScore: 88,
    eventsParticipated: 6,
    joinedAt: '2024-04-10',
  },
  {
    id: '4',
    email: 'elena.r@example.com',
    displayName: 'Elena Rodriguez',
    username: 'elena_story',
    role: 'user',
    status: 'suspended',
    trustScore: 45,
    eventsParticipated: 3,
    joinedAt: '2024-06-05',
  },
  {
    id: '5',
    email: 'james.w@example.com',
    displayName: 'James Wilson',
    username: 'james_design',
    role: 'user',
    status: 'pending',
    trustScore: 0,
    eventsParticipated: 0,
    joinedAt: '2026-01-08',
  },
];

export function UserManagementPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleAdmin = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, role: u.role === 'admin' ? 'user' as const : 'admin' as const }
        : u
    ));
  };

  const handleToggleStatus = (userId: string, newStatus: 'active' | 'suspended') => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: newStatus } : u
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/20 text-emerald-400">Active</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500/20 text-red-400">Suspended</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500/20 text-amber-400">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            User Management
          </CardTitle>
          <Badge variant="outline" className="border-slate-600 text-slate-400">
            {users.length} total users
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search users by name, email, or username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-700/50 border-slate-600 text-white"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[150px] bg-slate-700/50 border-slate-600 text-white">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-slate-700/50 border-slate-600 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* User List */}
        <ScrollArea className="h-[400px]">
          <div className="space-y-2">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors"
              >
                <Avatar className="w-12 h-12 border-2 border-slate-600">
                  <AvatarFallback className={`${user.role === 'admin' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {user.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{user.displayName}</span>
                    {user.role === 'admin' && (
                      <Badge className="bg-red-500/20 text-red-400 text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Admin
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span>@{user.username}</span>
                    <span>•</span>
                    <span>{user.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium text-white">{user.trustScore}</p>
                    <p className="text-xs text-slate-500">Trust</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user.eventsParticipated}</p>
                    <p className="text-xs text-slate-500">Events</p>
                  </div>
                </div>

                {getStatusBadge(user.status)}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem 
                      onClick={() => handleToggleAdmin(user.id)}
                      className="text-slate-300 hover:text-white focus:text-white"
                    >
                      {user.role === 'admin' ? (
                        <>
                          <ShieldOff className="w-4 h-4 mr-2" />
                          Remove Admin
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Make Admin
                        </>
                      )}
                    </DropdownMenuItem>
                    {user.status === 'active' ? (
                      <DropdownMenuItem 
                        onClick={() => handleToggleStatus(user.id, 'suspended')}
                        className="text-red-400 hover:text-red-300 focus:text-red-300"
                      >
                        <Ban className="w-4 h-4 mr-2" />
                        Suspend User
                      </DropdownMenuItem>
                    ) : user.status === 'suspended' ? (
                      <DropdownMenuItem 
                        onClick={() => handleToggleStatus(user.id, 'active')}
                        className="text-emerald-400 hover:text-emerald-300 focus:text-emerald-300"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Reactivate User
                      </DropdownMenuItem>
                    ) : (
                      <>
                        <DropdownMenuItem 
                          onClick={() => handleToggleStatus(user.id, 'active')}
                          className="text-emerald-400 hover:text-emerald-300 focus:text-emerald-300"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-400 hover:text-red-300 focus:text-red-300"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
