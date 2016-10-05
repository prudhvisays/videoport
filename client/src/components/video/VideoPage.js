import React from "react";
import VideoGrid from "./VideoGrid";
import VideosHeader from "../header/VideosHeader";
import NavigationBar from "../NavigationBar";
 class VideoPage extends React.Component {
   render() {
     return (
       <div>
       <VideosHeader/>
       <NavigationBar/>
      <div className="container">

     <VideoGrid />

      </div>
       </div>


     );
   }
 }
 export default VideoPage;
