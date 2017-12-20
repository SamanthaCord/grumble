import React, { PureComponent as Component } from 'react'
import axios from 'axios'

import Resto from './Resto'
import Nav from './Nav'

class Faves extends Component {
  constructor(props){
    super(props)

    this.state = {
      current_user: null,
      maybes: null,
      faves: null,
      loggedIn: sessionStorage.getItem("token")
    }


    if(this.state.loggedIn){
      axios.get("http://localhost:5000/profile", {headers: {Authorization: this.state.loggedIn}}).then(res => {
        this.setState({current_user: res.data[0], faves: res.data[3], maybes: res.data[4] })
        console.log(this.state)
      } )
  }
}



  faveHandle(e) {
    const oldm = this.state.maybes.slice()
    const oldf = this.state.faves.slice()
    const objToMove = oldm.find(m => m.id === e)
    const index = oldm.indexOf( objToMove )
    oldf.push(objToMove)
    oldm.splice(index, 1)
    this.setState({maybes: oldm, faves: oldf})
  }

  trashMaybe(e){
    const maybs = this.state.maybes.slice()
    const obj = maybs.find(m => m.id === e)
    const index = maybs.indexOf( obj )
    maybs.splice(index, 1)
    this.setState({maybes: maybs})
  }

  trashFave(e){
    const faves = this.state.faves.slice()
    const obj = faves.find(f => f.id === e)
    const index = faves.indexOf( obj )
    faves.splice(index, 1)
    this.setState({faves})
  }

  render(){
    return(
      <div>
        <Nav loggedIn={this.state.loggedIn}/>
        <h1 className="profileHeading">Hello, { this.state.current_user ? this.state.current_user.name : "Current User" }</h1>
        <div className="maybes">
          <h3>Maybes</h3>
          {this.state.maybes ? this.state.maybes.map( (m) => {
            return <Resto key={m.id} id={m.id} name={m.name} favey={(e) => {this.faveHandle(e)} } trashy={(e) => {this.trashMaybe(e)}} iconClass={"maybe"} />
          } ) : ""}
        </div>

        <div className="faves">
          <h3>Faves</h3>
          {this.state.faves ? this.state.faves.map( (f) => {
            return <Resto key={f.id} id={f.id} name={f.name} trashy={(e) => {this.trashFave(e)}}/>
          } ) : ""}
        </div>

      </div>
    )
  }

} // class


export default Faves
