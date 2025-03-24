import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Moon, Sun, Globe, Shield, Languages, LogOut } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [language, setLanguage] = useState('english');
  const [privacyMode, setPrivacyMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    toast({
      title: !darkMode ? "Dark mode enabled" : "Light mode enabled",
      description: !darkMode ? "The interface has been switched to dark mode." : "The interface has been switched to light mode.",
      duration: 2000,
    });
    
    // In a real app, this would apply the dark mode to the entire app
  };
  
  const saveNotificationSettings = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated successfully.",
      duration: 2000,
    });
  };
  
  const handleLanguageChange = (value) => {
    setLanguage(value);
    toast({
      title: "Language updated",
      description: `Your preferred language has been set to ${value.charAt(0).toUpperCase() + value.slice(1)}.`,
      duration: 2000,
    });
  };
  
  const handleToggleTwoFactor = () => {
    setTwoFactorAuth(!twoFactorAuth);
    
    if (!twoFactorAuth) {
      toast({
        title: "Two-factor authentication",
        description: "In a real app, this would guide you through setting up 2FA.",
        duration: 3000,
      });
    } else {
      toast({
        title: "Two-factor authentication disabled",
        description: "2FA has been turned off for your account.",
        duration: 2000,
      });
    }
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      duration: 2000,
    });
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600 mb-8">
            Customize your Flex experience and manage your account preferences.
          </p>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="account">
                <User className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance">
                <Sun className="mr-2 h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Shield className="mr-2 h-4 w-4" />
                Privacy
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Manage your personal information and account details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium">Profile Information</h3>
                        <p className="text-sm text-gray-500">Update your name and contact information.</p>
                      </div>
                      <Button variant="outline">Edit Profile</Button>
                    </div>
                    
                    <div className="grid gap-4 py-4 px-6 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                        <div className="text-sm font-medium">Name</div>
                        <div className="md:col-span-2 text-sm">Alex Morgan</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                        <div className="text-sm font-medium">Email</div>
                        <div className="md:col-span-2 text-sm">alex.morgan@example.com</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                        <div className="text-sm font-medium">Time Zone</div>
                        <div className="md:col-span-2 text-sm">Pacific Standard Time (UTC-8)</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium">Subscription</h3>
                        <p className="text-sm text-gray-500">Manage your subscription plan and billing details.</p>
                      </div>
                      <Button variant="outline">Manage Subscription</Button>
                    </div>
                    
                    <div className="grid gap-4 py-4 px-6 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                        <div className="text-sm font-medium">Current Plan</div>
                        <div className="md:col-span-2 text-sm">
                          <span className="font-medium text-flex-green">Pro Plan</span> - $9.99/month
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                        <div className="text-sm font-medium">Billing Cycle</div>
                        <div className="md:col-span-2 text-sm">Monthly (Next payment: Jun 15, 2023)</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                        <div className="text-sm font-medium">Payment Method</div>
                        <div className="md:col-span-2 text-sm">Visa ending in 4242</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Actions</h3>
                    
                    <div className="flex flex-col gap-3">
                      <Button variant="outline" className="justify-start">
                        <Shield className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="justify-start text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                      </Button>
                      <Button variant="outline" className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Decide how and when you want to be notified about activity on Flex.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Task Reminders</div>
                          <div className="text-xs text-gray-500">Get reminders about upcoming and due tasks</div>
                        </div>
                        <Switch 
                          checked={emailNotifications} 
                          onCheckedChange={setEmailNotifications} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Weekly Digests</div>
                          <div className="text-xs text-gray-500">Receive a summary of your weekly progress</div>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Product Updates</div>
                          <div className="text-xs text-gray-500">Learn about new features and improvements</div>
                        </div>
                        <Switch checked={true} />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Enable Push Notifications</div>
                          <div className="text-xs text-gray-500">Receive notifications directly to your device</div>
                        </div>
                        <Switch 
                          checked={pushNotifications} 
                          onCheckedChange={setPushNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Daily Reminders</div>
                          <div className="text-xs text-gray-500">Get daily reminders for important tasks</div>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Goal Achievements</div>
                          <div className="text-xs text-gray-500">Be notified when you reach your goals</div>
                        </div>
                        <Switch checked={true} />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Sound Effects</div>
                        <div className="text-xs text-gray-500">Play sounds for notifications and actions</div>
                      </div>
                      <Switch 
                        checked={soundEffects} 
                        onCheckedChange={setSoundEffects}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveNotificationSettings}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the look and feel of your Flex interface.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Dark Mode</div>
                        <div className="text-xs text-gray-500">Switch between light and dark themes</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={darkMode} 
                          onCheckedChange={handleDarkModeToggle}
                        />
                        {darkMode ? 
                          <Moon className="h-4 w-4 text-gray-500" /> : 
                          <Sun className="h-4 w-4 text-gray-500" />
                        }
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Language</h3>
                    
                    <div className="flex items-center">
                      <div className="space-y-0.5 mr-8">
                        <div className="text-sm font-medium">Select Language</div>
                        <div className="text-xs text-gray-500">Choose your preferred language</div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <select 
                          value={language}
                          onChange={(e) => handleLanguageChange(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="english">English</option>
                          <option value="spanish">Spanish</option>
                          <option value="french">French</option>
                          <option value="german">German</option>
                          <option value="japanese">Japanese</option>
                          <option value="chinese">Chinese</option>
                        </select>
                        <Globe className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Text Size</h3>
                    
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm" className="text-xs">A-</Button>
                      <div className="text-sm">Normal</div>
                      <Button variant="outline" size="sm">A+</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>
                    Manage your privacy settings and secure your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Privacy</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Privacy Mode</div>
                          <div className="text-xs text-gray-500">Hide sensitive task information from others</div>
                        </div>
                        <Switch 
                          checked={privacyMode} 
                          onCheckedChange={setPrivacyMode}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Activity Status</div>
                          <div className="text-xs text-gray-500">Show when you're actively using Flex</div>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Data Collection</div>
                          <div className="text-xs text-gray-500">Allow anonymous usage data to improve our service</div>
                        </div>
                        <Switch checked={true} />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Two-Factor Authentication</div>
                          <div className="text-xs text-gray-500">Add an extra layer of security to your account</div>
                        </div>
                        <Switch 
                          checked={twoFactorAuth} 
                          onCheckedChange={handleToggleTwoFactor}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Login Alerts</div>
                          <div className="text-xs text-gray-500">Get notified of new logins to your account</div>
                        </div>
                        <Switch checked={true} />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Management</h3>
                    
                    <div className="flex flex-col gap-3">
                      <Button variant="outline" className="justify-start">
                        Export Your Data
                      </Button>
                      <Button variant="outline" className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                        Delete All Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Privacy Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Settings;
