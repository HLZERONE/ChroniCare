export type ResourceStackNavList = {
    ResourceScreen: undefined; // No parameters expected to be passed to Home screen
    ResourceEntry: { title: string; content: string }; // Parameters for ResourceEntry
    ResourceShow: { resourceTitle: string; content: string }; // Parameters for ResourceShow
};