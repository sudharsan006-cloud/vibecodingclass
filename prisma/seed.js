const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  // Create User
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@finage.ai',
    },
  })
  console.log(`Created user with id: ${user.id}`)

  // Create Accounts
  const bankAcc = await prisma.account.create({
    data: { userId: user.id, type: 'bank', name: 'HDFC Checking', balance: 145000 },
  })
  const stockAcc = await prisma.account.create({
    data: { userId: user.id, type: 'stock', name: 'Zerodha Kite', balance: 850000 },
  })
  const cryptoAcc = await prisma.account.create({
    data: { userId: user.id, type: 'crypto', name: 'Binance', balance: 120000 },
  })
  const creditCard = await prisma.account.create({
    data: { userId: user.id, type: 'credit_card', name: 'Amex Platinum', balance: -45000 },
  })

  // Create Transactions (mocking last 30 days)
  const now = new Date()
  const daysAgo = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

  const transactions = [
    { accountId: bankAcc.id, date: daysAgo(2), amount: -1500, category: 'Dining', merchant: 'Swiggy', type: 'debit' },
    { accountId: bankAcc.id, date: daysAgo(5), amount: -4000, category: 'Groceries', merchant: 'Instamart', type: 'debit' },
    { accountId: bankAcc.id, date: daysAgo(10), amount: 120000, category: 'Salary', merchant: 'Acme Corp', type: 'credit' },
    { accountId: creditCard.id, date: daysAgo(15), amount: -2500, category: 'Subscriptions', merchant: 'Netflix', type: 'debit' },
    { accountId: creditCard.id, date: daysAgo(18), amount: -12000, category: 'Travel', merchant: 'MakeMyTrip', type: 'debit' },
    { accountId: bankAcc.id, date: daysAgo(20), amount: -25000, category: 'Rent', merchant: 'Landlord', type: 'debit' },
    { accountId: bankAcc.id, date: daysAgo(25), amount: -10000, category: 'Investment', merchant: 'Zerodha', type: 'debit' },
  ]

  for (const t of transactions) {
    await prisma.transaction.create({ data: t })
  }

  // Create Holdings
  const holdings = [
    { accountId: stockAcc.id, symbol: 'RELIANCE', quantity: 50, avgPrice: 2400, currentPrice: 2600, assetClass: 'Equity' },
    { accountId: stockAcc.id, symbol: 'HDFCBANK', quantity: 100, avgPrice: 1500, currentPrice: 1450, assetClass: 'Equity' },
    { accountId: cryptoAcc.id, symbol: 'BTC', quantity: 0.05, avgPrice: 4500000, currentPrice: 5200000, assetClass: 'Crypto' },
    { accountId: cryptoAcc.id, symbol: 'ETH', quantity: 1.5, avgPrice: 250000, currentPrice: 280000, assetClass: 'Crypto' },
  ]

  for (const h of holdings) {
    await prisma.holding.create({ data: h })
  }

  // Create Health Score Snapshots (historical trend)
  const scores = [
    { userId: user.id, date: daysAgo(90), savingsRate: 25, emergencyFundMonths: 3, diversificationScore: 60, debtRatio: 35, liquidityScore: 70, overallScore: 65 },
    { userId: user.id, date: daysAgo(60), savingsRate: 28, emergencyFundMonths: 4, diversificationScore: 65, debtRatio: 30, liquidityScore: 75, overallScore: 72 },
    { userId: user.id, date: daysAgo(30), savingsRate: 30, emergencyFundMonths: 5, diversificationScore: 70, debtRatio: 28, liquidityScore: 80, overallScore: 78 },
    { userId: user.id, date: now, savingsRate: 32, emergencyFundMonths: 6, diversificationScore: 75, debtRatio: 25, liquidityScore: 85, overallScore: 84 },
  ]

  for (const s of scores) {
    await prisma.healthScoreSnapshot.create({ data: s })
  }

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
