def monthlyStats(marketValue, predictedPrice, numYears):
    # monthly payments
    # python 3 auto float division

    monthlyStats = {}
    
    monthlyStats['monthlyPayments'] = marketValue / (numYears * 12)

    # calculate monthly revenue, assuming renting out on airbnb 365 days per year and always occupied
    monthlyStats['yearlyRevenue'] = predictedPrice * 365
    monthlyStats['monthlyRevenue'] = monthlyStats['yearlyRevenue'] / 12
    monthlyStats['monthlyProfit'] = monthlyStats['monthlyRevenue'] - monthlyStats['monthlyPayments']
    monthlyStats['yearlyProfit'] =  monthlyStats['monthlyProfit'] * 12
    return monthlyStats
