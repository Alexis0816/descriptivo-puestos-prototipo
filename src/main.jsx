import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';
import './dp-form.css';
import './guide-extras.css';
import './workspace.css';
import './compact.css';
import './form-layout.css';
import './guide-workspace.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><HashRouter><App /></HashRouter></React.StrictMode>);
