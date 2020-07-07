import React from "react";
import PropTypes from "prop-types";

const recommendationsStyle = {
  display: 'flex'
};

export default class GeoRecommendations extends React.Component {

  static propTypes = {
    recommendations: PropTypes.arrayOf( 
      PropTypes.shape({
        auto_optimizer_id: PropTypes.string.isRequired,
        auto_optimizer_explanation: PropTypes.string.isRequired
      })
     )
};

  render() {
    return (
      <div className="recommendations">
        <div style={recommendationsStyle}>
          {this.props.recommendations.map((r) =>
              {
                return (
                  <div key={r.auto_optimizer_id} className="recommendations__single">
                    <b>
                      <i>{"auto_optimizer"}</i>
                    </b>{" "}
                    : {r.auto_optimizer_explanation}
                  </div>
                )
              }
          )}
        </div>
      </div>
    );
  }
}
