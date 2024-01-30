import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Popup from 'reactjs-popup'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import {IoMdArrowRoundBack} from 'react-icons/io'
import {IoClose} from 'react-icons/io5'
import InstaShareContext from '../InstaShareContext'

import Header from '../Header'
import PostItem from '../PostItem'

import './index.css'

const constHomePageStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const constSearchPageStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    posts: [],
    homeStories: [],
    homePageStatus: constHomePageStatus.loading,
    homePageStoryStatus: constHomePageStatus.loading,
    searchInput: '',
    searchPosts: [],
    searchCalled: false,
    searchPageStatus: constSearchPageStatus.initial,
  }

  componentDidMount() {
    this.getStoryDetails()
    this.getHomePagePosts()
  }

  getStoryDetails = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({homePageStoryStatus: constHomePageStatus.loading})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/insta-share/stories',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const userStories = data.users_stories.map(each => ({
        userId: each.user_id,
        username: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({
        homeStories: userStories,
        homePageStoryStatus: constHomePageStatus.success,
      })
    } else {
      this.setState({homePageStoryStatus: constHomePageStatus.failure})
    }
  }

  getHomePagePosts = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({homePageStatus: constHomePageStatus.loading})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/insta-share/posts',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const posts = data.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postImageUrl: each.post_details.image_url,
        postCaption: each.post_details.caption,
        likesCount: each.likes_count,
        comments: each.comments.map(eachComment => ({
          userName: eachComment.user_name,
          userId: eachComment.user_id,
          comment: eachComment.comment,
        })),
        createdAt: each.created_at,
      }))
      this.setState({posts, homePageStatus: constHomePageStatus.success})
    } else {
      this.setState({homePageStatus: constHomePageStatus.failure})
    }
  }

  getSearchResults = async () => {
    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    this.setState({searchPageStatus: constSearchPageStatus.loading})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`,
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const searchPosts = data.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postImageUrl: each.post_details.image_url,
        postCaption: each.post_details.caption,
        likesCount: each.likes_count,
        comments: each.comments.map(eachComment => ({
          userName: eachComment.user_name,
          userId: eachComment.user_id,
          comment: eachComment.comment,
        })),
        createdAt: each.created_at,
      }))
      this.setState({
        searchPosts,
        searchPageStatus: constSearchPageStatus.success,
      })
    } else {
      this.setState({searchPageStatus: constSearchPageStatus.failure})
    }
  }

  addComment = (userId, value, postId, userName) => {
    const {posts} = this.state
    const updatedPostsAfterComment = posts.map(each => {
      if (each.postId === postId) {
        return {
          ...each,
          comments: [...each.comments, {userName, comment: value, userId}],
        }
      }
      return each
    })
    this.setState({posts: updatedPostsAfterComment})
  }

  callSearchResults = () => {
    this.setState({searchCalled: true})
    this.getSearchResults()
  }

  changeSearchState = () => {
    this.setState({searchCalled: true})
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  tryAgainHomePage = () => {
    this.getHomePagePosts()
  }

  tryAgainHomePageStory = () => {
    this.getStoryDetails()
  }

  tryAgainSearchPage = () => {
    this.getSearchResults()
  }

  searchBackClicked = () => {
    this.setState({searchCalled: false})
  }

  renderHomePageStoryFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/daxizvsge/image/upload/v1705386860/alert-triangle_wng4nt.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-txt">Something went wrong. Please try again</p>
      <button
        className="try-again-button"
        type="button"
        onClick={this.tryAgainHomePageStory}
      >
        Try again
      </button>
    </div>
  )

  renderHomePageSuccess = () => {
    const {posts} = this.state
    return (
      <ul className="home-posts-container">
        {posts.map(each => (
          <PostItem
            postItemDetails={each}
            key={each.postId}
            addComment={this.addComment}
          />
        ))}
      </ul>
    )
  }

  renderHomePageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderHomePageFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/daxizvsge/image/upload/v1705386860/alert-triangle_wng4nt.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-txt">Something went wrong. Please try again</p>
      <button
        className="try-again-button"
        type="button"
        onClick={this.tryAgainHomePage}
      >
        Try again
      </button>
    </div>
  )

  renderSearchPageFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/daxizvsge/image/upload/v1705386860/alert-triangle_wng4nt.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-txt">Something went wrong. Please try again</p>
      <button
        className="try-again-button"
        type="button"
        onClick={this.tryAgainSearchPage}
      >
        Try again
      </button>
    </div>
  )

  renderSearchResults = isDark => {
    const {searchPosts} = this.state
    return (
      <div className="search-results-container">
        <div className="search-back-heading-container">
          <button
            className="back-button large"
            type="button"
            onClick={this.searchBackClicked}
          >
            a<IoMdArrowRoundBack size={25} color={isDark ? 'white' : 'black'} />
          </button>
          <h1
            className={
              isDark
                ? 'search-results-heading light'
                : 'search-results-heading dark'
            }
          >
            Search Results
          </h1>
        </div>

        {searchPosts.length === 0 ? (
          <div className="search-not-found">
            <img
              src="https://res.cloudinary.com/dziwdneks/image/upload/v1675513323/SearchNotFound_ntqrqa.png"
              alt="search not found"
              className="search-not-found-img"
            />
            <h1 className="search-not-found-heading">Search not found</h1>
            <p className="search-not-found-text">
              Try different keyword or search again
            </p>
          </div>
        ) : (
          <ul className="search-results-posts-container bg-none">
            {searchPosts.map(each => (
              <PostItem key={each.postId} postItemDetails={each} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderSearchPageInitial = () => (
    <div className="search-initial-container">
      <img
        src="https://res.cloudinary.com/daxizvsge/image/upload/v1705640132/Frame_1473_zlpojf.png"
        alt="search initial"
        className="search-initial-img"
      />
      <p className="search-initial-description">
        Search Results will be appear here
      </p>
    </div>
  )

  renderSearchPage = isDark => {
    const {searchPageStatus} = this.state
    switch (searchPageStatus) {
      case constSearchPageStatus.initial:
        return this.renderSearchPageInitial()
      case constSearchPageStatus.loading:
        return this.renderHomePageLoader()
      case constSearchPageStatus.success:
        return this.renderSearchResults(isDark)
      case constSearchPageStatus.failure:
        return this.renderSearchPageFailure()
      default:
        return this.renderHomePageLoader()
    }
  }

  renderHomePageStorySuccess = isDark => {
    const {homeStories} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <Slider {...settings}>
        {homeStories.map(each => (
          <div className="home-story" key={each.userId}>
            <Popup
              modal
              trigger={
                <img
                  src={each.storyUrl}
                  alt="user story"
                  className="home-story-img"
                />
              }
            >
              {close => (
                <div
                  className={
                    isDark ? 'story-popup dark-bg' : 'story-popup light-bg'
                  }
                >
                  <button
                    type="button"
                    className="close-popup-button"
                    onClick={() => close()}
                  >
                    a
                    <IoClose size={25} color={isDark ? 'white' : 'black'} />
                  </button>
                  <div className="story-popup-inner">
                    <img
                      src={each.storyUrl}
                      alt="user story"
                      className="story-expand-img"
                    />
                  </div>
                </div>
              )}
            </Popup>

            <p className={isDark ? 'story-name light' : 'story-name dark'}>
              {each.username}
            </p>
          </div>
        ))}
      </Slider>
    )
  }

  renderHomePage = () => {
    const {homePageStatus} = this.state
    switch (homePageStatus) {
      case constHomePageStatus.loading:
        return this.renderHomePageLoader()
      case constHomePageStatus.success:
        return this.renderHomePageSuccess()
      case constHomePageStatus.failure:
        return this.renderHomePageFailure()
      default:
        return this.renderHomePageLoader()
    }
  }

  renderHomePageStory = isDark => {
    const {homePageStoryStatus} = this.state
    switch (homePageStoryStatus) {
      case constHomePageStatus.loading:
        return this.renderHomePageLoader()
      case constHomePageStatus.success:
        return this.renderHomePageStorySuccess(isDark)
      case constHomePageStatus.failure:
        return this.renderHomePageStoryFailure(isDark)
      default:
        return this.renderHomePageLoader()
    }
  }

  render() {
    const {searchInput, searchCalled} = this.state
    return (
      <InstaShareContext.Consumer>
        {value => {
          const {isDark} = value
          const homeBgClassName = isDark
            ? 'home-bg dark-bg'
            : 'home-bg light-bg'
          return (
            <div className={homeBgClassName}>
              <Header
                searchCall={this.callSearchResults}
                makeSearchChange={this.changeSearchInput}
                searchValue={searchInput}
                smallSearch={this.changeSearchState}
              />
              <div className="home-contents">
                {searchCalled === true ? (
                  <>
                    <div className="search-results-search-container">
                      <button
                        className="back-button"
                        type="button"
                        onClick={this.searchBackClicked}
                      >
                        a
                        <IoMdArrowRoundBack size={25} color="black" />
                      </button>
                      <input
                        className="search"
                        type="search"
                        placeholder="Search Caption"
                        onChange={this.changeSearchInput}
                        value={searchInput}
                      />
                      <button
                        className="search-results-search-button"
                        type="button"
                        onClick={this.callSearchResults}
                        data-testid="searchIcon"
                      >
                        a<FaSearch size={20} />
                      </button>
                    </div>
                    {this.renderSearchPage(isDark)}
                  </>
                ) : (
                  <>
                    <div className="stories-slick-container">
                      {this.renderHomePageStory(isDark)}
                    </div>
                    {this.renderHomePage()}
                  </>
                )}
              </div>
            </div>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }
}

export default Home
