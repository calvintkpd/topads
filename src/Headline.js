import React, { Component } from 'react';
import logo from './logo.svg';
// import Fancy from 'react-fancy-component';

import Parser from 'html-react-parser';
import VisibilitySensor from 'react-visibility-sensor'

import './App.css';
import './Headline.css';
import strings from "./il8n"; 

class Headline extends Component {
  state = {active: true};
  constructor() {
      super();
  }
  
  componentWillMount() {
    var lang = this.props.lang || "id";
    console.log(lang);
    this.setState({lang: lang});
  }

  renderTitle(promoted_text, badge, shop_name) {
    let titleText = "";
    if (promoted_text != "") {
      titleText += '<span className="ta-promoted-text">' + promoted_text + '</span>';
    }
    if (badge.length > 0) {
      titleText += '<span className="ta-badge-img"><img src="' + badge[0].image_url + '" alt="' + badge[0].title + '"/></span>';
    }
    titleText += '<span className="ta-shop-name">' + shop_name + '</span>';
    return titleText;
  }

  render() {
    console.log(this.props);
    const adsData = JSON.parse(this.props.adsData);
    const cpmData = adsData.data[0];
    const onChange = (isVisible) => {
        if (isVisible) {
            this.setState({active: false});
            if (cpmData.headline.image.full_url != cpmData.headline.image.full_ecs) {
              fetch( cpmData.headline.image.full_url ,{
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
              .then((a) => {
                console.log("Record Impression");
              })
            }
        }
        console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
    };
    console.log(cpmData);
    return (
      <VisibilitySensor onChange={onChange} active={this.state.active}>
        <div className="ta-inventory">
          <div className="ta-cpm">
            <a href={cpmData.ad_click_url}>
              <div className="ta-shop-img">
                <img src={cpmData.headline.image.full_ecs} alt={cpmData.headline.name}/>
              </div>
            </a>
            <div className="ta-shop-detail">
              <a href={cpmData.ad_click_url}>
                <div className="ta-shop-detail-wrap">
                  {Parser(this.renderTitle(cpmData.headline.promoted_text, cpmData.headline.badges, cpmData.headline.name))}
                </div>
              </a>
              <div className="ta-shop-slogan">
                <a href={cpmData.ad_click_url}>
                  <span className="ta-slogan-headline">{cpmData.headline.description}</span>
                </a>
                <a href={cpmData.ad_click_url} className="ta-cta-headline"> {cpmData.headline.button_text}
                </a>
              </div>
            </div>   
          </div>
        </div>
      </VisibilitySensor>
    );
  }
}

export default Headline;
