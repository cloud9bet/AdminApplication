  // Funktion der grupper transactions efter spilnavn og sorter dem efter dato
  export const processTransactionsByGame = (transactions, gameName) => {
    return transactions
      .filter(t => t.gameName === gameName) // Går igennem tranactions og filtrere efter spilnavn
      .map(t => ({ // Tager hver filtreret transaction og laver et nyt objekt med dato og indtjening
        date: t.date,
        earnings: t.amount
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Tilføjet så der korrekt sortering til grafer
  };


  // Funktion til at beregne total indtjening i en chart
  export const processTotalEarnings = (transactions) => {
    const earningsByDate = {};
    transactions.forEach(t => { // Samler indtjening per dato 
      if (earningsByDate[t.date]) {
        earningsByDate[t.date] += t.amount;
      } else {
        earningsByDate[t.date] = t.amount;
      }
    });

    return Object.entries(earningsByDate) // Tager hver filtreret transaction og laver et nyt objekt med dato og indtjening
      .map(([date, total]) => ({
        date,
        earnings: total
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Tilføjet så der korrekt sortering til grafer
  };