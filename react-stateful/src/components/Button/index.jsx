import { Component } from "react";

import './styles.css';

export class Button extends Component {

  render() {
    const { text, onClickPosts, disabled } = this.props;
    
    return (
      <button 
        disabled={disabled} 
        onClick={onClickPosts} 
        className="button"
      >
        {text}
      </button>
    )
  }
}