import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import Navigation from './components/Navigation/Navigation';
import BreadcrumbBar from './components/BreadcrumbBar/BreadcrumbBar';
import Footer from './components/Footer/Footer';
import Strategies from './pages/Strategies/Strategies';
import Models from './pages/Models/Models';
import ModelDetail from './pages/Models/ModelDetail';
import AddModels from './pages/Models/AddModels';
import ReviewNewModel from './pages/Models/ReviewNewModel';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminOverview from './pages/Admin/AdminOverview';
import ModelFamilies from './pages/Admin/ModelFamilies';
import './App.css';

const getBreadcrumbs = (pathname: string) => {
  const breadcrumbs = [];
  
  if (pathname.startsWith('/models')) {
    if (pathname === '/models') {
      breadcrumbs.push({ label: 'Models' });
    } else if (pathname === '/models/add') {
      breadcrumbs.push({ label: 'Models', href: '/models' });
      breadcrumbs.push({ label: 'Add Models' });
    } else if (pathname.match(/^\/models\/review\/[^/]+$/)) {
      breadcrumbs.push({ label: 'Models', href: '/models' });
      breadcrumbs.push({ label: 'Manage Strategies' });
      breadcrumbs.push({ label: 'Review Models' });
      breadcrumbs.push({ label: 'BlackRock Core Equity' });
    } else if (pathname.match(/^\/models\/[^/]+$/)) {
      breadcrumbs.push({ label: 'Models', href: '/models' });
      breadcrumbs.push({ label: 'Model Details' });
    }
  } else if (pathname.startsWith('/strategies')) {
    breadcrumbs.push({ label: 'Models', href: '/models' });
    breadcrumbs.push({ label: 'Strategies' });
  } else if (pathname === '/approvals') {
    breadcrumbs.push({ label: 'Dashboard', href: '/' });
    breadcrumbs.push({ label: 'Approvals' });
  } else if (pathname === '/admin') {
    breadcrumbs.push({ label: 'Admin Dashboard' });
  } else if (pathname === '/admin/overview') {
    breadcrumbs.push({ label: 'Admin Overview' });
  } else if (pathname === '/admin/model-families') {
    breadcrumbs.push({ label: 'Admin', href: '/admin/overview' });
    breadcrumbs.push({ label: 'Model Families' });
  } else if (pathname === '/') {
    breadcrumbs.push({ label: 'Dashboard' });
  }
  
  return breadcrumbs;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);
  
  return (
    <div className="App">
      <Navigation />
      <BreadcrumbBar breadcrumbs={breadcrumbs} />
      <main className="main-content">
        <Switch>
          <Route path="/admin/model-families" component={ModelFamilies} />
          <Route path="/admin/overview" component={AdminOverview} />
          <Route path="/approvals" component={AdminDashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/models/review/:modelId" component={ReviewNewModel} />
          <Route path="/models/add" component={AddModels} />
          <Route path="/models/:modelId" component={ModelDetail} />
          <Route path="/models" component={Models} />
          <Route path="/strategies" component={Strategies} />
          <Route path="/" exact component={AdminOverview} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <Router>
        <AppContent />
      </Router>
    </NotificationProvider>
  );
}

export default App;