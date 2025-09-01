import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FaEdit, FaEye, FaPlus, FaShieldAlt, FaTrash, FaUser } from 'react-icons/fa';
import { useDeleteUser, useUsers } from '@/hooks/useCMS';
import { formatDate } from '@/utils/cms/helpers';
import { USER_ROLES } from '@/utils/cms/constants';
import LoadingSpinner from '@/components/CMS/Shared/LoadingSpinner';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const users = useUsers();
  const deleteUser = useDeleteUser();

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete user "${name}"?`)) {
      try {
        await deleteUser({ id: id as any });
        // Success handled by ConvexDB optimistic updates
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <FaShieldAlt className="text-red-600" />;
      case 'editor': return <FaEdit className="text-blue-600" />;
      case 'viewer': return <FaEye className="text-gray-600" />;
      default: return <FaUser className="text-gray-600" />;
    }
  };

  const getRoleLabel = (role: string) => {
    const roleObj = USER_ROLES.find(r => r.value === role);
    return roleObj ? roleObj.label : role;
  };

  const filteredUsers = users?.filter((user: any) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter((user: any) =>
    roleFilter === 'all' || user.role === roleFilter
  ) ?? [];

  if (!users) {
    return (
      <div className="p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-2">Manage user accounts and permissions</p>
        </div>
        <button
          onClick={() => navigate({ to: '/admin/users/new' })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlus className="text-sm" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="p-4">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                {USER_ROLES.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-500 ml-auto">
              {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-sm border">
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <FaUser className="text-6xl mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || roleFilter !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'Get started by adding your first user.'}
            </p>
            <button
              onClick={() => navigate({ to: '/admin/users/new' })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <FaPlus className="text-sm" />
              Add User
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user: any) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={user.avatar}
                              alt={user.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <FaUser className="text-gray-600 text-sm" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                          {getRoleLabel(user.role)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate({ to: `/admin/users/${user._id}` })}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id, user.name)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
