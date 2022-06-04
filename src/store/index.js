import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialDashboardState = {
  posts: [],
  authors: [],
  tags: [],
  top5post: [],
  pages: [],
};

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    assignPosts(state, action) {
      state.posts = action.payload;
    },
    assignAuthors(state, action) {
      state.authors = action.payload;
    },
    assignTags(state, action) {
      state.tags = action.payload;
    },
    assignTop5posts(state, action) {
      state.top5post = action.payload;
    },
    assignPages(state, action) {
      state.pages = action.payload;
    },
  },
});

const BarChartSlice = createSlice({
  name: "barchart",
  initialState: { postsMonthly: [] },
  reducers: {
    assignPostsMonthly(state, action) {
      state.postsMonthly = action.payload;
    },
  },
});

const initialPostPageState = {
  noMeta: [],
  tooLongMeta: [],
  tooLongUrl: [],
  noImg: [],
  tooLongPosts: [],
  tooShortPosts: [],
};

const PostsPageSlice = createSlice({
  name: "Posts-Page",
  initialState: initialPostPageState,
  reducers: {
    assignNoMeta(state, action) {
      state.noMeta = action.payload;
    },
    assignTooLongMeta(state, action) {
      state.tooLongMeta = action.payload;
    },
    assignTooLongUrl(state, action) {
      state.tooLongUrl = action.payload;
    },
    assignNoIMG(state, action) {
      state.noImg = action.payload;
    },
    assignTooLongPosts(state, action) {
      state.tooLongPosts = action.payload;
    },
    assignTooShortPosts(state, action) {
      state.tooShortPosts = action.payload;
    },
  },
});

const initialLinksPageState = {
  urls: [],
  lengthInternalLinks: 0,
};

const LinkPageSlice = createSlice({
  name: "Links-page",
  initialState: initialLinksPageState,
  reducers: {
    assignUrls(state, action) {
      state.urls = [...state.urls, ...action.payload];
    },
    assignBrokenLinks(state, action) {
      state.brokenLinks = action.payload;
    },
    assignLengthInternalLinks(state, action) {
      state.lengthInternalLinks = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    DashboardReducer: DashboardSlice.reducer,
    BarchartReducer: BarChartSlice.reducer,
    PostsPageReducer: PostsPageSlice.reducer,
    LinksPageReducer: LinkPageSlice.reducer,
  },
});

export const DashboardActions = DashboardSlice.actions;
export const BarchartActions = BarChartSlice.actions;
export const PostPageActions = PostsPageSlice.actions;
export const LinkPageActions = LinkPageSlice.actions;

export default store;
