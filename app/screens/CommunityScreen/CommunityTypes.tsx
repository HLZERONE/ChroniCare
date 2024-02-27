

export type CommunityStackNavList = {
    CommunityScreen: undefined; // No parameters expected to be passed to Home screen
    SingleCommunityScreen: {communityID:string}; // Parameters expected for Details screen
    PostScreen: {postID:string, communityID:string};
    CreatePostPage: {cummunityID: string};
    CreateReplyPage: {postIDReplyTo: string}
  };
  