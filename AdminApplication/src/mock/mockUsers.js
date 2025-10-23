export const mockUsers = [
  {
    id: 1,
    userName: "Joe Bakugan Yu-gi-oh",
    balance: 245.5,
    depositLimit: 500,
    activeStatus: true,
    transactions: [
      { transactionId: 1, transactionDate: "2025-10-20", amount: -20, gameName: "Crash" },
      { transactionId: 2, transactionDate: "2025-10-21", amount: 50, gameName: "Coinflip" },
    ],
    deposits: [
      { depositId: 5, depositDate: "2025-10-19", amount: 100 },
      { depositId: 6, depositDate: "2025-10-22", amount: 200 },
    ],
  },
  {
    id: 2,
    userName: "Kirihiri NejmedLegTand",
    balance: 120.0,
    depositLimit: 300,
    activeStatus: false,
    transactions: [
      { transactionId: 3, transactionDate: "2025-10-18", amount: -30, gameName: "Coinflip" },
      { transactionId: 4, transactionDate: "2025-10-20", amount: 60, gameName: "Slots" },
      { transactionId: 5, transactionDate: "2025-10-20", amount: 60, gameName: "Slots" },
      { transactionId: 6, transactionDate: "2025-10-20", amount: 60, gameName: "Slots" },
    ],
    deposits: [
      { depositId: 7, depositDate: "2025-10-15", amount: 150 },
    ],
  },
];
