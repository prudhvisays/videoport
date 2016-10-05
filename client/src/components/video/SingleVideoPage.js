import React from "react";
import { connect } from "react-redux";
import { fetchSingleVideo } from "../../actions/videoActions";

class SingleVideoPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      video:{}
    }
  }
  componentDidMount(){
    const { sessionId,videoId } = this.props.params;
    this.props.fetchSingleVideo(sessionId,videoId);
  }
  componentWillReceiveProps(nextProps){
    this.setState({video:nextProps.video})
  }
  render(){
    const { video } = this.state
    const videoUrl = `/${video.url}`;
    return(
      // <div>
      // <h1>this is activeVideo page {video.name}</h1>
      // <video ref={video._id} src={videoUrl} width="520" height="440" controls autoPlay>
      // </video>
      // </div>
              <div className="ui segment">
              <video ref={video._id} src={videoUrl} width="520" height="440" controls autoPlay>
              </video>
        </div>
    )
  }
}

function mapStateToProps(state){
  return {
    video: state.videoReducers.activeVideo
  }
}

export default connect(mapStateToProps,{ fetchSingleVideo })(SingleVideoPage);
