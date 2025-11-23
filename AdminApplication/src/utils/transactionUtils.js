// Funktion der grupper transactions efter spilnavn og sorter dem efter dato
export const processTransactionsByGame = (transactions, gameName) => {

  // 7 dages filter
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Samme parseDate som total chart bruger
  const parseDate = (dateStr) => {
    if (dateStr.includes('-')) return new Date(dateStr); // YYYY-MM-DD
    const [day, month, year] = dateStr.split('/');       // DD/MM/YYYY
    return new Date(`${year}-${month}-${day}`);
  };

  // Filtrer kun relevante transactioner
  const filtered = transactions.filter(
    (t) =>
      t.gameName.toLowerCase() === gameName.toLowerCase() &&
      parseDate(t.date) >= sevenDaysAgo
  );

  // Samler earnings per dato
  const earningsByDate = {};

  filtered.forEach((t) => {
    const jsDate = parseDate(t.date);

    // Brug ISO format her ellers virker det ikke korrekt til sortering
    const isoDate = jsDate.toISOString().split("T")[0]; // YYYY-MM-DD

    if (earningsByDate[isoDate]) {
      earningsByDate[isoDate] += -t.amount;
    } else {
      earningsByDate[isoDate] = -t.amount;
    }
  });

  // Returner samme stil som total chart
  return Object.entries(earningsByDate)
    .map(([date, earnings]) => ({
      date,        // YYYY-MM-DD
      earnings,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};


// Funktion til at beregne total indtjening i en chart
export const processTotalEarnings = (transactions) => {
  // 7 dages filter
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const parseDate = (dateStr) => {
    if (dateStr.includes('-')) return new Date(dateStr);
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  // Filtrer kun transaktioner fra de sidste 7 dage
  const recentTransactions = transactions.filter(
    (t) => parseDate(t.date) >= sevenDaysAgo
  );

  // Samler indtjening per dato
  const earningsByDate = {};
  recentTransactions.forEach((t) => {
    if (earningsByDate[t.date]) {
      earningsByDate[t.date] += -t.amount;
    } else {
      earningsByDate[t.date] = -t.amount;
    }
  });

  return Object.entries(earningsByDate)
    .map(([date, total]) => ({
      date,
      earnings: total,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

// Funktion til at beregne site summary data
export const calculateSiteSummary = (transactions, users) => {
  // 7 dages indtjening
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const parseDate = (dateStr) => {
    if (dateStr.includes('-')) return new Date(dateStr);
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  };
  // Filtrer for kun de sidste 7 dages transaktioner
  const transactionsLast7Days = transactions.filter
    ((t) => parseDate(t.date) >= sevenDaysAgo);

  // Samlet antal brugere
  const totalUsers = users.length;

  // samlet antal transaktioner de sidste 7 dage
  const totalTransactionsLast7Days = transactionsLast7Days.length;

  // Samlet indtjening de sidste 7 dage
  const totalEarningsLast7Days = transactionsLast7Days.reduce
    ((sum, t) => sum + -t.amount, 0);

  return {
    totalUsers,
    totalTransactionsLast7Days,
    totalEarningsLast7Days
  };

}
