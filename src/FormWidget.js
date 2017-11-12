import React, { Component } from 'react';
import './FormWidget.css';

class FormWidget extends Component {
	componentDidMount(){
		document.getElementById("FormWidget-activeInput").focus()
	}

	render() {
        return (
	        <div className="FormWidget">
	        	<div className="FormWidget-content">
		        	<h2 className="FormWidget-title">{ this.props.header }</h2>
		        	<input type="text" className="FormWidget-userInput FormWidget-smallBlock" id="FormWidget-activeInput"/>
		        </div>
		        <button className="FormWidget-button FormWidget-smallBlock" onClick={ (e) => this._handleCTAClick() }>{ this.props.cta }</button>
	    	</div>
	    );
    }

    _handleCTAClick() {
		this.props.ctaFunction(document.getElementById("FormWidget-activeInput").value)
	}
}

export default FormWidget;