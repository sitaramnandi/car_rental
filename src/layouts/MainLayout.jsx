import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileTabBar from "../components/MobileTabBar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream dark:bg-navy-950">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>
      <MobileTabBar />
    </div>
  );
}
