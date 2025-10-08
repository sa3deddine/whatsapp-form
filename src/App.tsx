

import React from 'react';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="form-container">
          <AuthForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;