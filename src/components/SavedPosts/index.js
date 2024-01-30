import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import PostItem from '../PostItem'
import Header from '../Header'
import InstaShareContext from '../InstaShareContext'

import './index.css'

const constSavedPostsPageStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SavedPosts extends Component {
  state = {
    savedPostsList: [],
    savedPostsPageStatus: constSavedPostsPageStatus.loading,
  }

  componentDidMount() {
    this.getAllPosts()
  }

  getAllPosts = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({savedPostsPageStatus: constSavedPostsPageStatus.loading})
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
      this.setState({
        savedPostsList: posts,
        savedPostsPageStatus: constSavedPostsPageStatus.success,
      })
    } else {
      this.setState({savedPostsPageStatus: constSavedPostsPageStatus.failure})
    }
  }

  renderSavedPostsPageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSavedPostsPageFailure = isDark => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/daxizvsge/image/upload/v1705386860/alert-triangle_wng4nt.png"
        alt="failure view"
        className="failure-img"
      />
      <p className={isDark ? 'failure-txt light' : 'failure-txt dark'}>
        Something went wrong. Please try again
      </p>
      <button
        className={isDark ? 'try-again-button light' : 'try-again-button dark'}
        type="button"
        onClick={() => this.getAllPosts()}
      >
        Try again
      </button>
    </div>
  )

  renderSavedPageSuccess = savedPostsId => {
    const {savedPostsList} = this.state
    const finalSavedPostsList = savedPostsList.filter(
      each => savedPostsId.indexOf(each.postId) !== -1,
    )
    return (
      <>
        {finalSavedPostsList.length === 0 ? (
          <div className="no-saved-posts-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved posts"
              className="no-saved-posts-img"
            />
            <p className="no-saved-posts-description">No Saved Posts Yet</p>
          </div>
        ) : (
          <ul className="saved-posts-container">
            {finalSavedPostsList.map(each => (
              <PostItem key={each.id} postItemDetails={each} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderSavedPostsPage = (isDark, savedPostsId) => {
    const {savedPostsPageStatus} = this.state
    switch (savedPostsPageStatus) {
      case constSavedPostsPageStatus.loading:
        return this.renderSavedPostsPageLoader()
      case constSavedPostsPageStatus.success:
        return this.renderSavedPageSuccess(savedPostsId)
      case constSavedPostsPageStatus.failure:
        return this.renderSavedPostsPageFailure(isDark)
      default:
        return null
    }
  }

  render() {
    return (
      <InstaShareContext.Consumer>
        {value => {
          const {savedPostsId, isDark} = value

          return (
            <div
              className={
                isDark
                  ? 'saved-posts-page-bg dark-bg'
                  : 'saved-posts-page-bg light-bg'
              }
            >
              <Header />
              <div className="saved-posts-inner">
                <h1
                  className={
                    isDark
                      ? 'saved-posts-heading light'
                      : 'saved-posts-heading dark'
                  }
                >
                  Saved Posts
                </h1>
                {this.renderSavedPostsPage(isDark, savedPostsId)}
              </div>
            </div>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }
}

export default SavedPosts
