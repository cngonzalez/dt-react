import React from 'react'
import DefaultShape from './defaultShape'
import fetch from 'isomorphic-fetch'

///import other canvas elements as components or stateless functions
const socket = io();

export default class CanvasComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      shapes: []
    }
    this.handleClick = this.handleClick.bind(this)
    socket.on('connect', function() {
      console.log('Connected!')
    })
    // debugger;
    socket.on('draw', (newDrawState) => this.handleStateChange(newDrawState));
  }

  handleStateChange(newDrawState) {
    // debugger;
    this.setState({
      shapes: [...this.state.shapes, newDrawState]
    })
  }

  handleClick(ev){
    ev.preventDefault();
    socket.emit('draw', [ev.pageX, ev.pageY-55]);
  }

  render(){
    let rendered = this.state.shapes.map((shape, i) => <DefaultShape xCo={shape[0]} yCo={shape[1]} key={i}/>)
    return (
      <div id="painting">
        <canvas onMouseMove={this.handleClick} id="ourCanvas" width="700" height="400" style={{backgroundColor: '#008811', borderRadius: 10, borderWidth: 0.5, borderColor: '#d6d7da', opacity: '0.75'}}>
          {rendered}
        </canvas>
      </div>
    )
  }
}
