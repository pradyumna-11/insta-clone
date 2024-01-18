import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'

import Header from '../Header'

import './index.css'

class MyProfile extends Component {
  state = {myProfileDetails: {}}

  componentDidMount() {
    this.getMyProfileDetails()
  }

  getMyProfileDetails = async () => {
    const token = Cookies.get('jwt_token')
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
    const {profile} = data
    const updatedMyProfileDetails = {
      id: profile.id,
      userId: profile.user_id,
      userName: profile.user_name,
      profilePic: profile.profile_pic,
      followersCount: profile.followers_count,
      followingCount: profile.following_count,
      postsCount: profile.posts_count,
      userBio: profile.user_bio,
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
    this.setState({myProfileDetails: updatedMyProfileDetails})
  }

  render() {
    const {myProfileDetails} = this.state
    myProfileDetails.myProfileStories.map(eachStory => console.log(eachStory))
    return (
      <div className="my-profile-bg">
        <Header />
        <div className="my-profile-large-contents">
          <div className="profile-top">
            <img
              src={myProfileDetails.profilePic}
              alt="profile pic"
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
              <p className="my-profile-small-name">
                {myProfileDetails.userName}
              </p>
              <p className="my-profile-description">
                {myProfileDetails.userBio}
              </p>
            </div>
          </div>

          <hr className="line" />
          <div className="my-profile-posts-heading-container">
            <BsGrid3X3 size={25} />
            <h1 className="my-posts-heading">Posts</h1>
          </div>
        </div>
        <div className="my-profile-small-contents">
          <div className="my-profile-small-top">
            <p className="my-profile-small-name">{myProfileDetails.userName}</p>
            <div className="my-profile-img-status-container">
              <img
                src={myProfileDetails.profilePic}
                alt="profile-pic"
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
            <h1 className="my-profile-name">{myProfileDetails.userName}</h1>
            <p className="my-profile-description">{myProfileDetails.userBio}</p>

            <hr className="line" />
          </div>
          <div className="my-profile-posts-heading-container">
            <BsGrid3X3 size={25} />
            <h1 className="my-posts-heading">Posts</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default MyProfile
