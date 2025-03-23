import React, { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Card from "../components/Card";
import data from "../data/data.json";

export default function DashboardPage() {
  // Simulasikan database dengan useState
  const [customers, setCustomers] = useState(data.customers);
  const [products, setProducts] = useState(data.products);
  const [promos, setPromos] = useState(data.promos);

  // State untuk modal update promo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPromo, setEditPromo] = useState(null);

  // Buka modal dengan data promo yang akan diupdate
  const openEditModal = (promo) => {
    setEditPromo(promo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditPromo(null);
    setIsModalOpen(false);
  };

  // Update promo di state
  const handlePromoUpdate = (e) => {
    e.preventDefault();
    const updatedPromos = promos.map((promo) =>
      promo.id === editPromo.id ? editPromo : promo
    );
    setPromos(updatedPromos);
    closeModal();
  };

  // Hitung total
  const totalSpent = customers.reduce((sum, cust) => sum + cust.totalSpent, 0);
  const totalPurchases = customers.reduce((sum, cust) => sum + cust.purchases, 0);
  const totalPurchasedProducts = products.reduce(
    (sum, prod) => sum + prod.totalPurchased,
    0
  );
  const totalPromos = promos.length;

  // Cari promo terbaru yang diterima untuk Customer A
  const recentAcceptedPromo = promos.find(
    (promo) => promo.customer === "Customer A" && promo.status === "Accepted"
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card: Recent Accepted Promo untuk Customer A */}
        <Card>
          <div className="mb-2 font-semibold">Recent Accepted Promo</div>
          {recentAcceptedPromo ? (
            <div>
              <p>Customer: {recentAcceptedPromo.customer}</p>
              <p>Promo Code: {recentAcceptedPromo.promoCode}</p>
              <p>Status: {recentAcceptedPromo.status}</p>
              <Button onClick={() => openEditModal(recentAcceptedPromo)}>
                Update Promo
              </Button>
            </div>
          ) : (
            <p>No accepted promo for Customer A</p>
          )}
        </Card>
        {/* Card: Total Spent & Purchases */}
        <Card>
          <div className="mb-2 font-semibold">Customer Overview</div>
          <p>Total Spent: ${totalSpent}</p>
          <p>Total Purchases: {totalPurchases}</p>
        </Card>
        {/* Card: Total Purchased Product */}
        <Card>
          <div className="mb-2 font-semibold">Product Overview</div>
          <p>Total Purchased Products: {totalPurchasedProducts}</p>
        </Card>
        {/* Card: Total Promo Created */}
        <Card>
          <div className="mb-2 font-semibold">Promo Overview</div>
          <p>Total Promos Created: {totalPromos}</p>
        </Card>
      </div>

      {/* Modal untuk update promo */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {editPromo && (
          <form onSubmit={handlePromoUpdate}>
            <h2 className="text-xl font-bold mb-4">Update Promo</h2>
            <div className="mb-4">
              <label className="block mb-1">Promo Code:</label>
              <input
                type="text"
                value={editPromo.promoCode}
                onChange={(e) =>
                  setEditPromo({ ...editPromo, promoCode: e.target.value })
                }
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Status:</label>
              <select
                value={editPromo.status}
                onChange={(e) =>
                  setEditPromo({ ...editPromo, status: e.target.value })
                }
                className="border p-2 w-full"
              >
                <option value="Accepted">Accepted</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={closeModal} className="mr-2">
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
