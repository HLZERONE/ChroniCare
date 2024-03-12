import React, { createContext, useContext, useState, ReactNode } from 'react';
import Community from '../firebaseConnect/data/Community';
import { joinCommunity as joinCommunityRequest, leaveCommunity as leaveCommunityRequest} from '../firebaseConnect/Forum';

interface CommunityContextType {
  joinedCommunities: Community[]; // Array of Community objects
  joinCommunity: (community: Community) => void; // Function to join a community
  leaveCommunity: (community: Community) => void; // Function to leave a community
  updateJoinedCommunities: (communities: Community[]) => void; // Function to update the joined communities
}

const defaultContextValue: CommunityContextType = {
  joinedCommunities: [],
  joinCommunity: (community: Community) => {
    console.log('Join community:', community);
    // Default implementation (should be replaced by actual logic in CommunityProvider)
  },
  leaveCommunity: (community: Community) => {
    console.log('Leave community:', community);
    // Default implementation (should be replaced by actual logic in CommunityProvider)
  },

  updateJoinedCommunities: (communities: Community[]) => {
    console.log('Update joined communities:', communities);
    // Default implementation (should be replaced by actual logic in CommunityProvider)
  }
};

const CommunityContext = createContext<CommunityContextType>(defaultContextValue);
export const useCommunityContext = () => useContext(CommunityContext);

interface CommunityProviderProps {
  children: ReactNode; // Explicitly type the children prop
}

export const CommunityProvider: React.FC<CommunityProviderProps> = ({ children }) => {
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);

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

  const updateJoinedCommunities = (communities: Community[]) => {
    setJoinedCommunities(communities);
  }

  return (
    <CommunityContext.Provider value={{ joinedCommunities, joinCommunity, leaveCommunity, updateJoinedCommunities }}>
      {children}
    </CommunityContext.Provider>
  );
};
