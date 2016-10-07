import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import classnames from "classnames";

class NavigationBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      scrollTop:"",
      offset:""
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.logoColor = this.logoColor.bind(this);
  }
    componentDidMount(){
      window.addEventListener('scroll',this.handleScroll);
      const navBar = document.getElementById('nav-bar');
      const navPos = navBar.offsetTop;
      console.log('navpos' + navPos)
      this.setState({offset:navPos});
      this.logoColor();
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);

  }

logoColor(){
  const granimInstance = new Granim({
    element: '#block-logo-canvas',
    direction: 'left-right',
    opacity: [1, 1],
    states : {
        "default-state": {
            gradients: [
                ['#EB3349', '#F45C43'],
                ['#FF8008', '#FFC837'],
                ['#4CB8C4', '#3CD3AD'],
                ['#24C6DC', '#514A9D'],
                ['#FF512F', '#DD2476'],
                ['#DA22FF', '#9733EE']
            ],
            transitionSpeed: 2000
        }
    }
  });
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
    const userLinks = (

        <ul className="nav navbar-nav pull-md-right">
      <li className="nav-item">
      <h4>{user.username}</h4>
      </li>
      <li className="nav-item">
        <span onClick={this.logout.bind(this)} className="btn btn-outline-warning"> logout</span>
      </li>
      </ul>

    );

    const guestLinks = (
      <p><Link to="login">Login</Link></p>
    );

    return (

      // <nav className="main-nav" style={this.state.scrollTop > 310 ? navFixed : null}>
      //     <ul>
      //       {isAuthenticated ? userLinks: guestLinks}
      //     </ul>
          // </nav>

          <nav id="nav-bar" className={classnames('navbar','navbar-full','navbar-light','bg-faded',{'navbar-fixed-top':this.state.scrollTop > this.state.offset })}>
              <div className="navbar-brand">
              <div className="block-logo">
              <canvas id="block-logo-canvas"></canvas>
              <a href="index.html" className="block-logo-mask">Granim.js</a>
              </div>
              </div>

                            {isAuthenticated ? userLinks: guestLinks}

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
