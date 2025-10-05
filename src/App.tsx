

import React from 'react';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AuthForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;