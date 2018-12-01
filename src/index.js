import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import SeasonalDisplay from './SeasonDisplay'
import Loader from './Loader'

class App extends Component{
    state = {
        lat: null,
        errorMessage: ''
    };

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            (position)=>this.setState({ lat:position.coords.latitude }),
            (err) =>this.setState({ errorMessage:err.message})
        );
    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        }else if(!this.state.errorMessage && this.state.lat){
            return <SeasonalDisplay lat = {this.state.lat}/>
        }else{
            return <Loader message="Please accept the location request"/>
        }
    }

    render(){
        return <div>{this.renderContent()}</div>
    }
    
}

ReactDOM.render(<App />, document.querySelector('#root'))