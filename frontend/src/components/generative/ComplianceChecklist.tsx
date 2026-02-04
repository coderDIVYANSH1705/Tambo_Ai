import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ComplianceItem {
  requirement: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  details?: string;
  reference?: string;
}

interface ComplianceChecklistProps {
  title: string;
  standard: 'GDPR' | 'HIPAA' | 'SOC2' | 'ISO27001' | 'Custom';
  items: ComplianceItem[];
  overallScore?: number;
}

export default function ComplianceChecklist({
  title,
  standard,
  items,
  overallScore,
}: ComplianceChecklistProps) {
  const getStatusIcon = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 border-green-200';
      case 'fail':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'pending':
        return 'bg-gray-50 border-gray-200';
    }
  };

  const statusCounts = items.reduce(
    (acc, item) => {
      acc[item.status]++;
      return acc;
    },
    { pass: 0, fail: 0, warning: 0, pending: 0 }
  );

  const calculatedScore =
    overallScore ??
    Math.round((statusCounts.pass / items.length) * 100);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {standard} Compliance Check
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">
              {calculatedScore}%
            </div>
            <p className="text-xs text-muted-foreground">Overall Score</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">
              {statusCounts.pass}
            </div>
            <div className="text-xs text-green-700">Passed</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">
              {statusCounts.fail}
            </div>
            <div className="text-xs text-red-700">Failed</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">
              {statusCounts.warning}
            </div>
            <div className="text-xs text-yellow-700">Warnings</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-600">
              {statusCounts.pending}
            </div>
            <div className="text-xs text-gray-700">Pending</div>
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                'p-4 rounded-lg border transition-all',
                getStatusColor(item.status)
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getStatusIcon(item.status)}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.requirement}</div>
                  {item.details && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.details}
                    </p>
                  )}
                  {item.reference && (
                    <p className="text-xs text-primary mt-1">
                      Reference: {item.reference}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
