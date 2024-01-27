import React from 'react'

const InstaShareContext = React.createContext({
  activeSmallNav: false,
  likedPostsId: [],
  activeTab: 'HOME',
  isDark: false,
  toggleTheme: () => {},
  changeActiveTab: () => {},
  toggleSmallNav: () => {},
  changeLikeStatus: () => {},
})

export default InstaShareContext
