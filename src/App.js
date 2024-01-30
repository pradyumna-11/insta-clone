import Cookies from 'js-cookie'
import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import InstaShareContext from './components/InstaShareContext'

import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/UserProfile'
import SavedPosts from './components/SavedPosts'
import MyProfile from './components/MyProfile'
import LikedPostsPage from './components/LikedPostsPage'

const activeTabConst = {
  home: 'HOME',
  profile: 'PROFILE',
  search: 'SEARCH',
}

class App extends Component {
  state = {
    activeSmallNav: false,
    likedPostsId: [],
    activeTab: activeTabConst.home,
    isDark: false,
    savedPostsId: [],
  }

  toggleSmallNav = value => {
    this.setState({activeSmallNav: value})
  }

  changeActiveTab = value => {
    this.setState({activeTab: value})
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  changeLikeStatus = async (postId, value) => {
    const {likedPostsId} = this.state
    const token = Cookies.get('jwt_token')
    const content = {
      like_status: value,
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts/${postId}/like`,
      options,
    )

    const index = likedPostsId.indexOf(postId)
    if (response.ok === true && index === -1 && value === true) {
      this.setState(prevState => ({
        likedPostsId: [...prevState.likedPostsId, postId],
      }))
    }
    if (value === false) {
      const updatedLikedList = likedPostsId.filter(each => each !== postId)
      this.setState({likedPostsId: [...updatedLikedList]})
    }
  }

  changeSavedPostsId = id => {
    const {savedPostsId} = this.state
    const index = savedPostsId.indexOf(id)
    if (index === -1) {
      this.setState(prevState => ({
        savedPostsId: [...prevState.savedPostsId, id],
      }))
    } else {
      const updatedSavedPostsIdList = savedPostsId.filter(each => each !== id)
      this.setState({savedPostsId: [...updatedSavedPostsIdList]})
    }
  }

  render() {
    const {
      activeSmallNav,
      likedPostsId,
      activeTab,
      isDark,
      savedPostsId,
    } = this.state
    return (
      <InstaShareContext.Provider
        value={{
          activeSmallNav,
          likedPostsId,
          activeTab,
          isDark,
          savedPostsId,
          changeActiveTab: this.changeActiveTab,
          toggleSmallNav: this.toggleSmallNav,
          changeLikeStatus: this.changeLikeStatus,
          toggleTheme: this.toggleTheme,
          changeSavedPostsId: this.changeSavedPostsId,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/saved-posts" component={SavedPosts} />
          <ProtectedRoute
            exact
            path="/liked-posts"
            component={LikedPostsPage}
          />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
          <Route exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </InstaShareContext.Provider>
    )
  }
}

export default App
