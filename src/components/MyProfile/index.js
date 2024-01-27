import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import InstaShareContext from '../InstaShareContext'
import Header from '../Header'

import './index.css'

const myProfileConstStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {
    myProfileDetails: {},
    myProfilePageStatus: myProfileConstStatus.loading,
  }

  componentDidMount() {
    this.getMyProfileDetails()
  }

  getMyProfileDetails = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({myProfilePageStatus: myProfileConstStatus.loading})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/insta-share/my-profile',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      const {profile} = data
      const updatedMyProfileDetails = {
        id: profile.id,
        userId: profile.user_id,
        userName: profile.user_name,
        profilePic: profile.profile_pic,
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        postsCount: profile.posts_count,
        myProfileBio: profile.user_bio,
        myProfilePosts: profile.posts.map(eachPost => ({
          postId: eachPost.id,
          postImage: eachPost.image,
        })),
        myProfileStories: profile.stories.map(eachStory => ({
          storyId: eachStory.id,
          storyImage: eachStory.image,
        })),
      }
      console.log(updatedMyProfileDetails)
      this.setState({
        myProfileDetails: updatedMyProfileDetails,
        myProfilePageStatus: myProfileConstStatus.success,
      })
    } else {
      this.setState({myProfilePageStatus: myProfileConstStatus.failure})
    }
  }

  tryAgainMyProfilePage = () => {
    this.getMyProfileDetails()
  }

  renderMyProfilePageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderMyProfileFailure = isDark => (
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
        onClick={this.tryAgainMyProfilePage}
      >
        Try again
      </button>
    </div>
  )

  renderMyProfilePageSuccess = isDark => {
    const {myProfileDetails} = this.state
    return (
      <>
        <div className="profile-top">
          <img
            src={myProfileDetails.profilePic}
            alt="my profile"
            className="my-profile-img"
          />
          <div className="my-profile-details">
            <h1
              className={
                isDark ? 'my-profile-name light' : 'my-profile-name dark'
              }
            >
              {myProfileDetails.userName}
            </h1>
            <div className="my-profile-status-container">
              <p
                className={
                  isDark
                    ? 'my-profile-status-content light'
                    : 'my-profile-status-content dark'
                }
              >
                <span
                  className={
                    isDark
                      ? 'my-profile-status-count light'
                      : 'my-profile-status-count dark'
                  }
                >
                  {myProfileDetails.postsCount}
                </span>
                posts
              </p>
              <p
                className={
                  isDark
                    ? 'my-profile-status-content light'
                    : 'my-profile-status-content dark'
                }
              >
                <span
                  className={
                    isDark
                      ? 'my-profile-status-count light'
                      : 'my-profile-status-count dark'
                  }
                >
                  {myProfileDetails.followersCount}
                </span>
                followers
              </p>
              <p
                className={
                  isDark
                    ? 'my-profile-status-content light'
                    : 'my-profile-status-content dark'
                }
              >
                <span
                  className={
                    isDark
                      ? 'my-profile-status-count light'
                      : 'my-profile-status-count dark'
                  }
                >
                  {myProfileDetails.followingCount}
                </span>
                following
              </p>
            </div>
            <p
              className={
                isDark ? 'my-profile-user-id light' : 'my-profile-user-id dark'
              }
            >
              {myProfileDetails.userName}
            </p>
            <p
              className={
                isDark
                  ? 'my-profile-description light'
                  : 'my-profile-description dark'
              }
            >
              {myProfileDetails.myProfileBio}
            </p>
          </div>
        </div>
        <div className="my-profile-small-top">
          <h1
            className={
              isDark
                ? 'my-profile-small-name light'
                : 'my-profile-small-name dark'
            }
          >
            {myProfileDetails.userName}
          </h1>
          <div className="my-profile-img-status-container">
            <img
              src={myProfileDetails.profilePic}
              alt="my profile"
              className="my-profile-img"
            />
            <div className="my-profile-status-container">
              <p
                className={
                  isDark
                    ? 'my-profile-status-content light'
                    : 'my-profile-status-content dark'
                }
              >
                <span
                  className={
                    isDark
                      ? 'my-profile-status-count light'
                      : 'my-profile-status-count dark'
                  }
                >
                  {myProfileDetails.postsCount}
                </span>
                posts
              </p>
              <p
                className={
                  isDark
                    ? 'my-profile-status-content light'
                    : 'my-profile-status-content dark'
                }
              >
                <span
                  className={
                    isDark
                      ? 'my-profile-status-count light'
                      : 'my-profile-status-count dark'
                  }
                >
                  {myProfileDetails.followersCount}
                </span>
                followers
              </p>
              <p
                className={
                  isDark
                    ? 'my-profile-status-content light'
                    : 'my-profile-status-content dark'
                }
              >
                <span
                  className={
                    isDark
                      ? 'my-profile-status-count light'
                      : 'my-profile-status-count dark'
                  }
                >
                  {myProfileDetails.followingCount}
                </span>
                following
              </p>
            </div>
          </div>
          <p
            className={
              isDark ? 'my-profile-user-id light' : 'my-profile-user-id dark'
            }
          >
            {myProfileDetails.userId}
          </p>
          <p
            className={
              isDark
                ? 'my-profile-description light'
                : 'my-profile-description dark'
            }
          >
            {myProfileDetails.myProfileBio}
          </p>
        </div>
        <ul className="my-profile-stories">
          {myProfileDetails.myProfileStories.map(each => (
            <li key={each.storyId} className="my-profile-story">
              <img
                src={each.storyImage}
                alt="my story"
                className="my-profile-story-img"
              />
            </li>
          ))}
        </ul>
        <hr className="line" />
        <div className="my-profile-posts-heading-container">
          <BsGrid3X3 size={25} color={isDark ? 'white' : 'black'} />
          <h1
            className={
              isDark ? 'my-posts-heading light' : 'my-posts-heading dark'
            }
          >
            Posts
          </h1>
        </div>
        {myProfileDetails.postsCount === 0 ? (
          <div className="no-posts-container">
            <BiCamera size={40} />
            <h1
              className={
                isDark ? 'no-posts-content light' : 'no-posts-content dark'
              }
            >
              No Posts
            </h1>
          </div>
        ) : (
          <ul className="my-profile-posts-container">
            {myProfileDetails.myProfilePosts.map(each => (
              <li key={each.postId} className="my-profile-post">
                <img
                  src={each.postImage}
                  alt="my post"
                  className="my-profile-post-img"
                />
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  renderMyProfilePage = isDark => {
    const {myProfilePageStatus} = this.state
    switch (myProfilePageStatus) {
      case myProfileConstStatus.loading:
        return this.renderMyProfilePageLoader()
      case myProfileConstStatus.success:
        return this.renderMyProfilePageSuccess(isDark)
      case myProfileConstStatus.failure:
        return this.renderMyProfileFailure(isDark)
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
                isDark ? 'my-profile-bg dark-bg' : 'my-profile-bg light-bg'
              }
            >
              <Header />
              <div className="my-profile-large-contents">
                {this.renderMyProfilePage(isDark)}
              </div>
            </div>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }
}

export default MyProfile
