'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { LineCharts } from './LineChart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Chart } from './chart'
import { Label } from '@/components/ui/label'
import { CreditCard, DollarSign, ScanLine, Users, ArrowRight, TrendingUp, Wallet, Smartphone, Globe, AlertTriangle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const SrBooster: React.FC = () => {
  const [cardFlag3Approved, setCardFlag3Approved] = useState(false)
  const [upiFlag3Approved, setUpiFlag3Approved] = useState(false)
  const [netbankingFlag3Approved, setNetbankingFlag3Approved] = useState(false)
  const router = useRouter()

  const [boostRequestStatus, setBoostRequestStatus] = useState(""); 

  const handleRequestBoost = (label) => {
    console.log(label);
    setBoostRequestStatus("pending"); 
  };

  const [features, setFeatures] = useState([]);

  const fetchFeatures = async () => {
    try {
      const res = await fetch('https://merchant-srbooster.onrender.com/features');
      console.log(res);

      const data = await res.json();
      console.log(res);
      setFeatures(data);
      console.log(features);

    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);




  const FlagButton = ({
    label,
    status,
    onClick,
    disabled = false,
  }: {
    label: string
    status: 'request' | 'approved' | 'pending'
    onClick?: () => void
    disabled?: boolean
  }) => {
    return (
      <div className="flex justify-between items-center mt-2">
        <Label className="font-medium text-lg">{label}</Label>
        {status === 'request' ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={onClick}
            className="w-32"
            disabled={disabled}
          >
            Request Boost
          </Button>
        ) : (
          <Badge
            variant={status === 'approved' ? 'success' : 'secondary'}
            className={`w-32 py-2 flex justify-center bg-yellow-6000 ${status === 'approved' ? 'bg-green-900 text-white' : ' bg-yellow-600 text-white'}`}
          >
            {status === 'approved' ? 'Approved' : 'Pending'}
          </Badge>
        )
        }
      </div >
    )
  }

  const PaymentMethodCard = ({ title, icon: Icon, transactions, successRate, change }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer">
          {title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Total: {transactions.toLocaleString()}</div>
        <div className="text-lg font-medium">Success: {Math.round(transactions * successRate / 100).toLocaleString()}</div>
        <Progress value={successRate} className="mt-2" />
        <p className="text-xs text-muted-foreground mt-1">
          Success Rate: {successRate}% ({change > 0 ? '+' : ''}{change}% from last month)
        </p>
      </CardContent>
    </Card>
  )

  const paymentMethods = [
    { title: 'Card', icon: CreditCard, transactions: 12234, successRate: 94.0, change: 5.2 },
    { title: 'UPI', icon: ScanLine, transactions: 5000, successRate: 96.0, change: 3.8 },
    { title: 'UPI-Autopay', icon: Users, transactions: 4000, successRate: 90.0, change: 2.5 },
    { title: 'Netbanking', icon: DollarSign, transactions: 3234, successRate: 92.8, change: 4.1 },
    { title: 'Wallets', icon: Wallet, transactions: 2500, successRate: 95.5, change: 6.2 },
    { title: 'Card-Recurring', icon: Smartphone, transactions: 1800, successRate: 93.2, change: 3.9 },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Success Rate Booster</h1>
        <Button variant="outline" onClick={() => router.push('/srfdashboard')}>
          SRF Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Attention!</AlertTitle>
        <AlertDescription>
          Our system have detected potential for improvement in your UPI and International payment success rates. Consider boosting these methods for better performance.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paymentMethods.map((method) => (
          <PaymentMethodCard key={method.title} {...method} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Existing vs Predicted Success Rate</CardTitle>
          <CardDescription>Comparison of current and potential success rates across all payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
            <Chart />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="card">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {paymentMethods.map((method) => (
            <TabsTrigger key={method.title} value={method.title.toLowerCase().replace(' ', '-')}>
              {method.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {paymentMethods.map((method) => (
          <TabsContent key={method.title} value={method.title.toLowerCase().replace(' ', '-')}>
            <Card>
              <CardHeader>
                <CardTitle>{method.title}</CardTitle>
                <CardDescription>Detailed success rate information and boost options</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold">Total Transactions: {method.transactions.toLocaleString()}</div>
                  <div className="text-lg font-medium text-green-600">Success Rate: {method.successRate}%</div>
                  <p className="text-sm text-muted-foreground">
                    {method.change > 0 ? '+' : ''}{method.change}% from last month
                  </p>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <FlagButton
                      label="Native OTP Support"
                      status={boostRequestStatus === "pending" ? "pending" : "request"} 
                      onClick={() => handleRequestBoost(`${method.title} - Optimize Routing`)}
                    />
                    <FlagButton
                      label="Tokenization"
                      status="approved"
                    />
                    <FlagButton
                      label="Dynamic Routing"
                      status="approved"
                      onClick={() => console.log(`${method.title} - AI-Powered Fraud Detection activated`)}
                      disabled={true}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Success Rate Trend
                  </h4>
                  <LineCharts />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Implement 3D Secure 2.0 for all card transactions to reduce fraud and increase authorization rates.</li>
            <li>Optimize your payment routing algorithm to choose the most reliable payment processors in real-time.</li>
            <li>Set up automatic retries for failed transactions, especially for UPI and mobile payments.</li>
            <li>Implement dynamic currency conversion for international payments to improve the customer experience.</li>
            <li>Use machine learning models to detect and prevent fraudulent transactions before they occur.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default SrBooster