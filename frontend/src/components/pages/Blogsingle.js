import React, { Component, Fragment } from 'react';

import Footer from '../layouts/Footer';
import Content from '../sections/blog-single/Content';

//const pagelocation = 'Menu v1'

class Blogsingle extends Component {
    render() {
        return (
            <Fragment>

                {/*<Header/>*/}
                {/*<Breadcrumbs breadcrumb={{ pagename: pagelocation }} />*/}
                <Content blogId={this.props.match.params.id}/>
                {/*<Footer footer={{ style:"ct-footer footer-dark", logo:"assets/img/logo-light.png" }} />*/}
            </Fragment>
        );
    }
}

export default Blogsingle;