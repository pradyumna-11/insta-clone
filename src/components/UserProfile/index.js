import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'

import Header from '../Header'

import './index.css'

const userProfileConstStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    userProfileDetails: {},
    userProfilePageStatus: userProfileConstStatus.loading,
  }

  componentDidMount() {
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({userProfilePageStatus: userProfileConstStatus.loading})
    const {match} = this.props
    const {params} = match
    const {userId} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/users/${userId}`,
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updatedUserProfileDetails = {
        id: data.user_details.id,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        userProfilePic: data.user_details.profile_pic,
        userFollowersCount: data.user_details.followers_count,
        userFollowingCount: data.user_details.following_count,
        userPostsCount: data.user_details.posts_count,
        userBio: data.user_details.user_bio,
        userProfilePosts: data.user_details.posts.map(eachPost => ({
          userPostId: eachPost.id,
          userPostImage: eachPost.image,
        })),
        userProfileStories: data.user_details.stories.map(eachStory => ({
          userStoryId: eachStory.id,
          userStoryImage: eachStory.image,
        })),
      }
      this.setState({
        userProfileDetails: updatedUserProfileDetails,
        userProfilePageStatus: userProfileConstStatus.success,
      })
    } else {
      this.setState({userProfilePageStatus: userProfileConstStatus.failure})
    }
  }

  tryAgainUserProfilePage = () => {
    this.getUserProfileDetails()
  }

  renderUserProfilePageLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderUserProfilePageSuccess = () => {
    const {userProfileDetails} = this.state
    console.log(userProfileDetails.userBio)
    return (
      <>
        <div className="user-profile-top">
          <div className="user-profile-heading-container">
            <h1 className="user-profile-name">{userProfileDetails.userName}</h1>
          </div>
          <div className="user-profile-img-status-containers">
            <img
              src={userProfileDetails.userProfilePic}
              alt="user profile"
              className="user-profile-img"
            />
            <div className="user-profile-status-container">
              <p className="user-profile-status-content">
                <span className="user-profile-status-count">
                  {userProfileDetails.userPostsCount}
                </span>
                posts
              </p>
              <p className="user-profile-status-content">
                <span className="user-profile-status-count">
                  {userProfileDetails.userFollowersCount}
                </span>
                followers
              </p>
              <p className="user-profile-status-content">
                <span className="user-profile-status-count">
                  {userProfileDetails.userFollowingCount}
                </span>
                following
              </p>
            </div>
          </div>
          <div className="user-profile-bio-container">
            <p className="user-profile-id">{userProfileDetails.userId}</p>
            <p className="user-profile-description">
              {userProfileDetails.userBio}
            </p>
          </div>
        </div>
        <ul className="user-profile-stories">
          {userProfileDetails.userProfileStories.map(each => (
            <li key={each.userStoryId} className="my-profile-story">
              <img
                src={each.userStoryImage}
                alt="user story"
                className="user-profile-story-img"
              />
            </li>
          ))}
        </ul>
        <hr className="line" />
        <div className="user-profile-posts-heading-container">
          <BsGrid3X3 size={25} />
          <h1 className="user-posts-heading">Posts</h1>
        </div>
        {userProfileDetails.userPostsCount === 0 ? (
          <div className="no-posts-container">
            <BiCamera size={40} />
            <h1 className="no-posts-content">No Posts</h1>
          </div>
        ) : (
          <ul className="user-profile-posts-container">
            {userProfileDetails.userProfilePosts.map(each => (
              <li key={each.userPostId} className="user-profile-post">
                <img
                  src={each.userPostImage}
                  alt="user post"
                  className="user-profile-post-img"
                />
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  renderUserProfileFailure = () => (
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
        onClick={this.tryAgainUserProfilePage}
      >
        Try again
      </button>
    </div>
  )

  renderUserProfilePage = () => {
    const {userProfilePageStatus} = this.state
    switch (userProfilePageStatus) {
      case userProfileConstStatus.loading:
        return this.renderUserProfilePageLoader()
      case userProfileConstStatus.success:
        return this.renderUserProfilePageSuccess()
      case userProfileConstStatus.failure:
        return this.renderUserProfileFailure()
      default:
        return this.renderUserProfilePageLoader()
    }
  }

  render() {
    return (
      <div className="user-profile-bg">
        <Header />
        <div className="user-profile-large-contents">
          {this.renderUserProfilePage()}
        </div>
      </div>
    )
  }
}

export default UserProfile
