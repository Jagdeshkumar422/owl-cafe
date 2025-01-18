// src/analytics.js
import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-XHSYQTB1WH');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
