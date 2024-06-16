{
    /* Disabled due to spam */
  }
  
  import dynamic from "next/dynamic";
  
  import { Crisp } from "crisp-sdk-web";
import { Component } from "react";
  
  const CrispWithNoSSR = dynamic(() => import("./crisp"), {
    ssr: false,
  });
  
  class CrispChat extends Component {
    componentDidMount() {
      Crisp.configure("a5e53b55-a08e-4ebe-bd54-14aff455962b");
    }
  
    render() {
      return null;
    }
  }
  export default CrispChat;
  
  // open crisp chat
  export const openCrispChat = () => {
    Crisp.chat.open();
  };
  