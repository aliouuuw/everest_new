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
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>Accès refusé</h3>
        <p style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)', fontSize: '0.875rem' }}>Vous devez être administrateur pour gérer les utilisateurs.</p>
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
      <div style={{ background: 'var(--pure-white)', border: '1px solid var(--night-10)' }}>
        <div className="p-6" style={{ borderBottom: '1px solid var(--night-5)' }}>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>
              {userId && userId !== 'new' ? 'Modifier l\'utilisateur' : 'Créer un utilisateur'}
            </h1>
            {onClose && (
              <button
                onClick={onClose}
                style={{ color: 'var(--night-60)', transition: 'color 200ms' }}
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
            <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
              Nom complet *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 text-sm outline-none transition-all duration-300"
              style={{ 
                border: errors.name ? '1px solid #ef4444' : '1px solid rgba(70,29,76,0.2)', 
                fontFamily: 'var(--font-primary)', 
                color: 'var(--night)',
                borderRadius: '0.5rem'
              }}
              placeholder="Nom de l'utilisateur"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
              Adresse email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 text-sm outline-none transition-all duration-300"
              style={{ 
                border: errors.email ? '1px solid #ef4444' : '1px solid rgba(70,29,76,0.2)', 
                fontFamily: 'var(--font-primary)', 
                color: 'var(--night)',
                borderRadius: '0.5rem'
              }}
              placeholder="email@exemple.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
              Rôle *
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value as 'admin' | 'editor' | 'viewer')}
              className="w-full px-3 py-2 text-sm outline-none transition-all duration-300"
              style={{ border: '1px solid rgba(70,29,76,0.2)', fontFamily: 'var(--font-primary)', color: 'var(--night)', borderRadius: '0.5rem' }}
            >
              {USER_ROLES.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <div className="mt-2 text-sm" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>
              <div className="space-y-1">
                <div><strong>Admin:</strong> Full access to all features</div>
                <div><strong>Editor:</strong> Can create and edit content</div>
                <div><strong>Viewer:</strong> Read-only access</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6" style={{ borderTop: '1px solid rgba(70,29,76,0.1)' }}>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
                style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)', fontWeight: 500, border: '1px solid rgba(70,29,76,0.2)' }}
              >
                Annuler
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-2"
              style={{ background: 'var(--mauve)', color: 'var(--pure-white)', fontFamily: 'var(--font-primary)', fontWeight: 500 }}
            >
              <FaSave className="text-sm" />
              {userId && userId !== 'new' ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
