import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import InstaShareContext from '../InstaShareContext'
import './index.css'

const PostItem = props => {
  const {postItemDetails} = props
  const {
    postId,
    userName,
    profilePic,
    postImageUrl,
    postCaption,
    likesCount,
    comments,
    createdAt,
  } = postItemDetails

  return (
    <InstaShareContext.Consumer>
      {value => {
        const {changeLikeStatus, likedPostsId} = value
        const postIndex = likedPostsId.indexOf(postId)
        return (
          <li className="post-card">
            <div className="post-card-top">
              <img
                src={profilePic}
                alt="post author profile"
                className="post-card-profile-pic"
              />
              <p className="post-username">{userName}</p>
            </div>
            <img src={postImageUrl} alt="post" className="post-img" />
            <div className="post-card-details-section">
              <div className="post-icons-container">
                {postIndex !== -1 ? (
                  <button
                    className="like-button"
                    type="button"
                    onClick={() => changeLikeStatus(postId, false)}
                  >
                    a<FcLike size={25} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="like-button"
                    onClick={() => changeLikeStatus(postId, true)}
                  >
                    a<BsHeart size={25} />
                  </button>
                )}

                <button className="comment-button" type="button">
                  a <FaRegComment size={25} />
                </button>
                <button type="button" className="share-button">
                  a <BiShareAlt size={25} />
                </button>
              </div>
              <p className="likes-count">{likesCount} likes</p>
              <p className="caption">{postCaption}</p>
              <ul className="comments-container">
                {comments.map(each => (
                  <li key={each.userId} className="comment">
                    <p className="comment-content">
                      <span className="comment-username">{each.userName}</span>
                      {each.comment}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="post-publish">{createdAt}</p>
            </div>
          </li>
        )
      }}
    </InstaShareContext.Consumer>
  )
}

export default PostItem
