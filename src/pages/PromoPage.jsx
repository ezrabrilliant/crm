import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import { RefreshCw } from "lucide-react";
import ErrorAlert from "../components/ErrorAlert";
import SearchBar from "../components/SearchBar";
import PromoTable from "../components/promo/PromoTable";
import PromoSummary from "../components/promo/PromoSummary";
import Loader from "../components/Loader";

export default function PromoPage() {
  const [promos, setPromos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/promos");
      setPromos(res.data);
    } catch (err) {
      setError("Failed to load promo data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => fetchPromos();

  const summary = {
    total: promos.length,
    pending: promos.filter(p => p.status === "Pending").length,
    active: promos.filter(p => p.status === "Accepted" && !p.used).length,
    used: promos.filter(p => p.status === "Accepted" && p.used).length,
    rejected: promos.filter(p => p.status === "Rejected").length,
  };

  const filteredPromos = promos.filter(p => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term ||
      p.customer.toLowerCase().includes(term) ||
      p.promoCode?.toLowerCase().includes(term) ||
      p.id.toString().includes(term);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "pending" && p.status === "Pending") ||
      (statusFilter === "active" && p.status === "Accepted" && !p.used) ||
      (statusFilter === "used" && p.status === "Accepted" && p.used) ||
      (statusFilter === "rejected" && p.status === "Rejected");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Promo Management</h1>

      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      <PromoSummary summary={summary} />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar
            term={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by customer, code or ID..."
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="used">Used</option>
            <option value="rejected">Rejected</option>
          </select>
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            className="bg-gray-500 hover:bg-gray-600"
          >
            {isLoading ? <Loader size="sm" /> : <span className="flex items-center"><RefreshCw className="w-5 h-5 mr-1" />Refresh</span>}
          </Button>
        </div>

      <Card>
        <CardContent>
          {isLoading ? (
            <Loader size="lg" />
          ) : (
            <PromoTable
              promos={filteredPromos}
              onApprove={async id => {/* implement */}}
              onReject={async id => {/* implement */}}
              onMarkUsed={async id => {/* implement */}}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
