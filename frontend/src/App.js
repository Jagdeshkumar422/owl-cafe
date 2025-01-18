import React, { Suspense, useLayoutEffect,useEffect } from "react";
import { BrowserRouter as Router, Route, withRouter , useLocation} from "react-router-dom";
import { initGA, logPageView } from "./analytics";

// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// Pages
/*const Home = React.lazy(() => import("./components/pages/Home"));
const Hometwo = React.lazy(() => import("./components/pages/Hometwo"));
const Homethree = React.lazy(() => import("./components/pages/Homethree"));
const Homefour = React.lazy(() => import("./components/pages/Homefour"));
const Bloggrid = React.lazy(() => import("./components/pages/Bloggrid"));
const Bloglist = React.lazy(() => import("./components/pages/Bloglist"));
const Blogmasonry = React.lazy(() => import("./components/pages/Blogmasonry"));
const Blogfull = React.lazy(() => import("./components/pages/Blogfull"));
const Blogsingle = React.lazy(() => import("./components/pages/Blogsingle"));
const About = React.lazy(() => import("./components/pages/About"));
const Login = React.lazy(() => import("./components/pages/Login"));
const Register = React.lazy(() => import("./components/pages/Register"));
const Checkout = React.lazy(() => import("./components/pages/Checkout"));
const Cart = React.lazy(() => import("./components/pages/Cart"));
const Legal = React.lazy(() => import("./components/pages/Legal"));
const Error = React.lazy(() => import("./components/pages/Error"));
const Menuone = React.lazy(() => import("./components/pages/Menuone"));
const Menutwo = React.lazy(() => import("./components/pages/Menutwo"));
const Menuitemone = React.lazy(() => import("./components/pages/Menuitemone"));
const Menuitemtwo = React.lazy(() => import("./components/pages/Menuitemtwo"));
const Locations = React.lazy(() => import("./components/pages/Locations"));*/
const Contact = React.lazy(() =>
  import("./components/sections/contact/Content")
);
//const Blogfull = React.lazy(() => import("./components/pages/Blogfull"));
const Blogsingle = React.lazy(() => import("./components/pages/Blogsingle"));
const Home = React.lazy(() => import("./components/pages/Home"));
const Menuone = React.lazy(() => import("./components/pages/Menuone"));
const Menuitemone = React.lazy(() => import("./components/pages/Menuitemone"));
const AddBanner = React.lazy(() => import("./components/adminDashboard/AddBanner/AddBanner"));
const AddCategory = React.lazy(() => import("./components/adminDashboard/AddCategory/AddCategory"));
const Addmenu = React.lazy(() => import("./components/adminDashboard/AddMenu/Addmenu"));
const Login = React.lazy(() => import("./components/adminDashboard/login/Login"));

const ScrollToTop = withRouter(({ children, location: { pathname } }) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
});

function App() {
  const location = useLocation();

  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  useEffect(() => {
    logPageView();
  }, [location]);

  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <ScrollToTop>
          <Preloader />
          <Route exact path="/" component={Home} />
          <Route path="/error" component={Error} />
          <Route path="/menu-v1" component={Menuone} />
          <Route path="/admin/addbanner" component={AddBanner} />
          <Route path="/admin/addcategory" component={AddCategory} />
          <Route path="/admin/addmenu" component={Addmenu} />
          <Route path="/login" component={Login} />
          <Route
            path="/menu-item-v1/:id"
            exact
            component={(props) => (
              <Menuitemone {...props} key={window.location.pathname} />
            )}
          />
          <Route path="/contact" component={Contact} />
          <Route
            path="/blogsingle/:id"
            exact
            component={(props) => (
              <Blogsingle {...props} key={window.location.pathname} />
            )}
          />
          
        </ScrollToTop>
      </Suspense>
    </Router>
  );
}

export default App;
