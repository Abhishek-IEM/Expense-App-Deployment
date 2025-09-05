import { Progress } from "antd";

const Analytics = ({ allTransaction }) => {
  const categories = [
    "salary",
    "subscription",
    "project",
    "food",
    "movie",
    "bills",
    "fee",
    "medical",
  ];

  // Total transactions
  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );

  // prevent NaN by checking totalTransaction > 0
  const totalIncomePercent =
    totalTransaction > 0
      ? (totalIncomeTransactions.length / totalTransaction) * 100
      : 0;
  const totalExpensePercent =
    totalTransaction > 0
      ? (totalExpenseTransactions.length / totalTransaction) * 100
      : 0;

  // Total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // prevent NaN by checking totalTurnover > 0
  const totalIncomeTurnoverPercent =
    totalTurnover > 0 ? (totalIncomeTurnover / totalTurnover) * 100 : 0;
  const totalExpenseTurnoverPercent =
    totalTurnover > 0 ? (totalExpenseTurnover / totalTurnover) * 100 : 0;

  return (
    <>
      <div className="row m-3 analytics">
        {/* Total Transactions */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              Total Transactions : {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTransactions.length}
              </h5>
              <div className="d-flex flex-column align-items-center">
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2 mt-3"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Turnover */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">Total TurnOver : {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income : {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense : {totalExpenseTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2 mt-3"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categorywise Income */}
        <div className="col-md-3">
          <h6 className="bg-dark p-2 text-light">Categorywise Income</h6>
          <div className="category-container overflow-auto">
            {categories.map((category) => {
              const amount = allTransaction
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);

              const percent =
                totalIncomeTurnover > 0
                  ? ((amount / totalIncomeTurnover) * 100).toFixed(0)
                  : 0;

              return (
                amount > 0 && (
                  <div className="card mt-2" key={category}>
                    <div className="card-body">
                      <h6>{category}</h6>
                      <Progress percent={percent} />
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>

        {/* Categorywise Expense */}
        <div className="col-md-3">
          <h6 className="bg-warning p-2 text-light">Categorywise Expense</h6>
          <div className="category-container overflow-auto ">
            {categories.map((category) => {
              const amount = allTransaction
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);

              const percent =
                totalExpenseTurnover > 0
                  ? ((amount / totalExpenseTurnover) * 100).toFixed(0)
                  : 0;

              return (
                amount > 0 && (
                  <div className="card mt-2" key={category}>
                    <div className="card-body">
                      <h6>{category}</h6>
                      <Progress percent={percent} />
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
