import React from "react";
import PropTypes from "prop-types";
import "./AdFormatCheckboxList.scss";

const recommendationsStyle = {
  display: 'flex'
};

export default class AdFormatRecommendations extends React.Component {

  static propTypes = {
    recommendations: PropTypes.arrayOf( 
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        suggestion: PropTypes.string.isRequired
      })
     ),
    newRecommendationText : PropTypes.string,
    onChange : PropTypes.func,
    onClick : PropTypes.func
};

  render() {
    return (
      <div className="recommendations">
        <div style={recommendationsStyle}>
          {this.props.recommendations.map(r =>  {
            return (
              <div key={r.id} className="recommendations__single">
                <b>
                  <i>{r.username}</i>
                </b>{" "}
                : {r.suggestion}
              </div>
            )
          })}
        </div>
        <div>
          <div>
            <textarea value={this.props.newRecommendationText} onChange={this.props.onChange} />
          </div>
          <div>
            <button onClick={this.props.onClick}>Add</button>
          </div>
        </div>
      </div>
    );
  }
}
