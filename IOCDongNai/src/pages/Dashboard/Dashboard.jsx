import React from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <Footer />
    </div>
  );
}

export default Dashboard;
