import { useState, useEffect } from "react";
import { getSummary } from "../api/transactions";
import CategoryPieChart from "../component/transactions/charts/CategoryPieChart";
import ExpenseTrendChart from "../component/transactions/charts/ExpenseTrendChart";
import Spinner from "../component/ui/Spinner";

const Dashboard = () => {
  const [summary, setSummary] = useState({ byCategory: [], byDate: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await getSummary();
        setSummary(data);
      } catch (error) {
        console.error("Failed to load summary", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <Spinner fullScreen={false} size={64} />;;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Financial Overview</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
          <CategoryPieChart data={summary.byCategory} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Expense Trends</h2>
          <ExpenseTrendChart data={summary.byDate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
