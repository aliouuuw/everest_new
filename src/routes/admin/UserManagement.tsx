import React, { useState } from 'react';
import { FaEdit, FaSearch, FaTrash, FaUser, FaUserEdit, FaUserPlus, FaUserShield, FaUserTie } from 'react-icons/fa';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';

interface User {
  _id: Id<"users">;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer' | 'client';
  avatar?: string;
  bio?: string;
  lastLogin?: number;
  createdAt: number;
}

export const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const users = useQuery(api.users.getUsers);
  const createUser = useMutation(api.users.createUser);
  const updateUser = useMutation(api.users.updateUser);
  const deleteUser = useMutation(api.users.deleteUser);

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  }) || [];

  const handleCreateUser = async (userData: { email: string; name: string; role: string }) => {
    try {
      await createUser({
        email: userData.email,
        name: userData.name,
        role: userData.role as any,
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create user:', error);
      alert('Failed to create user');
    }
  };

  const handleUpdateUser = async (id: Id<"users">, updates: any) => {
    try {
      await updateUser({
        id,
        ...updates,
      });
      setEditingUser(null);
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user');
    }
  };

  const handleDeleteUser = async (id: Id<"users">) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser({ id });
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <FaUserShield className="text-[var(--error-red)]" />;
      case 'editor':
        return <FaUserEdit className="text-[var(--gold-metallic)]" />;
      case 'viewer':
        return <FaUser className="text-[var(--success-green)]" />;
      case 'client':
        return <FaUserTie className="text-[var(--night)]" />;
      default:
        return <FaUser className="text-[var(--night-80)]" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig: Record<string, { color: string; label: string }> = {
      admin: { color: 'bg-[var(--error-red)]/10 text-[var(--error-red)] border-[var(--error-red)]/20', label: 'Admin' },
      editor: { color: 'bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] border-[var(--gold-metallic)]/20', label: 'Editor' },
      viewer: { color: 'bg-[var(--success-green)]/10 text-[var(--success-green)] border-[var(--success-green)]/20', label: 'Viewer' },
      client: { color: 'bg-[var(--night)]/10 text-[var(--night)] border-[var(--night)]/20', label: 'Client' },
    };
    
    const config = roleConfig[role] ?? { color: 'bg-[var(--night)]/10 text-[var(--night)] border-[var(--night)]/20', label: role };
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-[var(--gold-metallic)]/20 pb-6">
        <div>
          <h1 className="text-4xl font-display font-semibold text-[var(--night)]">User Management</h1>
          <p className="text-[var(--night-80)] mt-3 text-lg">Manage users and their roles</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary"
        >
          <FaUserPlus className="mr-2" />
          Add User
        </button>
      </div>

      {/* Filters and Search */}
      <div className="stat-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--night-80)]" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
            <option value="client">Client</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="stat-card">
        <div className="px-6 py-4 border-b border-[var(--gold-metallic)]/20">
          <h2 className="text-xl font-display font-semibold text-[var(--night)]">
            Users ({filteredUsers.length})
          </h2>
        </div>
        
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--gold-metallic)]/20">
              <thead className="bg-[var(--gold-metallic)]/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[var(--night-80)] uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[var(--night-80)] uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[var(--night-80)] uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[var(--night-80)] uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[var(--night-80)] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[var(--pure-white)]/30 divide-y divide-[var(--gold-metallic)]/20">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-[var(--gold-metallic)]/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {user.avatar ? (
                            <img
                              className="h-12 w-12 rounded-xl border border-[var(--gold-metallic)]/20"
                              src={user.avatar}
                              alt={user.name}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-xl bg-[var(--gold-metallic-10)] border border-[var(--gold-metallic)]/20 flex items-center justify-center">
                              <FaUser className="text-[var(--gold-dark)]" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-display font-medium text-[var(--night)]">{user.name}</div>
                          <div className="text-sm text-[var(--night-80)]">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRoleIcon(user.role)}
                        <span className="ml-3">{getRoleBadge(user.role)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--night-80)]">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--night-80)]">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-[var(--night)] hover:text-[var(--night-80)] transition-colors p-2 hover:bg-[var(--night)]/10 rounded-lg"
                          title="Edit"
                        >
                          <FaEdit className="inline" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-[var(--error-red)] hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <FaTrash className="inline" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <FaUser className="mx-auto h-16 w-16 text-[var(--gold-metallic)]/30" />
            <h3 className="mt-4 text-xl font-display font-medium text-[var(--night)]">No users found</h3>
            <p className="mt-2 text-[var(--night-80)]">
              {searchQuery || roleFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Get started by adding your first user.'}
            </p>
            {!searchQuery && roleFilter === 'all' && (
              <div className="mt-8">
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="btn-primary"
                >
                  <FaUserPlus className="mr-2" />
                  Add User
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create User Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-[var(--night)]/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-8 border border-[var(--gold-metallic)]/20 w-96 shadow-2xl rounded-2xl bg-[var(--pure-white)]/95 backdrop-blur-sm">
            <div className="mt-3">
              <h3 className="text-xl font-display font-semibold text-[var(--night)] mb-6">Add New User</h3>
              <CreateUserForm
                onSubmit={handleCreateUser}
                onCancel={() => setShowCreateForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-[var(--night)]/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-8 border border-[var(--gold-metallic)]/20 w-96 shadow-2xl rounded-2xl bg-[var(--pure-white)]/95 backdrop-blur-sm">
            <div className="mt-3">
              <h3 className="text-xl font-display font-semibold text-[var(--night)] mb-6">Edit User</h3>
              <EditUserForm
                user={editingUser}
                onSubmit={(updates) => handleUpdateUser(editingUser._id, updates)}
                onCancel={() => setEditingUser(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Create User Form Component
const CreateUserForm: React.FC<{
  onSubmit: (data: { email: string; name: string; role: string }) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'client' as string,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--night)] mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--night)] mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-[var(--night)] mb-2">
          Role *
        </label>
        <select
          id="role"
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
          className="w-full px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
        >
          <option value="client">Client</option>
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          Create User
        </button>
      </div>
    </form>
  );
};

// Edit User Form Component
const EditUserForm: React.FC<{
  user: User;
  onSubmit: (updates: any) => void;
  onCancel: () => void;
}> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    role: user.role,
    bio: user.bio || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="edit-name" className="block text-sm font-medium text-[var(--night)] mb-2">
          Name *
        </label>
        <input
          type="text"
          id="edit-name"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="edit-role" className="block text-sm font-medium text-[var(--night)] mb-2">
          Role *
        </label>
        <select
          id="edit-role"
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as any }))}
          className="w-full px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
        >
          <option value="client">Client</option>
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <label htmlFor="edit-bio" className="block text-sm font-medium text-[var(--night)] mb-2">
          Bio
        </label>
        <textarea
          id="edit-bio"
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
        />
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          Update User
        </button>
      </div>
    </form>
  );
};
