import React, { PureComponent as Component } from 'react';

class Categories extends Component {
  constructor(props){
    super(props);

    this._handleSelection = this._handleSelection.bind(this);
  };

  _handleSelection(event) {
    this.props.foodType(event.target.value)
  }


  render() {
    return (
      <div className="filterContainer">
      <h1 className="filterMenu">Refine your search:</h1>
      <select className="filterMenuItem"
        onChange={(event) => this._handleSelection(event)} >
      <option value={" "}>Choose by Food Type</option>
      {this.props.menu.map( (p) => {
        return <option key= {p.id} value={ p.name }>{p.name}
        </option>
      })}
      </select>

      </div>
    );
  }
}

export default Categories;
