import React, { Component, Fragment } from 'react';

import Content from '../sections/menu-item-v1/Content';

//const pagelocation = 'Menu Item v1'

class Menuitemone extends Component {
    render() {
        return (
            <Fragment>

                {/*<Header/>*/}
                {/*<Breadcrumbs breadcrumb={{ pagename: pagelocation }} />*/}
                <Content productId={this.props.match.params.id}/>
                {/*<Footer footer={{ style:"ct-footer footer-dark", logo:"assets/img/logo-light.png" }} />*/}
            </Fragment>
        );
    }
}

export default Menuitemone;