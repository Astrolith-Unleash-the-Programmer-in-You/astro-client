import  React, { createContext, useContext, useState,useCallback } from "react";
import { connectToAstrolith } from "../lib/astrolith5/connection";
import { AstrolithDIDResolver } from "../lib/astrolith5/didResolver";
import {AstrolithProtocol} from "../lib/astrolith5/protocol";
import { CONSTANTS } from "../constants";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState('');
  const [web5, setWeb5] = useState(null);

  const connections = useCallback(async() =>{
    const {web5,connectedUserDID} = await connectToAstrolith();
    const protocol = new AstrolithProtocol();
    const configProtocol = await protocol.configureProtocol(web5);
    const schema = protocol.astrolithProtocol.types.didResolver.schema;
    console.log(schema,"config")
    const resolver = new AstrolithDIDResolver(web5,protocol.astrolithProtocol.protocol,CONSTANTS.PROTOCOLDID,schema);

    const resolvedProtocol = await resolver.readOrCreate(connectedUserDID);
    console.log(resolvedProtocol,"didResolve")

    const displayName = resolver.resolve(connectedUserDID);
    console.log(displayName,"this is display name");

    console.log(web5,connectedUserDID)


  }, []);

//   connections().then(()=>{

//   })

  return (
    <AuthContext.Provider
      value={{
        connected,
        setConnected,
        userName,
        setUserName,
        web5,
        setWeb5,
        connections
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth misused context");
  }

  return context;
};
