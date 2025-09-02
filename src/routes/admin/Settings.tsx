import React, { useState } from 'react';
import { FaSave, FaCog, FaDatabase, FaShieldAlt, FaGlobe, FaPalette } from 'react-icons/fa';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: FaCog },
    { id: 'database', label: 'Database', icon: FaDatabase },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
    { id: 'integrations', label: 'Integrations', icon: FaGlobe },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure system settings and preferences</p>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar Navigation */}
        <div className="w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow">
            {/* Tab Content */}
            {activeTab === 'general' && (
              <GeneralSettings />
            )}
            {activeTab === 'database' && (
              <DatabaseSettings />
            )}
            {activeTab === 'security' && (
              <SecuritySettings />
            )}
            {activeTab === 'appearance' && (
              <AppearanceSettings />
            )}
            {activeTab === 'integrations' && (
              <IntegrationsSettings />
            )}

            {/* Save Button */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <FaSave className="mr-2" />
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// General Settings Tab
const GeneralSettings = () => (
  <div className="p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-6">General Settings</h2>
    
    <div className="space-y-6">
      <div>
        <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
          Site Name
        </label>
        <input
          type="text"
          id="siteName"
          defaultValue="Everest Finance"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-2">
          Site Description
        </label>
        <textarea
          id="siteDescription"
          rows={3}
          defaultValue="Leading financial services company providing investment management and advisory services"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-2">
          Admin Email
        </label>
        <input
          type="email"
          id="adminEmail"
          defaultValue="admin@everestfinance.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
          Timezone
        </label>
        <select
          id="timezone"
          defaultValue="UTC"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="UTC">UTC</option>
          <option value="America/New_York">Eastern Time</option>
          <option value="America/Chicago">Central Time</option>
          <option value="America/Denver">Mountain Time</option>
          <option value="America/Los_Angeles">Pacific Time</option>
        </select>
      </div>
    </div>
  </div>
);

// Database Settings Tab
const DatabaseSettings = () => (
  <div className="p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-6">Database Settings</h2>
    
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">ConvexDB Configuration</h3>
        <p className="text-sm text-blue-700">
          Your database is hosted on ConvexDB. Configuration is managed through environment variables.
        </p>
      </div>

      <div>
        <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700 mb-2">
          Backup Frequency
        </label>
        <select
          id="backupFrequency"
          defaultValue="daily"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div>
        <label htmlFor="retentionPeriod" className="block text-sm font-medium text-gray-700 mb-2">
          Backup Retention Period
        </label>
        <select
          id="retentionPeriod"
          defaultValue="30"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="7">7 days</option>
          <option value="30">30 days</option>
          <option value="90">90 days</option>
          <option value="365">1 year</option>
        </select>
      </div>
    </div>
  </div>
);

// Security Settings Tab
const SecuritySettings = () => (
  <div className="p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-6">Security Settings</h2>
    
    <div className="space-y-6">
      <div>
        <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-2">
          Session Timeout (minutes)
        </label>
        <input
          type="number"
          id="sessionTimeout"
          defaultValue="60"
          min="15"
          max="480"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="maxLoginAttempts" className="block text-sm font-medium text-gray-700 mb-2">
          Maximum Login Attempts
        </label>
        <input
          type="number"
          id="maxLoginAttempts"
          defaultValue="5"
          min="3"
          max="10"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="lockoutDuration" className="block text-sm font-medium text-gray-700 mb-2">
          Account Lockout Duration (minutes)
        </label>
        <input
          type="number"
          id="lockoutDuration"
          defaultValue="30"
          min="15"
          max="1440"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="require2FA"
          defaultChecked={false}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="require2FA" className="ml-2 block text-sm text-gray-700">
          Require Two-Factor Authentication for Admin Users
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="enableAuditLog"
          defaultChecked={true}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="enableAuditLog" className="ml-2 block text-sm text-gray-700">
          Enable Audit Logging
        </label>
      </div>
    </div>
  </div>
);

// Appearance Settings Tab
const AppearanceSettings = () => (
  <div className="p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-6">Appearance Settings</h2>
    
    <div className="space-y-6">
      <div>
        <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-2">
          Default Theme
        </label>
        <select
          id="theme"
          defaultValue="light"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto (System)</option>
        </select>
      </div>

      <div>
        <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-2">
          Primary Color
        </label>
        <input
          type="color"
          id="primaryColor"
          defaultValue="#3b82f6"
          className="h-10 w-20 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
          Logo URL
        </label>
        <input
          type="url"
          id="logo"
          defaultValue="/logo-everest.png"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="favicon" className="block text-sm font-medium text-gray-700 mb-2">
          Favicon URL
        </label>
        <input
          type="url"
          id="favicon"
          defaultValue="/favicon.ico"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  </div>
);

// Integrations Settings Tab
const IntegrationsSettings = () => (
  <div className="p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-6">Integrations Settings</h2>
    
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">Uploadthing Integration</h3>
        <p className="text-sm text-green-700">
          File uploads are handled by Uploadthing. Configuration is managed through environment variables.
        </p>
      </div>

      <div>
        <label htmlFor="analyticsId" className="block text-sm font-medium text-gray-700 mb-2">
          Google Analytics ID
        </label>
        <input
          type="text"
          id="analyticsId"
          placeholder="G-XXXXXXXXXX"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="recaptchaSiteKey" className="block text-sm font-medium text-gray-700 mb-2">
          reCAPTCHA Site Key
        </label>
        <input
          type="text"
          id="recaptchaSiteKey"
          placeholder="6Lc...XXXX"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="enableSocialLogin"
          defaultChecked={false}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="enableSocialLogin" className="ml-2 block text-sm text-gray-700">
          Enable Social Login (Google, Facebook, etc.)
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="enableEmailNotifications"
          defaultChecked={true}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="enableEmailNotifications" className="ml-2 block text-sm text-gray-700">
          Enable Email Notifications
        </label>
      </div>
    </div>
  </div>
);
