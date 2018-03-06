import React, { Component } from 'react';
import logo from './logo.svg';
import Headline from './Headline';
import Product from './Product';
import VisibilitySensor from 'react-visibility-sensor';

let taHandler = {};
taHandler.ad_url = 'https://ta.tokopedia.com'; /* Default ad_url value */
taHandler.tkpd_url = 'https://www.tokopedia.com'; /* Default tkpd_url value */
taHandler.merlin_url = 'https://merlin.tokopedia.com'; /* Default merlin_url value */
taHandler.tome_url = 'https://tome.tokopedia.com'; /* Default merlin_url value */
taHandler.display_ep = '/promo/v1.2/display/ads';
taHandler.userinfo_ep = '/promo/v1/info/user';
taHandler.merlin_cat_rcmd_ep = '/v4/product/category/recommendation';
taHandler.merlin_basket_rcmd_ep = '/v1/recommendation/product/keyword/basket';
taHandler.tome_token_ep = '/v1/user/token';
taHandler.lang = 'id';

/* queryParams contain supported parameters for the container
* Value = 0 means invalid/disabled param
* Value = 1 means valid div attribute and valid display param
* Value = 2 means valid div attribute only
*/
taHandler.queryParams = {
    'ep': 1,
    'item': 1,
    'src': 1,
    'device': 1,
    'page': 1,
    'dep_id': 1,
    'h': 1,
    'q': 1,
    'catalog_id': 1,
    'pmin': 1,
    'pmax': 1,
    'fshop': 1,
    'official': 1,
    'floc': 1,
    'fcity': 1,
    'wholesale': 1,
    'shipping': 1,
    'preorder': 1,
    'condition': 1,
    'freereturns': 1,
    'cashback': 1,
    'rating': 1,
    'brand': 1,
    'ab_test': 1,
    'pub_id': 1,
    'pub_unit': 1,
    'pub_domain': 1,
    'search_nf': 1,
    'user_id': 1,
    'template_id': 1,       /* template cpm */
    'is_userinfo_rcmd': 2,
    'cat_rcmd_key': 2,
    'template': 2,
    'trigger': 2,
    'no_request': 3,
    'merlin_url': 2,
    'tome_url': 2,
    'ad_url': 2,
    'tkpd_url': 2,
    'xparams': 1   /* additional params, separated by semicolon. for this time just to send product_id*/
}

class TopAds extends Component {
    state = {active: true};
    constructor() {
        super();
    }

    buildDisplayQuery() {
        let query = "?";
        var adQuery = this.props.query;
        for(var key in adQuery) { 
            if (taHandler.queryParams[key] == 1 && adQuery[key] != null) {
                query += '&' + key + '=' + encodeURIComponent(adQuery[key]);
            }
        }
        /* Remove leading '&' */
        query = query.replace('?&', '?');
        return query;
    }

    componentWillMount() {
        let queryData = this.props.query;
        let taUrl = queryData.ad_url || taHandler.ad_url; 
        let queryParams = this.buildDisplayQuery();
        fetch(taUrl + taHandler.display_ep + queryParams,{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            mode: 'cors'
        })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            this.setState({adsData: data})
        })
    }
    renderAds() {
        if (this.state.adsData) {
            if (this.props.type == "banner") {
                return <Headline {...this.props} adsData={this.state.adsData}/>;
            } else {
                return <Product props={this.props}/>;
            }    
        }
        return;
    }

    render() {
        return (
            <div>
                {this.renderAds()}
            </div>
        );
    }
}

export default TopAds;
