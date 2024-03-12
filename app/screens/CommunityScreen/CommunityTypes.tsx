import Community from "../../firebaseConnect/data/Community";
import { Post } from "../../firebaseConnect/data/Post";


export type CommunityStackNavList = {
    CommunityScreen: undefined; // No parameters expected to be passed to Home screen
    SingleCommunityScreen: {community: Community};
    PostScreen: {community: Community, post: Post};
    CreatePostPage: {cummunityID: string};
    CreateReplyPage: {postIDReplyTo: string};
    SearchResult: {communities: Community[]}
  };
  