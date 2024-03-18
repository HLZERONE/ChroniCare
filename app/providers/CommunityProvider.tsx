import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Community from '../firebaseConnect/data/Community';
import { getCommunities, getCurrentUserJoinedCommunities, joinCommunity as joinCommunityRequest, leaveCommunity as leaveCommunityRequest} from '../firebaseConnect/Forum';

interface CommunityContextType {
  joinedCommunities: Community[]; // Array of Community objects
  communities: Community[]; // Array of Community objects
  joinCommunity: (community: Community) => void; // Function to join a community
  leaveCommunity: (community: Community) => void; // Function to leave a community
}

const defaultContextValue: CommunityContextType = {
  joinedCommunities: [],
  communities: [],
  joinCommunity: (community: Community) => {
    console.log('Join community:', community);
    // Default implementation (should be replaced by actual logic in CommunityProvider)
  },
  leaveCommunity: (community: Community) => {
    console.log('Leave community:', community);
    // Default implementation (should be replaced by actual logic in CommunityProvider)
  }
};

const CommunityContext = createContext<CommunityContextType>(defaultContextValue);
export const useCommunityContext = () => useContext(CommunityContext);

interface CommunityProviderProps {
  children: ReactNode; // Explicitly type the children prop
}

export const CommunityProvider: React.FC<CommunityProviderProps> = ({ children }) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);

  useEffect(() => {
    getCommunities().then((communities) => {
      setCommunities(communities);
    }).catch((e) => {
      console.log('getCommunities error: ' + e);
    });
    getCurrentUserJoinedCommunities().then((communities) => {
      setJoinedCommunities(communities);
    }).catch((e) => {
      console.log('getCurrentUserJoinedCommunities error: ' + e);
    });
  }, []);

  const joinCommunity = (community: Community) => {
    joinCommunityRequest(community.id).then(() => {
      setJoinedCommunities((current) => [...current, community]);
    }).catch((e) => {
      console.log('joinCommunity error: ' + e);
    });
  };

  const leaveCommunity = (community: Community) => {
    leaveCommunityRequest(community.id).then(() => {
      setJoinedCommunities((current) => current.filter((c) => c.id !== community.id));
    }).catch((e) => {
      console.log('leaveCommunity error: ' + e);
    });
  };

  return (
    <CommunityContext.Provider value={{ joinedCommunities, communities, joinCommunity, leaveCommunity }}>
      {children}
    </CommunityContext.Provider>
  );
};
