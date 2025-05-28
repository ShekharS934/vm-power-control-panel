
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const VM = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vmUrl = location.state?.vmUrl;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Virtual Machine</h1>
          <p className="text-slate-600">Your VM is now running and accessible</p>
        </div>

        {/* VM Access Card */}
        <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-green-600">VM Successfully Started!</CardTitle>
            <CardDescription>Your virtual machine is now running and ready to use</CardDescription>
          </CardHeader>
          <CardContent>
            {vmUrl ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800 mb-2">VM Access URL:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-2 bg-white rounded border text-sm font-mono">
                      {vmUrl}
                    </code>
                    <Button
                      size="sm"
                      onClick={() => window.open(vmUrl, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open VM
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Click the "Open VM" button above to access your virtual machine in a new tab.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  VM is starting but no access URL was provided. Please check your backend configuration.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions Card */}
        <Card className="bg-white/60 backdrop-blur border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Use the access URL above to connect to your VM</li>
              <li>• Your VM session will remain active until you stop it from the dashboard</li>
              <li>• Remember to stop the VM when you're done to save resources</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VM;
