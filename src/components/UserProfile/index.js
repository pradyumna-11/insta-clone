import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'
import {IoClose} from 'react-icons/io5'

import Popup from 'reactjs-popup'
import InstaShareContext from '../InstaShareContext'

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
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderUserProfilePageSuccess = isDark => {
    const {userProfileDetails} = this.state
    return (
      <>
        <div className="user-profile-top">
          <Popup
            modal
            trigger={
              <img
                src={userProfileDetails.userProfilePic}
                alt="user profile"
                className="user-profile-img"
              />
            }
          >
            {close => (
              <div className="user-profile-img-popup">
                <button
                  type="button"
                  className="close-popup-button"
                  onClick={() => close()}
                >
                  a
                  <IoClose size={25} color={isDark ? 'white' : 'black'} />
                </button>
                <div className="user-profile-img-popup-inner">
                  <img
                    src={userProfileDetails.userProfilePic}
                    alt="user profile"
                    className="user-profile-popup-img-style"
                  />
                </div>
              </div>
            )}
          </Popup>

          <div className="user-profile-details">
            <h1
              className={
                isDark ? 'user-profile-name light' : 'user-profile-name dark'
              }
            >
              {userProfileDetails.userName}
            </h1>
            <div className="user-profile-status-container">
              <p
                className={
                  isDark
                    ? 'user-profile-status-content light'
                    : 'user-profile-status-content dark'
                }
              >
                <span
                  className={
                    isDark
                      ? 'user-profile-status-count light'
                      : 'user-profile-status-count dark'
                  }
                >
                  {userProfileDetails.userPostsCount}
                </span>
                posts
              </p>
              <p
                className={
                  isDark
                    ? 'user-profile-status-content light'
                    : 'user-profile-status-content dark'
                }
              >
                <span
                  className={
                    isDark
                      ? 'user-profile-status-count light'
                      : 'user-profile-status-count dark'
                  }
                >
                  {userProfileDetails.userFollowersCount}
                </span>
                followers
              </p>
              <p
                className={
                  isDark
                    ? 'user-profile-status-content light'
                    : 'user-profile-status-content dark'
                }
              >
                <span
                  className={
                    isDark
                      ? 'user-profile-status-count light'
                      : 'user-profile-status-count dark'
                  }
                >
                  {userProfileDetails.userFollowingCount}
                </span>
                following
              </p>
            </div>
            <p
              className={
                isDark ? 'user-profile-id light' : 'user-profile-id dark'
              }
            >
              {userProfileDetails.userId}
            </p>
            <p
              className={
                isDark
                  ? 'user-profile-description light'
                  : 'user-profile-description dark'
              }
            >
              {userProfileDetails.userBio}
            </p>
          </div>
        </div>
        <div className="user-profile-small-top">
          <h1
            className={
              isDark
                ? 'user-profile-small-name light'
                : 'user-profile-small-name dark'
            }
          >
            {userProfileDetails.userName}
          </h1>
          <div className="user-profile-img-status-container">
            <Popup
              modal
              trigger={
                <img
                  src={userProfileDetails.userProfilePic}
                  alt="user profile"
                  className="user-profile-img"
                />
              }
            >
              {close => (
                <div className="user-profile-img-popup">
                  <button
                    type="button"
                    className="close-popup-button"
                    onClick={() => close()}
                  >
                    a
                    <IoClose size={25} color={isDark ? 'white' : 'black'} />
                  </button>
                  <div className="user-profile-img-popup-inner">
                    <img
                      src={userProfileDetails.userProfilePic}
                      alt="user profile"
                      className="user-profile-popup-img-style"
                    />
                  </div>
                </div>
              )}
            </Popup>

            <div className="user-profile-status-container">
              <p
                className={
                  isDark
                    ? 'user-profile-status-content light'
                    : 'user-profile-status-content dark'
                }
              >
                <span
                  className={
                    isDark
                      ? 'user-profile-status-count light'
                      : 'user-profile-status-count dark'
                  }
                >
                  {userProfileDetails.userPostsCount}
                </span>
                posts
              </p>
              <p
                className={
                  isDark
                    ? 'user-profile-status-content light'
                    : 'user-profile-status-content dark'
                }
              >
                <span
                  className={
                    isDark
                      ? 'user-profile-status-count light'
                      : 'user-profile-status-count dark'
                  }
                >
                  {userProfileDetails.userFollowersCount}
                </span>
                followers
              </p>
              <p
                className={
                  isDark
                    ? 'user-profile-status-content light'
                    : 'user-profile-status-content dark'
                }
              >
                <span
                  className={
                    isDark
                      ? 'user-profile-status-count light'
                      : 'user-profile-status-count dark'
                  }
                >
                  {userProfileDetails.userFollowingCount}
                </span>
                following
              </p>
            </div>
          </div>
          <p
            className={
              isDark ? 'user-profile-id light' : 'user-profile-id dark'
            }
          >
            {userProfileDetails.userId}
          </p>
          <p
            className={
              isDark
                ? 'user-profile-description light'
                : 'user-profile-description dark'
            }
          >
            {userProfileDetails.userBio}
          </p>
        </div>
        <ul className="user-profile-stories">
          {userProfileDetails.userProfileStories.map(each => (
            <li key={each.userStoryId} className="my-profile-story">
              <Popup
                modal
                trigger={
                  <img
                    src={each.userStoryImage}
                    alt="user story"
                    className="user-profile-story-img"
                  />
                }
              >
                {close => (
                  <div className="user-profile-img-popup">
                    <button
                      type="button"
                      className="close-popup-button"
                      onClick={() => close()}
                    >
                      a
                      <IoClose size={25} color={isDark ? 'white' : 'black'} />
                    </button>
                    <div className="user-profile-img-popup-inner">
                      <img
                        src={each.userStoryImage}
                        alt="user story"
                        className="user-profile-popup-img-style"
                      />
                    </div>
                  </div>
                )}
              </Popup>
            </li>
          ))}
        </ul>
        <hr className="line" />
        <div className="user-profile-posts-heading-container">
          <BsGrid3X3 size={25} color={isDark ? 'white' : 'black'} />
          <h1
            className={
              isDark ? 'user-posts-heading light' : 'user-posts-heading dark'
            }
          >
            Posts
          </h1>
        </div>
        {userProfileDetails.userPostsCount === 0 ? (
          <div className="no-posts-container">
            <BiCamera size={40} />
            <h1 className="no-posts-content">No Posts Yet</h1>
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

  renderUserProfileFailure = isDark => (
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
        className="try-again-button"
        type="button"
        onClick={this.tryAgainUserProfilePage}
      >
        Try again
      </button>
    </div>
  )

  renderUserProfilePage = isDark => {
    const {userProfilePageStatus} = this.state
    switch (userProfilePageStatus) {
      case userProfileConstStatus.loading:
        return this.renderUserProfilePageLoader()
      case userProfileConstStatus.success:
        return this.renderUserProfilePageSuccess(isDark)
      case userProfileConstStatus.failure:
        return this.renderUserProfileFailure(isDark)
      default:
        return null
    }
  }

  render() {
    return (
      <InstaShareContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div
              className={
                isDark ? 'user-profile-bg dark-bg' : 'user-profile-bg light-bg'
              }
            >
              <Header />
              <div className="user-profile-large-contents">
                {this.renderUserProfilePage(isDark)}
              </div>
            </div>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }
}

export default UserProfile
