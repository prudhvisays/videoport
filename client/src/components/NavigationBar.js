import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

class NavigationBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      scrollTop:""
    }
    this.handleScroll = this.handleScroll.bind(this);
  }
    componentDidMount(){
      window.addEventListener('scroll',this.handleScroll);
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event){
    console.log(Math.floor(window.pageYOffset));
    const itemTranslate = event.srcElement.body.scrollTop;
    this.setState({scrollTop: itemTranslate})

  }

  logout(e) {
    e.preventDefault();
    this.props.logout(this.props.authReducers.user.sessionId);
  }

  render() {
    const { isAuthenticated, user} = this.props.authReducers;
  const navFixed = {
          position:'fixed'
    }
    const userLinks = (
      <p>
        {user.username}
        <span onClick={this.logout.bind(this)}> logout</span>
      </p>
    );

    const guestLinks = (
      <p><Link to="login">Login</Link></p>
    );

    return (

      <nav className="navFixed" style={this.state.scrollTop > 310 ? navFixed : null}>
          <ul>
            {isAuthenticated ? userLinks: guestLinks}
          </ul>
          </nav>
    );
  }
}

NavigationBar.propTypes = {
  authReducers: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}
 function mapStateToProps(state) {
   return {
     authReducers: state.authReducers
   };
 }
export default connect(mapStateToProps, { logout })(NavigationBar);
