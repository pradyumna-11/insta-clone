import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
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
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderMyProfileFailure = () => (
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
        onClick={this.tryAgainMyProfilePage}
      >
        Try again
      </button>
    </div>
  )

  renderMyProfilePageSuccess = () => {
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
            <h1 className="my-profile-name">{myProfileDetails.userName}</h1>
            <div className="my-profile-status-container">
              <p className="my-profile-status-content">
                <span className="my-profile-status-count">
                  {myProfileDetails.postsCount}
                </span>
                posts
              </p>
              <p className="my-profile-status-content">
                <span className="my-profile-status-count">
                  {myProfileDetails.followersCount}
                </span>
                followers
              </p>
              <p className="my-profile-status-content">
                <span className="my-profile-status-count">
                  {myProfileDetails.followingCount}
                </span>
                following
              </p>
            </div>
            <p className="my-profile-user-id">{myProfileDetails.userName}</p>
            <p className="my-profile-description">
              {myProfileDetails.myProfileBio}
            </p>
          </div>
        </div>
        <div className="my-profile-small-top">
          <h1 className="my-profile-small-name">{myProfileDetails.userName}</h1>
          <div className="my-profile-img-status-container">
            <img
              src={myProfileDetails.profilePic}
              alt="my profile"
              className="my-profile-img"
            />
            <div className="my-profile-status-container">
              <p className="my-profile-status-content">
                <span className="my-profile-status-count">
                  {myProfileDetails.postsCount}
                </span>
                posts
              </p>
              <p className="my-profile-status-content">
                <span className="my-profile-status-count">
                  {myProfileDetails.followersCount}
                </span>
                followers
              </p>
              <p className="my-profile-status-content">
                <span className="my-profile-status-count">
                  {myProfileDetails.followingCount}
                </span>
                following
              </p>
            </div>
          </div>
          <p className="my-profile-user-id">{myProfileDetails.userId}</p>
          <p className="my-profile-description">
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
          <BsGrid3X3 size={25} />
          <h1 className="my-posts-heading">Posts</h1>
        </div>
        {myProfileDetails.postsCount === 0 ? (
          <div className="no-posts-container">
            <BiCamera size={40} />
            <h1 className="no-posts-content">No Posts</h1>
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

  renderMyProfilePage = () => {
    const {myProfilePageStatus} = this.state
    switch (myProfilePageStatus) {
      case myProfileConstStatus.loading:
        return this.renderMyProfilePageLoader()
      case myProfileConstStatus.success:
        return this.renderMyProfilePageSuccess()
      case myProfileConstStatus.failure:
        return this.renderMyProfileFailure()
      default:
        return this.renderMyProfilePageLoader()
    }
  }

  render() {
    return (
      <div className="my-profile-bg">
        <Header />
        <div className="my-profile-large-contents">
          {this.renderMyProfilePage()}
        </div>
      </div>
    )
  }
}

export default MyProfile
