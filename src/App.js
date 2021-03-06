import React from 'react';
import {withRouter,NavLink} from 'react-router-dom'
import './static/css/comm.less';


/*function App() {
  return (
    <div className="App">
        <Home/>
        {console.log(this)}

    </div>
  );
}*/


const footer ={
    display:'flex',
    width:'100%',
    height:'50px',
    justifyContent: 'space-around',
    position:'fixed',
    bottom:'0',
    alignItems: 'center',
    background:'#fff',
    fontSize:'16px'
}
const meun=(props)=>{
    if(props.location.pathname==='/'||props.location.pathname==='/person/'||props.location.pathname==='/person'||props.location.pathname==='/forum/'){
        return (
            <div className="App">
                {/*            <Home/>*/}
                {props.children}
                <div style={footer}>
                    <NavLink to='/' exact  activeStyle={{ fontWeight: "bold",  color: "#356dd0" }}>文章</NavLink>
                    <NavLink to='/forum/' exact  activeStyle={{ fontWeight: "bold",  color: "#356dd0" }}>论坛</NavLink>
                    <NavLink to='/person/' exact   activeStyle={{ fontWeight: "bold",  color: "#356dd0" }}>我的</NavLink>
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="App">
                {/*            <Home/>*/}
                {props.children}
            </div>
        );
    }
}
class App extends React.Component {

    render() {
        return(
            <div>{meun(this.props)}</div>
        )
    }
}

export default withRouter(App);
