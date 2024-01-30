import React from 'react'

const InstaShareContext = React.createContext({
  activeSmallNav: false,
  likedPostsId: [],
  activeTab: 'HOME',
  isDark: false,
  savedPostsId: [],
  toggleTheme: () => {},
  changeActiveTab: () => {},
  toggleSmallNav: () => {},
  changeLikeStatus: () => {},
  changeSavedPostsId: () => {},
})

export default InstaShareContext
