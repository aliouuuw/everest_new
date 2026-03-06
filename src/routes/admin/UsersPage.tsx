import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FaEdit, FaEye, FaPlus, FaShieldAlt, FaTrash, FaUser } from 'react-icons/fa';
import { useDeleteUser, useUsers } from '@/hooks/useCMS';
import { formatDate } from '@/utils/cms/helpers';
import { USER_ROLES } from '@/utils/cms/constants';
import { LoadingSpinner } from '@/components/CMS/Shared';

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

  const getRoleStyle = (role: string): React.CSSProperties => {
    switch (role) {
      case 'admin': return { background: 'rgba(70,29,76,0.1)', color: 'var(--mauve)', fontFamily: 'var(--font-primary)', fontWeight: 500 };
      case 'editor': return { background: 'rgba(202,148,47,0.1)', color: 'var(--jaune-or)', fontFamily: 'var(--font-primary)', fontWeight: 500 };
      case 'viewer': return { background: 'rgba(10,10,10,0.06)', color: 'var(--night-60)', fontFamily: 'var(--font-primary)', fontWeight: 500 };
      default: return { background: 'rgba(10,10,10,0.06)', color: 'var(--night-60)', fontFamily: 'var(--font-primary)', fontWeight: 500 };
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <FaShieldAlt style={{ color: 'var(--mauve)' }} />;
      case 'editor': return <FaEdit style={{ color: 'var(--jaune-or)' }} />;
      case 'viewer': return <FaEye style={{ color: 'var(--night-60)' }} />;
      default: return <FaUser style={{ color: 'var(--night-60)' }} />;
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
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>Utilisateurs</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)' }}>Gérez les comptes et permissions</p>
        </div>
        <button
          onClick={() => navigate({ to: '/admin/users/new' })}
          className="flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
          style={{ background: 'var(--mauve)', color: 'var(--pure-white)', fontFamily: 'var(--font-primary)', fontWeight: 500 }}
        >
          <FaPlus className="text-sm" />
          Ajouter
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6" style={{ background: 'var(--pure-white)', border: '1px solid rgba(70,29,76,0.12)' }}>
        <div className="p-4">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-4 py-2 text-sm outline-none transition-all duration-300"
                style={{ border: '1px solid rgba(70,29,76,0.2)', fontFamily: 'var(--font-primary)', color: 'var(--night)' }}
              />
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 text-sm outline-none transition-all duration-300"
                style={{ border: '1px solid rgba(70,29,76,0.2)', fontFamily: 'var(--font-primary)', color: 'var(--night)' }}
              >
                <option value="all">All Roles</option>
                {USER_ROLES.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>

            <div className="text-sm ml-auto" style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)' }}>
              {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div style={{ background: 'var(--pure-white)', border: '1px solid rgba(70,29,76,0.12)' }}>
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mb-4">
              <FaUser className="text-6xl mx-auto" style={{ color: 'var(--mauve-30)' }} />
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>Aucun utilisateur trouvé</h3>
            <p className="mb-4" style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)', fontSize: '0.875rem' }}>
              {searchQuery || roleFilter !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'Get started by adding your first user.'}
            </p>
            <button
              onClick={() => navigate({ to: '/admin/users/new' })}
              className="inline-flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
              style={{ background: 'var(--mauve)', color: 'var(--pure-white)', fontFamily: 'var(--font-primary)', fontWeight: 500 }}
            >
              <FaPlus className="text-sm" />
              Add User
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ background: 'rgba(70,29,76,0.04)', borderBottom: '1px solid rgba(70,29,76,0.12)' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                    Dernière connexion
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                    Créé
                  </th>
                  <th className="px-6 py-3 text-right text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user: any) => (
                  <tr key={user._id} style={{ borderBottom: '1px solid rgba(70,29,76,0.06)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(70,29,76,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}>
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
                            <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(70,29,76,0.1)' }}>
                              <FaUser className="text-sm" style={{ color: 'var(--mauve)' }} />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>
                            {user.name}
                          </div>
                          <div className="text-sm" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)', fontSize: '0.8rem' }}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span className="inline-flex px-2 py-1 text-xs" style={getRoleStyle(user.role)}>
                          {getRoleLabel(user.role)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>
                      {user.lastLogin ? formatDate(user.lastLogin) : '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate({ to: `/admin/users/${user._id}` })}
                          className="p-1.5 transition-colors duration-200"
                          style={{ color: 'var(--mauve)' }}
                          title="Modifier"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id, user.name)}
                          className="p-1.5 transition-colors duration-200"
                          style={{ color: '#dc2626' }}
                          title="Supprimer"
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
