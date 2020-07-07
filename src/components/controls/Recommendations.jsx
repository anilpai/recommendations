import React from "react";
import PropTypes from "prop-types";
import CancelOnUnmount from "../../services/CancelOnUnmount.js";
import CampaignCoreSettingsRecommendationService from "../../services/CampaignCoreSettingsRecommendationService";
import CampaignGeoRecommendationService from "../../services/CampaignGeoRecommendationService";
import CampaignAdFormatRecommendationService from "../../services/CampaignAdFormatRecommendationService";
import GeoRecommendations from "./GeoRecommendations.jsx";
import CoreSettingsRecommendations from "./CoreSettingsRecommendations.jsx";
import "./Recommendations.scss";
import AdFormatRecommendations from "./AdFormatRecommendations.jsx";

export default class Recommendations extends React.Component {
  static propTypes = {
    recommendationType: PropTypes.oneOf([
      "CAMPAIGN_CORE_SETTINGS_RECOMMENDATIONS",
      "CAMPAIGN_GEO_RECOMMENDATIONS",
      "CAMPAIGN_ADFORMAT_RECOMMENDATIONS"
    ]).isRequired,
    campaignId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      newRecommendationText: "",
      recommendations: []
    };

    this.serviceName = {
      CAMPAIGN_CORE_SETTINGS_RECOMMENDATIONS: CampaignCoreSettingsRecommendationService,
      CAMPAIGN_GEO_RECOMMENDATIONS: CampaignGeoRecommendationService,
      CAMPAIGN_ADFORMAT_RECOMMENDATIONS: CampaignAdFormatRecommendationService
    };

    this.handleAddRecommendation = this.handleAddRecommendation.bind(this);
    this.handleDismissRecommendation = this.handleDismissRecommendation.bind(this);
    this.handleTextAreaChanged = this.handleTextAreaChanged.bind(this);
  }

  componentDidMount() {
    CancelOnUnmount.track(
      this,
      this.serviceName[this.props.recommendationType]
        .getAllRecommendations(this.props.campaignId)
        .then((recommendations) => {
          this.setState({recommendations: recommendations});
        })
        .catch((err) => {
          alert("Failed to get recommendations");
          console.error(err);
        })
    );
  }

  componentWillUnmount() {
    CancelOnUnmount.handleUnmount(this);
  }

  handleTextAreaChanged(e) {
    this.setState({newRecommendationText: e.target.value});
  }

  handleAddRecommendation() {
    const recommendationText = this.state.newRecommendationText;

    this.setState({newRecommendationText: ""});

    if (
      ["CAMPAIGN_CORE_SETTINGS_RECOMMENDATIONS", "CAMPAIGN_ADFORMAT_RECOMMENDATIONS"].includes(
        this.props.recommendationType
      )
    ) {
      CancelOnUnmount.track(
        this,
        this.serviceName[this.props.recommendationType]
          .addRecommendation(this.props.campaignId, recommendationText)
          .then((recommendation) => {
            this.setState({recommendations: this.state.recommendations.concat(recommendation)});
          })
          .catch((err) => {
            alert("Couldn't add recommendation, please try again.");
            console.error(err);
          })
      );
    }
  }

  handleDismissRecommendation(evt, recommendationId) {
    CancelOnUnmount.track(
    this, 
    this.serviceName[this.props.recommendationType]
      .dismissRecommendation(this.props.campaignId, recommendationId)
      .then((recommendationId) => {
        const updatedRecommendations = this.state.recommendations.filter(recommendation => {
        return recommendation.id !== recommendationId;
      })
      this.setState({ recommendations: updatedRecommendations })
    })
    .catch((err) => {
      console.error(err);
      alert('Couldn\'t remove recommendation, please try again.');
    }));
  }

  render() {
    if (this.props.recommendationType === "CAMPAIGN_GEO_RECOMMENDATIONS") {
      return <GeoRecommendations recommendations={this.state.recommendations} />;
    } else if (this.props.recommendationType === "CAMPAIGN_ADFORMAT_RECOMMENDATIONS") {
      return <AdFormatRecommendations recommendations={this.state.recommendations}
              newRecommendationText={this.state.newRecommendationText}
              onChange={this.handleTextAreaChanged}
              onClick={this.handleAddRecommendation}
      />;
    } else {
      return <CoreSettingsRecommendations recommendations={this.state.recommendations} 
              newRecommendationText={this.state.newRecommendationText} 
              onChange={this.handleTextAreaChanged}
              onDel={this.handleDismissRecommendation} 
              onAdd={this.handleAddRecommendation} />;
    }
  }

}
