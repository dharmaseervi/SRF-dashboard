'use client'
import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Chart } from 'chart.js';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Piechart } from './Piechart';
import { ArrowBigRightDashIcon } from 'lucide-react';
import TransactionCards from './Transcationcard';
import { LineCharts } from './LineChart';
import { PiechartCount } from './piechartcount';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

function Dashboard() {
    const router = useRouter();
    const [paymentData, setPaymentData] = useState({
        card: { attempts: 100, success: 80, failed: 20 },
        upi: { attempts: 100, success: 90, failed: 10 },
        netbanking: { attempts: 100, success: 70, failed: 30 },
        other: { attempts: 100, success: 85, failed: 15 }
    });

    const calculateTotalSuccessRate = () => {
        const totalAttempts = paymentData.card.attempts + paymentData.upi.attempts + paymentData.netbanking.attempts + paymentData.other.attempts;
        const totalSuccess = paymentData.card.success + paymentData.upi.success + paymentData.netbanking.success + paymentData.other.success;
        return ((totalSuccess / totalAttempts) * 100).toFixed(1);
      };
      
      const calculateTotalAttempts = () => {
        return paymentData.card.attempts + paymentData.upi.attempts + paymentData.netbanking.attempts + paymentData.other.attempts;
      };
      

    return (
        <div className='p-5'>
            {/* Header */}
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-3xl font-bold'>Sr Dashboard</h1>
                <Button onClick={() => router.push('./srbooster')} >
                    Sr Maximiser
                    <ArrowBigRightDashIcon />
                </Button>
            </div>

            {/* Grid for payment methods */}
            <TransactionCards />

            {/* Line Chart for Revenue Trends */}
            <Card className='grid grid-cols-2 gap-4 p-5 justify-center my-2 '>
                <CardContent className='col-span-1'>
                    <div>
                        <LineCharts />
                    </div>
                </CardContent>
                <CardContent className='col-span-1 w-full h-full'>
                    <div className='w-full h-full mx-auto'>
                        <PiechartCount />
                    </div>
                </CardContent>
            </Card>

            {/* Pie Chart for Payment Success */}
            <Card className="grid grid-cols-2 gap-6 p-5">
                {/* Pie Chart Section */}
                <CardContent className="col-span-1">
                    <div className="w-full max-w-xs mx-auto">
                        <Piechart />
                    </div>
                </CardContent>

                {/* Attempts Overview Section */}
                <CardContent className="col-span-1 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold mb-4 text-center">Attempts Overview</h2>

                    <div className="space-y-3">
                        {['card', 'upi', 'netbanking', 'other'].map((method) => (
                            <div key={method} className="flex justify-between items-center">
                                <p className="capitalize text-gray-700">{method.charAt(0).toUpperCase() + method.slice(1)}:</p>
                                <p className="text-gray-600">
                                    {paymentData[method].attempts} attempts &bull;{' '}
                                    <span className="text-green-600">{paymentData[method].success} success</span> &bull;{' '}
                                    <span className="text-red-500">{paymentData[method].failed} failed</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500 text-sm">
                            Overall success rate: <span className="text-green-600">{calculateTotalSuccessRate()}%</span>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Total payment attempts: <span className="text-gray-700">{calculateTotalAttempts()}</span>
                        </p>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

export default Dashboard;
