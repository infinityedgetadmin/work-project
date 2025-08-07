'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  UserCircleIcon,
  KeyIcon,
  BellIcon,
  LinkIcon,
  ShieldCheckIcon,
  ComputerDesktopIcon,
  CloudIcon,
  SparklesIcon,
  DocumentTextIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface SettingSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const settingSections: SettingSection[] = [
  { id: 'profile', title: 'Profile', icon: UserCircleIcon },
  { id: 'authentication', title: 'Authentication', icon: KeyIcon },
  { id: 'notifications', title: 'Notifications', icon: BellIcon },
  { id: 'integrations', title: 'Integrations', icon: LinkIcon },
  { id: 'security', title: 'Security', icon: ShieldCheckIcon },
  { id: 'display', title: 'Display', icon: ComputerDesktopIcon },
  { id: 'api', title: 'API Configuration', icon: CloudIcon },
  { id: 'ai', title: 'AI Settings', icon: SparklesIcon },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    name: 'Team Member',
    email: 'team.member@genesys.com',
    role: 'QA Engineer',
    department: 'Quality Assurance',
    location: 'Remote',
    timezone: 'America/Chicago',
    avatar: 'https://ui-avatars.com/api/?name=Team+Member&background=FF451A&color=fff'
  });

  const [authSettings, setAuthSettings] = useState({
    clientId: 'gc-hub-client-2024',
    redirectUri: 'https://hub.genesys.cloud/auth/callback',
    organization: 'genesys-prod',
    region: 'us-east-1',
    authEndpoint: 'https://login.usw2.pure.cloud',
    scopes: ['users:me', 'routing:queue:view', 'analytics:conversation:view', 'architect:flow:view']
  });

  const [notifications, setNotifications] = useState({
    epicUpdates: true,
    bugHuntAlerts: true,
    codeChanges: false,
    aiInsights: true,
    emailDigest: 'daily',
    desktopNotifications: true,
    soundEnabled: false,
    quietHours: false,
    quietStart: '18:00',
    quietEnd: '09:00'
  });

  const [integrations, setIntegrations] = useState({
    jira: { connected: true, lastSync: '2024-12-06 14:30' },
    confluence: { connected: true, lastSync: '2024-12-06 14:28' },
    bitbucket: { connected: true, lastSync: '2024-12-06 14:25' },
    github: { connected: false, lastSync: null },
    zoom: { connected: true, lastSync: '2024-12-06 13:45' },
    newRelic: { connected: true, lastSync: '2024-12-06 14:32' }
  });

  const handleSave = () => {
    setSavedMessage('Settings saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
    setEditingProfile(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>Manage your personal information and preferences</CardDescription>
                </div>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <PencilIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={userProfile.avatar}
                      alt="Profile"
                      className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                    />
                    {editingProfile && (
                      <button className="absolute bottom-0 right-0 p-1.5 bg-[#FF451A] text-white rounded-full hover:bg-[#E63D17] transition-colors">
                        <CameraIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{userProfile.name}</h3>
                    <p className="text-gray-600">{userProfile.role}</p>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                  </div>
                </div>

                {/* Profile Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                      disabled={!editingProfile}
                      className={cn(
                        "w-full px-3 py-2 border rounded-lg transition-colors",
                        editingProfile 
                          ? "border-gray-300 focus:ring-2 focus:ring-[#FF451A] focus:border-[#FF451A]" 
                          : "border-gray-200 bg-gray-50 cursor-not-allowed"
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={userProfile.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      value={userProfile.role}
                      onChange={(e) => setUserProfile({ ...userProfile, role: e.target.value })}
                      disabled={!editingProfile}
                      className={cn(
                        "w-full px-3 py-2 border rounded-lg transition-colors",
                        editingProfile 
                          ? "border-gray-300 focus:ring-2 focus:ring-[#FF451A] focus:border-[#FF451A]" 
                          : "border-gray-200 bg-gray-50 cursor-not-allowed"
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      value={userProfile.department}
                      onChange={(e) => setUserProfile({ ...userProfile, department: e.target.value })}
                      disabled={!editingProfile}
                      className={cn(
                        "w-full px-3 py-2 border rounded-lg transition-colors",
                        editingProfile 
                          ? "border-gray-300 focus:ring-2 focus:ring-[#FF451A] focus:border-[#FF451A]" 
                          : "border-gray-200 bg-gray-50 cursor-not-allowed"
                      )}
                    >
                      <option value="Quality Assurance">Quality Assurance</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Product Management">Product Management</option>
                      <option value="Operations">Operations</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={userProfile.location}
                      onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}
                      disabled={!editingProfile}
                      className={cn(
                        "w-full px-3 py-2 border rounded-lg transition-colors",
                        editingProfile 
                          ? "border-gray-300 focus:ring-2 focus:ring-[#FF451A] focus:border-[#FF451A]" 
                          : "border-gray-200 bg-gray-50 cursor-not-allowed"
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select
                      value={userProfile.timezone}
                      onChange={(e) => setUserProfile({ ...userProfile, timezone: e.target.value })}
                      disabled={!editingProfile}
                      className={cn(
                        "w-full px-3 py-2 border rounded-lg transition-colors",
                        editingProfile 
                          ? "border-gray-300 focus:ring-2 focus:ring-[#FF451A] focus:border-[#FF451A]" 
                          : "border-gray-200 bg-gray-50 cursor-not-allowed"
                      )}
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Europe/London">London</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                    </select>
                  </div>
                </div>

                {editingProfile && (
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setEditingProfile(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 glass-button-primary text-white rounded-lg hover:scale-105 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 'authentication':
        return (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Genesys Cloud Authentication</CardTitle>
              <CardDescription>Configure OAuth 2.0 settings for Genesys Cloud integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Connection Status */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Connected to Genesys Cloud</p>
                      <p className="text-sm text-green-700">Last authenticated: 2 hours ago</p>
                    </div>
                  </div>
                </div>

                {/* OAuth Settings */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                    <input
                      type="text"
                      value={authSettings.clientId}
                      className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg font-mono text-sm"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Redirect URI</label>
                    <input
                      type="text"
                      value={authSettings.redirectUri}
                      className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg font-mono text-sm"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                    <input
                      type="text"
                      value={authSettings.organization}
                      className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg font-mono text-sm"
                      disabled
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                      <select
                        value={authSettings.region}
                        onChange={(e) => setAuthSettings({ ...authSettings, region: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF451A]"
                      >
                        <option value="us-east-1">US East (Virginia)</option>
                        <option value="us-west-2">US West (Oregon)</option>
                        <option value="eu-west-1">EU (Ireland)</option>
                        <option value="ap-southeast-2">Asia Pacific (Sydney)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                      <select
                        value={authSettings.authEndpoint}
                        onChange={(e) => setAuthSettings({ ...authSettings, authEndpoint: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF451A]"
                      >
                        <option value="https://login.usw2.pure.cloud">Production (USW2)</option>
                        <option value="https://login.use1.pure.cloud">Production (USE1)</option>
                        <option value="https://login.euw1.pure.cloud">Production (EUW1)</option>
                        <option value="https://login.aps1.pure.cloud">Production (APS1)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OAuth Scopes</label>
                    <div className="space-y-2">
                      {authSettings.scopes.map((scope, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-green-600" />
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">{scope}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <ArrowPathIcon className="h-4 w-4" />
                    Refresh Token
                  </button>
                  <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    Disconnect
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'notifications':
        return (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Notification Types */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Notification Types</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'epicUpdates', label: 'Epic Updates', description: 'Status changes and comments on epics' },
                      { key: 'bugHuntAlerts', label: 'Bug Hunt Alerts', description: 'New sessions and bug discoveries' },
                      { key: 'codeChanges', label: 'Code Changes', description: 'Pull requests linked to your epics' },
                      { key: 'aiInsights', label: 'AI Insights', description: 'New recommendations and analyses' }
                    ].map((item) => (
                      <label key={item.key} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications] as boolean}
                          onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                          className="mt-1 h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Email Digest */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Email Digest</h3>
                  <select
                    value={notifications.emailDigest}
                    onChange={(e) => setNotifications({ ...notifications, emailDigest: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF451A]"
                  >
                    <option value="realtime">Real-time</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                {/* Desktop Notifications */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Desktop Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.desktopNotifications}
                        onChange={(e) => setNotifications({ ...notifications, desktopNotifications: e.target.checked })}
                        className="h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                      />
                      <span className="text-gray-700">Enable desktop notifications</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.soundEnabled}
                        onChange={(e) => setNotifications({ ...notifications, soundEnabled: e.target.checked })}
                        className="h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                      />
                      <span className="text-gray-700">Play sound for notifications</span>
                    </label>
                  </div>
                </div>

                {/* Quiet Hours */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Quiet Hours</h3>
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input
                      type="checkbox"
                      checked={notifications.quietHours}
                      onChange={(e) => setNotifications({ ...notifications, quietHours: e.target.checked })}
                      className="h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                    />
                    <span className="text-gray-700">Enable quiet hours</span>
                  </label>
                  {notifications.quietHours && (
                    <div className="grid grid-cols-2 gap-4 ml-7">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Start time</label>
                        <input
                          type="time"
                          value={notifications.quietStart}
                          onChange={(e) => setNotifications({ ...notifications, quietStart: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF451A]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">End time</label>
                        <input
                          type="time"
                          value={notifications.quietEnd}
                          onChange={(e) => setNotifications({ ...notifications, quietEnd: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF451A]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 glass-button-primary text-white rounded-lg hover:scale-105 transition-all"
                >
                  Save Preferences
                </button>
              </div>
            </CardContent>
          </Card>
        );

      case 'integrations':
        return (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Connected Integrations</CardTitle>
              <CardDescription>Manage your third-party service connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(integrations).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center",
                        value.connected ? "bg-green-100" : "bg-gray-100"
                      )}>
                        <LinkIcon className={cn(
                          "h-5 w-5",
                          value.connected ? "text-green-600" : "text-gray-400"
                        )} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 capitalize">{key}</h3>
                        {value.connected ? (
                          <p className="text-sm text-gray-600">Last synced: {value.lastSync}</p>
                        ) : (
                          <p className="text-sm text-gray-500">Not connected</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {value.connected ? (
                        <>
                          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            Sync Now
                          </button>
                          <button className="px-3 py-1.5 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <button className="px-3 py-1.5 text-sm text-white glass-button-primary rounded-lg hover:scale-105 transition-all">
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'security':
        return (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your security preferences and two-factor authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Two-Factor Authentication */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      Enabled
                    </span>
                  </div>
                  <button className="text-sm text-[#FF451A] hover:text-[#E63D17] transition-colors">
                    Manage 2FA settings →
                  </button>
                </div>

                {/* Session Management */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Active Sessions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ComputerDesktopIcon className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Chrome on MacOS</p>
                          <p className="text-sm text-gray-600">Current session • Chicago, IL</p>
                        </div>
                      </div>
                      <span className="text-xs text-green-600">Active now</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ComputerDesktopIcon className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Safari on iPhone</p>
                          <p className="text-sm text-gray-600">Mobile • Chicago, IL</p>
                        </div>
                      </div>
                      <button className="text-xs text-red-600 hover:text-red-700">Revoke</button>
                    </div>
                  </div>
                </div>

                {/* Security Preferences */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Security Preferences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                      />
                      <span className="text-gray-700">Require authentication for sensitive actions</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                      />
                      <span className="text-gray-700">Send security alerts to email</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                      />
                      <span className="text-gray-700">Log out after 30 minutes of inactivity</span>
                    </label>
                  </div>
                </div>

                {/* Password Change */}
                <div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'display':
        return (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>Customize your visual experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Theme */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Theme</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['Light', 'Dark', 'System'].map((theme) => (
                      <button
                        key={theme}
                        className={cn(
                          "p-3 border-2 rounded-lg transition-all",
                          theme === 'Light' 
                            ? "border-[#FF451A] bg-orange-50" 
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <div className="text-sm font-medium text-gray-900">{theme}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Density */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Display Density</h3>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF451A]">
                    <option value="comfortable">Comfortable</option>
                    <option value="compact">Compact</option>
                    <option value="spacious">Spacious</option>
                  </select>
                </div>

                {/* Sidebar */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Sidebar</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                      />
                      <span className="text-gray-700">Auto-collapse sidebar on small screens</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                      />
                      <span className="text-gray-700">Always show sidebar labels</span>
                    </label>
                  </div>
                </div>

                {/* Animations */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Animations</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                    />
                    <span className="text-gray-700">Enable animations and transitions</span>
                  </label>
                </div>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 glass-button-primary text-white rounded-lg hover:scale-105 transition-all"
                >
                  Save Display Settings
                </button>
              </div>
            </CardContent>
          </Card>
        );

      case 'api':
        return (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Manage API keys and webhook settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* API Key */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">API Key</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type={showApiKey ? "text" : "password"}
                        value="gc-hub-api-key-a1b2c3d4e5f6g7h8i9j0"
                        disabled
                        className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg font-mono text-sm"
                      />
                    </div>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {showApiKey ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Regenerate
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Last regenerated: Never</p>
                </div>

                {/* Rate Limits */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Rate Limits</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Requests per minute</p>
                        <p className="font-semibold text-gray-900">1,000</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Requests per day</p>
                        <p className="font-semibold text-gray-900">100,000</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Current usage (today)</p>
                        <p className="font-semibold text-gray-900">12,456</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Reset time</p>
                        <p className="font-semibold text-gray-900">00:00 UTC</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Webhooks */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Webhook Endpoints</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-mono text-sm text-gray-900">https://api.company.com/webhooks/epics</p>
                        <p className="text-xs text-gray-600">Epic updates • Active</p>
                      </div>
                      <button className="text-sm text-red-600 hover:text-red-700">Remove</button>
                    </div>
                    <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                      + Add Webhook
                    </button>
                  </div>
                </div>

                {/* CORS Settings */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">CORS Origins</h3>
                  <textarea
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF451A] font-mono text-sm"
                    rows={3}
                    defaultValue="https://hub.genesys.cloud\nhttps://localhost:3000"
                  />
                  <p className="text-xs text-gray-500 mt-1">One origin per line</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'ai':
        return (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>AI Settings</CardTitle>
              <CardDescription>Configure AI assistant behavior and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* AI Model */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">AI Model</h3>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF451A]">
                    <option value="claude-3-sonnet">Claude 3 Sonnet (Recommended)</option>
                    <option value="claude-3-haiku">Claude 3 Haiku (Faster)</option>
                    <option value="claude-3-opus">Claude 3 Opus (Most capable)</option>
                  </select>
                </div>

                {/* Response Style */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Response Style</h3>
                  <div className="space-y-2">
                    {['Concise', 'Detailed', 'Technical'].map((style) => (
                      <label key={style} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="response-style"
                          defaultChecked={style === 'Detailed'}
                          className="h-4 w-4 text-[#FF451A] border-gray-300 focus:ring-[#FF451A]"
                        />
                        <span className="text-gray-700">{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Context Preferences */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Context Preferences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                      />
                      <span className="text-gray-700">Include epic context in responses</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                      />
                      <span className="text-gray-700">Use historical data for predictions</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-[#FF451A] border-gray-300 rounded focus:ring-[#FF451A]"
                      />
                      <span className="text-gray-700">Enable proactive suggestions</span>
                    </label>
                  </div>
                </div>

                {/* Rate Limiting */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Usage Limits</h3>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <ExclamationTriangleIcon className="h-5 w-5 text-orange-600" />
                      <p className="font-medium text-orange-900">Current Usage</p>
                    </div>
                    <p className="text-sm text-orange-700">42 / 100 prompts used today</p>
                    <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                      <div className="bg-[#FF451A] h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 glass-button-primary text-white rounded-lg hover:scale-105 transition-all"
                >
                  Save AI Settings
                </button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gradient-orange">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and application preferences</p>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckIcon className="h-5 w-5 text-green-600" />
            <p className="text-green-900">{savedMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="glass-card">
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {settingSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all",
                          activeSection === section.id
                            ? "bg-gradient-to-r from-[#FF451A] to-[#ff8c66] text-white shadow-lg"
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}