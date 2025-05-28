
import React, { useState } from 'react';
import { Power, PowerOff, Server, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [vmStatus, setVmStatus] = useState<'running' | 'stopped'>('stopped');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const toggleVM = async () => {
    setIsLoading(true);
    const action = vmStatus === 'running' ? 'stop' : 'start';
    
    try {
      console.log(`Attempting to ${action} VM...`);
      
      // Call Flask backend API
      const response = await fetch('/api/vm/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        const newStatus = vmStatus === 'running' ? 'stopped' : 'running';
        setVmStatus(newStatus);
        
        toast({
          title: `VM ${action === 'start' ? 'Started' : 'Stopped'}`,
          description: `Virtual machine is now ${newStatus}`,
        });
        
        console.log(`VM successfully ${action}ed`);
      } else {
        throw new Error(`Failed to ${action} VM`);
      }
    } catch (error) {
      console.error(`Error ${action}ing VM:`, error);
      toast({
        title: "Error",
        description: `Failed to ${action} VM. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = () => {
    return vmStatus === 'running' ? 'bg-green-500' : 'bg-red-500';
  };

  const getStatusText = () => {
    return vmStatus === 'running' ? 'Running' : 'Stopped';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">VM Dashboard</h1>
          <p className="text-slate-600">Manage your virtual machine instances</p>
        </div>

        {/* Main Control Card */}
        <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Server className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Virtual Machine</CardTitle>
                  <CardDescription>Primary VM Instance</CardDescription>
                </div>
              </div>
              <Badge 
                variant="secondary" 
                className={`${getStatusColor()} text-white border-0 px-3 py-1`}
              >
                <Activity className="h-3 w-3 mr-1" />
                {getStatusText()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-slate-600">
                  Status: <span className="font-medium">{getStatusText()}</span>
                </p>
                <p className="text-sm text-slate-600">
                  Instance ID: <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">vm-001</span>
                </p>
              </div>
              
              <Button
                onClick={toggleVM}
                disabled={isLoading}
                size="lg"
                className={`
                  h-12 px-6 font-medium transition-all duration-200 transform hover:scale-105
                  ${vmStatus === 'running' 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                  }
                `}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {vmStatus === 'running' ? 'Stopping...' : 'Starting...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {vmStatus === 'running' ? (
                      <PowerOff className="h-5 w-5" />
                    ) : (
                      <Power className="h-5 w-5" />
                    )}
                    {vmStatus === 'running' ? 'Stop VM' : 'Start VM'}
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/60 backdrop-blur border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Server className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">CPU Usage</p>
                  <p className="text-lg font-semibold text-slate-800">
                    {vmStatus === 'running' ? '45%' : '0%'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Memory</p>
                  <p className="text-lg font-semibold text-slate-800">
                    {vmStatus === 'running' ? '2.1/4 GB' : '0/4 GB'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Server className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Uptime</p>
                  <p className="text-lg font-semibold text-slate-800">
                    {vmStatus === 'running' ? '2h 15m' : '0m'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
