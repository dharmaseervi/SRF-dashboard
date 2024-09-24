import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Wallet, Banknote, Smartphone } from "lucide-react"

// Mock data for demonstration
const transactionData = [
  { method: "UPI", icon: Smartphone, successful: 1200, failed: 50, color: "text-green-500" },
  { method: "Card", icon: CreditCard, successful: 800, failed: 30, color: "text-blue-500" },
  { method: "Net Banking", icon: Banknote, successful: 500, failed: 20, color: "text-yellow-500" },
  { method: "Wallet", icon: Wallet, successful: 300, failed: 10, color: "text-purple-500" },
]

function TransactionCard({ method, icon: Icon, successful, failed, color }) {
  const total = successful + failed
  const successRate = (successful / total) * 100

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{method}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
        <p className="text-xs text-muted-foreground">Total Transactions</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span>Successful</span>
            <span className="font-medium text-green-600">{successful}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Failed</span>
            <span className="font-medium text-red-600">{failed}</span>
          </div>
          <Progress value={successRate} className="h-2" />
          <div className="text-right text-xs font-medium">{successRate.toFixed(2)}% Success Rate</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TransactionCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {transactionData.map((data) => (
        <TransactionCard key={data.method} {...data} />
      ))}
    </div>
  )
}