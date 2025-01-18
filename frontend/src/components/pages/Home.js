import React, { Component, Fragment } from 'react';

import Content from '../sections/home/Content';

//const pagelocation = 'Homepage';

class Home extends Component {
    render() {
        return (
            <Fragment>

                {/*<Headnedrcddk/>*/}
                <Content/>

                {/*<Footer footer={{ style:"ct-footer footer-dark", logo:"assets/img/logo-light.png" }} />*/}
            </Fragment>
        );
    }
}

export default Home;