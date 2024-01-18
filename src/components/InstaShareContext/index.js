import React from 'react'

const InstaShareContext = React.createContext({
  activeSmallNav: false,
  likedPostsId: [],
  activeTab: 'HOME',
  changeActiveTab: () => {},
  toggleSmallNav: () => {},
  changeLikeStatus: () => {},
})

export default InstaShareContext
