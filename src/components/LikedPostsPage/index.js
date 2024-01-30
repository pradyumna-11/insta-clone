import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import PostItem from '../PostItem'
import Header from '../Header'
import InstaShareContext from '../InstaShareContext'

import './index.css'

const constLikedPostsPageStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class LikedPostsPage extends Component {
  state = {
    likedPostsInitialList: [],
    likedPostsPageStatus: constLikedPostsPageStatus.loading,
  }

  componentDidMount() {
    this.getAllPosts()
  }

  getAllPosts = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({likedPostsPageStatus: constLikedPostsPageStatus.loading})
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
        likedPostsInitialList: posts,
        likedPostsPageStatus: constLikedPostsPageStatus.success,
      })
    } else {
      this.setState({likedPostsPageStatus: constLikedPostsPageStatus.failure})
    }
  }

  renderLikedPostsPageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderLikedPostsPageFailure = isDark => (
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

  renderLikedPageSuccess = likedPostsId => {
    const {likedPostsInitialList} = this.state
    const finalLikedPostsList = likedPostsInitialList.filter(
      each => likedPostsId.indexOf(each.postId) !== -1,
    )
    return (
      <>
        {finalLikedPostsList.length === 0 ? (
          <div className="no-liked-posts-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved posts"
              className="no-liked-posts-img"
            />
            <p className="no-liked-posts-description">No Liked Posts Yet</p>
          </div>
        ) : (
          <ul className="liked-posts-container">
            {finalLikedPostsList.map(each => (
              <PostItem key={each.id} postItemDetails={each} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderLikedPostsPage = (isDark, likedPostsId) => {
    const {likedPostsPageStatus} = this.state
    switch (likedPostsPageStatus) {
      case constLikedPostsPageStatus.loading:
        return this.renderLikedPostsPageLoader()
      case constLikedPostsPageStatus.success:
        return this.renderLikedPageSuccess(likedPostsId)
      case constLikedPostsPageStatus.failure:
        return this.renderLikedPostsPageFailure(isDark)
      default:
        return null
    }
  }

  render() {
    return (
      <InstaShareContext.Consumer>
        {value => {
          const {likedPostsId, isDark} = value

          return (
            <div
              className={
                isDark
                  ? 'liked-posts-page-bg dark-bg'
                  : 'liked-posts-page-bg light-bg'
              }
            >
              <Header />
              <div className="liked-posts-inner">
                <h1
                  className={
                    isDark
                      ? 'liked-posts-heading light'
                      : 'liked-posts-heading dark'
                  }
                >
                  Liked Posts
                </h1>
                {this.renderLikedPostsPage(isDark, likedPostsId)}
              </div>
            </div>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }
}

export default LikedPostsPage
