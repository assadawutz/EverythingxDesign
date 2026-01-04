/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Page Imports
import HomePage from "./components/pages/HomePage";
import KnowledgeListPage from "./components/pages/KnowledgeListPage";
import NewsListPage from "./components/pages/NewsListPage";
import NewsDetailPage from "./components/pages/NewsDetailPage";
import ActivityListPage from "./components/pages/ActivityListPage";
import ActivityDetailPage from "./components/pages/ActivityDetailPage";
import CareerListPage from "./components/pages/CareerListPage";
import CareerDetailPage from "./components/pages/CareerDetailPage";
import ProcurementListPage from "./components/pages/ProcurementListPage";
import ProcurementDetailPage from "./components/pages/ProcurementDetailPage";
import ComplaintPage from "./components/pages/ComplaintPage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";

export type PageRoute =
  | "HOME"
  | "KNOWLEDGE"
  | "NEWS"
  | "NEWS_DETAIL"
  | "ACTIVITY"
  | "ACTIVITY_DETAIL"
  | "CAREER"
  | "CAREER_DETAIL"
  | "PROCUREMENT"
  | "PROCUREMENT_DETAIL"
  | "COMPLAINT"
  | "ABOUT"
  | "CONTACT";

const App: React.FC = () => {
  const [route, setRoute] = useState<PageRoute>("HOME");
  const [detailId, setDetailId] = useState<string | number | null>(null);

  const navigate = (newRoute: PageRoute, id?: string | number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setRoute(newRoute);
    if (id) setDetailId(id);
  };

  const renderPage = () => {
    switch (route) {
      case "HOME":
        return <HomePage onNavigate={navigate} />;
      case "KNOWLEDGE":
        return <KnowledgeListPage onNavigate={navigate} />;

      case "NEWS":
        return <NewsListPage onNavigate={navigate} />;
      case "NEWS_DETAIL":
        return <NewsDetailPage id={detailId} onNavigate={navigate} />;

      case "ACTIVITY":
        return <ActivityListPage onNavigate={navigate} />;
      case "ACTIVITY_DETAIL":
        return <ActivityDetailPage id={detailId} onNavigate={navigate} />;

      case "CAREER":
        return <CareerListPage onNavigate={navigate} />;
      case "CAREER_DETAIL":
        return <CareerDetailPage id={detailId} onNavigate={navigate} />;

      case "PROCUREMENT":
        return <ProcurementListPage onNavigate={navigate} />;
      case "PROCUREMENT_DETAIL":
        return <ProcurementDetailPage id={detailId} onNavigate={navigate} />;

      case "COMPLAINT":
        return <ComplaintPage onNavigate={navigate} />;
      case "ABOUT":
        return <AboutPage onNavigate={navigate} />;
      case "CONTACT":
        return <ContactPage onNavigate={navigate} />;

      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-[#333]">
      <Header onNavigate={navigate} currentRoute={route} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
