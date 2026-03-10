import React from 'react';
import { FaCloud, FaCog, FaDatabase, FaShieldAlt } from 'react-icons/fa';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your CMS settings and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <FaCog className="text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Title
                </label>
                <input
                  type="text"
                  defaultValue="Everest Finance CMS"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Language
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="en">English</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <FaDatabase className="text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Database</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Connected to ConvexDB</p>
                  <p className="text-sm text-green-700">Real-time database is operational</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Settings */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <FaCloud className="text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Media Storage</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-800">Connected to Uploadthing</p>
                  <p className="text-sm text-purple-700">File storage and CDN is operational</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">File Upload Limits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Images</label>
                  <div className="text-sm font-medium">4 MB max</div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Videos</label>
                  <div className="text-sm font-medium">16 MB max</div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Documents</label>
                  <div className="text-sm font-medium">8 MB max</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900">Security</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Enable 2FA
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Session Management</p>
                  <p className="text-sm text-gray-600">Manage active sessions and login history</p>
                </div>
                <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm">
                  View Sessions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
