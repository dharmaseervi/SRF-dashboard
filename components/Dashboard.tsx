'use client'

import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Piechart } from './Piechart'
import { ArrowRightIcon, BarChart3Icon, PieChartIcon, TrendingUpIcon } from 'lucide-react'
import TransactionCards from './Transcationcard'
import { LineCharts } from './LineChart'
import { PiechartCount } from './piechartcount'
import { Separator } from '@/components/ui/separator'


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)

export default function Dashboard() {
    const router = useRouter()
    const [paymentData, setPaymentData] = useState({
        card: { attempts: 100, success: 80, failed: 20 },
        upi: { attempts: 100, success: 90, failed: 10 },
        netbanking: { attempts: 100, success: 70, failed: 30 },
        other: { attempts: 100, success: 85, failed: 15 }
    })

    const calculateTotalSuccessRate = () => {
        const totalAttempts = Object.values(paymentData).reduce((sum, method) => sum + method.attempts, 0)
        const totalSuccess = Object.values(paymentData).reduce((sum, method) => sum + method.success, 0)
        return ((totalSuccess / totalAttempts) * 100).toFixed(1)
    }

    const calculateTotalAttempts = () => {
        return Object.values(paymentData).reduce((sum, method) => sum + method.attempts, 0)
    }

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Sr Dashboard</h1>
                <Button onClick={() => router.push('./srbooster')} variant="outline">
                    Sr Maximiser
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
            </div>

            <Separator className="my-6" />

            <TransactionCards />

            <div className="grid grid-cols-4 gap-6">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                            <TrendingUpIcon className="mr-2 h-5 w-5" />
                            Revenue Trends
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LineCharts />
                    </CardContent>
                </Card>

                <Card className='col-span-2 justify-center items-center flex flex-col'>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                            <PieChartIcon className=" h-5 w-5" />
                            Payment Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full max-w-xs ">
                            <PiechartCount />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                        <BarChart3Icon className="mr-2 h-5 w-5" />
                        Payment Success Overview
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="w-full max-w-xs ">
                        <Piechart />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">Attempts Overview</h3>
                        {Object.entries(paymentData).map(([method, data]) => (
                            <div key={method} className="flex justify-between items-center">
                                <span className="capitalize text-gray-600">{method}:</span>
                                <span className="text-sm">
                                    <span className="text-gray-500">{data.attempts} attempts</span> •{' '}
                                    <span className="text-green-600">{data.success} success</span> •{' '}
                                    <span className="text-red-500">{data.failed} failed</span>
                                </span>
                            </div>
                        ))}
                        <Separator />
                        <div className="pt-2">
                            <p className="text-sm text-gray-600">
                                Overall success rate:{' '}
                                <span className="font-semibold text-green-600">{calculateTotalSuccessRate()}%</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Total payment attempts:{' '}
                                <span className="font-semibold">{calculateTotalAttempts()}</span>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}