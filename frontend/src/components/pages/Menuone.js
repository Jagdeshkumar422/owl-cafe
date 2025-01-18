import React, { Component, Fragment } from 'react';

import Footer from '../layouts/Footer';
import Content from '../sections/menu-v1/Content';

//const pagelocation = 'Menu v1'

class Menuone extends Component {
    render() {
        return (
            <Fragment>

                {/*<Header/>*/}
                {/*<Breadcrumbs breadcrumb={{ pagename: pagelocation }} />*/}
                <Content/>
                {/*<Footer footer={{ style:"ct-footer footer-dark", logo:"assets/img/logo-light.png" }} />*/}
            </Fragment>
        );
    }
}

export default Menuone;