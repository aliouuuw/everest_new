import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FaSave, FaTimes } from 'react-icons/fa';
import { ErrorMessage, LoadingSpinner } from '../Shared';
import { useCreateUser, useUpdateUser, useUser } from '@/hooks/useCMS';
import { useCurrentUser } from '@/hooks/useAuth';
import { USER_ROLES } from '@/utils/cms/constants';

interface UserFormProps {
  userId?: string;
  onClose?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userId, onClose }) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'viewer' as 'admin' | 'editor' | 'viewer',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch existing user if editing (only when we have a valid userId)
  const existingUser = userId && userId !== 'new' ? useUser(userId) : null;

  // Mutations
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (existingUser && userId && userId !== 'new') {
      // Filter out 'client' role and default to 'viewer'
      const role = existingUser.role === 'client' ? 'viewer' : existingUser.role;
      setFormData({
        name: existingUser.name ?? '',
        email: existingUser.email,
        role: role ?? 'viewer',
      });
    }
  }, [existingUser, userId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (userId && userId !== 'new') {
        // Update existing user
        await updateUser({
          id: userId as any,
          ...formData,
        });
      } else {
        // Create new user
        await createUser({
          ...formData,
        });
      }

      // Navigate to users list or close modal
      if (onClose) {
        onClose();
      } else {
        navigate({ to: '/admin/users' });
      }
    } catch (error) {
      console.error('Failed to save user:', error);
      setErrors({ submit: 'Failed to save user. Please try again.' });
    }
  };

  if (currentUser === undefined) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-600">You need admin privileges to manage users.</p>
      </div>
    );
  }

  // Show loading only when fetching an existing user
  if (userId && userId !== 'new' && !existingUser) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {userId && userId !== 'new' ? 'Edit User' : 'Create User'}
            </h1>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="text-xl" />
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.submit && (
            <ErrorMessage message={errors.submit} />
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter user's full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter user's email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value as 'admin' | 'editor' | 'viewer')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {USER_ROLES.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <div className="mt-2 text-sm text-gray-600">
              <div className="space-y-1">
                <div><strong>Admin:</strong> Full access to all features</div>
                <div><strong>Editor:</strong> Can create and edit content</div>
                <div><strong>Viewer:</strong> Read-only access</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FaSave className="text-sm" />
              {userId && userId !== 'new' ? 'Update' : 'Create'} User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
