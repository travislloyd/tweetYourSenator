import React, { Component } from 'react';
import './FormWidget.css';

class FormWidget extends Component {
	componentDidMount(){
		document.getElementById("FormWidget-activeInput").focus()
	}

	render() {
		let form

    	if(this.props.optionsList){
    		form = this._buildSelectionList()
    	} else {
    		form = <input type="text" className="FormWidget-userInput FormWidget-smallBlock" id="FormWidget-activeInput"/>
    	}

        return (
	        <div className="FormWidget">
	        	<div className="FormWidget-content">
		        	<h2 className="FormWidget-title">{ this.props.header }</h2>
		        	{ form }
		        </div>
		        <button className="FormWidget-button FormWidget-smallBlock" onClick={ (e) => this._handleCTAClick() }>{ this.props.cta }</button>
	    	</div>
	    );
    }

    _handleCTAClick() {
    	let userInput

		if(this.props.optionsList){
			const selected = document.querySelector('input[name = "userSelection"]:checked')
			if(selected){
				userInput = selected.value
			} else {
				alert("Please select one of the options")
				return
			}
		} else {
			userInput = document.getElementById("FormWidget-activeInput").value
		}

		this.props.ctaFunction(userInput)
	}

	_buildSelectionList(){
		let options = this.props.optionsList.map((option) =>
			<div key={ option.value } className="FormWidget-listItem">
				{ this._buildInputLabel(option) }
			</div>
		)

		return <ul>{ options }</ul>
	}

	_buildInputLabel(option){
		let valueSpan
		let nameSpan

		if(option.displayValue){
			valueSpan = <span className="FormWidget-listItem-label__value FormWidget-listItem-label__child">{ option.value }</span>
		}

		if(option.nameText){
			nameSpan = <span className="FormWidget-listItem-label__name FormWidget-listItem-label__child">{ option.nameText }</span>

		}

		return 	<label className="FormWidget-listItem-label">
					<input className="FormWidget-listItem-label__child FormWidget-userInput" type="radio" name="userSelection" value={ option.value }/>
					{ nameSpan }
					{ valueSpan }
				</label>
	}
}

export default FormWidget;