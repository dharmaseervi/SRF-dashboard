'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from './ui/badge';
import { LineCharts } from './LineChart';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Chart } from './chart';
import { Label } from './ui/label';
import { CreditCard, DollarSign, ScanLine, Users } from 'lucide-react';

const SrBooster: React.FC = () => {
  const [cardFlag3Approved, setCardFlag3Approved] = useState(false);
  const [upiFlag3Approved, setUpiFlag3Approved] = useState(false);
  const [netbankingFlag3Approved, setNetbankingFlag3Approved] = useState(false);
  const router = useRouter();

  const handleRequestBoost = (paymentMethod: string) => {
    // Logic for boosting success rate
  };

  const FlagButton = ({
    label,
    status,
    onClick,
    disabled = false, // Provide default value
  }: {
    label: string;
    status: 'request' | 'approved' | 'pending';
    onClick?: () => void;
    disabled?: boolean;
  }) => {
    const statusClasses =
      status === 'approved'
        ? 'border border-green-600 text-green-600'
        : 'border border-red-600 text-red-600';

    return (
      <div className="flex justify-between items-center mt-2">
        <Label className='font-medium text-lg'>{label}</Label>
        {status === 'request' ? (
          <Button
            variant="destructive"
            size="lg"
            onClick={onClick}
            className="w-44 "
            disabled={disabled} // Disable based on prop
          >
            Request Boost
          </Button>
        ) : (
          <Badge
            variant={status === 'approved' ? 'outline' : 'secondary'}
            className="w-44 py-3 flex justify-center"
          >
            {status === 'approved' ? 'Approved' : 'Pending'}
          </Badge>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-serif">Success Rate Booster</h1>
        <Button variant="secondary" onClick={() => router.push('/srfdashboard')}>
          SRF Dashboard
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-2 w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Methods</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Total Transactions: 12,234</div>
            <div className="text-lg font-medium">Successful Transactions: 11,500</div>
            <p className="text-xs text-muted-foreground">
              Success Rate: +94.0%
            </p>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">UPI</CardTitle>
            <ScanLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Total Transactions: 5,000</div>
            <div className="text-lg font-medium">Successful Transactions: 4,800</div>
            <p className="text-xs text-muted-foreground">
              Success Rate: +96.0%
            </p>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cards</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Total Transactions: 4,000</div>
            <div className="text-lg font-medium">Successful Transactions: 3,600</div>
            <p className="text-xs text-muted-foreground">
              Success Rate: +90.0%
            </p>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Netbanking</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Total Transactions: 3,234</div>
            <div className="text-lg font-medium">Successful Transactions: 3,000</div>
            <p className="text-xs text-muted-foreground">
              Success Rate: +92.8%
            </p>
          </CardContent>
        </Card>
      </div>


      {/* Chart for existing vs predicted */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6 border mt-2">
        <h2 className="text-xl font-semibold text-center mb-4">
          Existing vs Predicted Success Rate
        </h2>
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
          <Chart />
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-6">
        {/* Card for 'Card' payment */}
        <Card className="grid grid-cols-2 gap-4 ">
          <CardContent className=" p-4">
            <CardHeader className="mb-4">
              <CardTitle>Card Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Total Transactions: 3,234</div>
              <div className="text-lg font-medium text-green-500">Success Rate: +92.8%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
              <div className="mt-5 space-y-4">
                <FlagButton
                  label="Flag 1"
                  status="request"
                  onClick={() => handleRequestBoost('Card')}
                />
                <Separator />
                <FlagButton label="Flag 2" status="pending" />
                <FlagButton
                  label="Flag 3"
                  status="approved"
                  onClick={() => setCardFlag3Approved(true)}
                  disabled={true}
                />
              </div>
            </CardContent>
          </CardContent>

          <CardContent className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Success Rate Trend</h4>
            <LineCharts />
          </CardContent>
        </Card>

        {/* Card for 'UPI' payment */}
        <Card className="grid grid-cols-2 gap-4">
          <CardContent className=" p-4">
            <CardHeader className="mb-4">
              <CardTitle>UPI Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Total Transactions: 3,234</div>
              <div className="text-lg font-medium text-green-500">Success Rate: +92.8%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
              <div className="space-y-4">
                <FlagButton
                  label="Flag 1"
                  status="request"
                  onClick={() => handleRequestBoost('UPI')}
                />
                <Separator />
                <FlagButton label="Flag 2" status="pending" />
                <FlagButton
                  label="Flag 3"
                  status="approved"
                  onClick={() => setUpiFlag3Approved(true)}
                  disabled={true}
                />
              </div>
            </CardContent>
          </CardContent>

          <CardContent className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Success Rate Trend</h4>
            <LineCharts />
          </CardContent>
        </Card>

        {/* Card for 'Netbanking' payment */}
        <Card className="grid grid-cols-2 gap-4">
          <CardContent className=" p-4">
            <CardHeader className="mb-4">
              <CardTitle>Netbanking Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Total Transactions: 3,234</div>
              <div className="text-lg font-medium text-green-500">Success Rate: +92.8%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
              <div className="space-y-4">
                <FlagButton
                  label="Flag 1"
                  status="request"
                  onClick={() => handleRequestBoost('Netbanking')}
                />
                <Separator />
                <FlagButton label="Flag 2" status="pending" />
                <FlagButton
                  label="Flag 3"
                  status="approved"
                  onClick={() => setNetbankingFlag3Approved(true)}
                  disabled={true}
                />
              </div>
            </CardContent>
          </CardContent>

          <CardContent className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Success Rate Trend</h4>
            <LineCharts />
          </CardContent>
        </Card>
      </div>
    </div >
  );
};

export default SrBooster;
