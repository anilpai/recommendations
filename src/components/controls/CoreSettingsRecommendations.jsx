import React from "react";
import PropTypes from "prop-types";

const recommendationsStyle = {
  display: 'flex'
};

export default class CoreSettingsRecommendations extends React.Component {

  static propTypes = {
    recommendations: PropTypes.arrayOf( 
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        suggestion: PropTypes.string
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
            {this.props.recommendations.map(r => {
              return (
                <div key={r.id} className="recommendations__single">
                  <div className="text">
                  <b>
                    <i>{r.username}</i>
                  </b>{" "}
                  : {r.text}
                  </div>
                <div className="dismiss">
                  <button onClick={(evt)=> this.props.onDel(evt, r.id)}>x</button>
               </div>
              </div>
              );
            })}
          </div>
          <div>
            <div>
              <textarea value={this.props.newRecommendationText} onChange={this.props.onChange} />
            </div>
            <div>
              <button onClick={this.props.onAdd}>Add</button>
            </div>
          </div>
        </div>
      );
  }
}
