import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {
  FaRegComment,
  FaWhatsappSquare,
  FaFacebookSquare,
  FaLinkedin,
  FaRegBookmark,
  FaBookmark,
} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import {IoClose, IoMail, IoSend} from 'react-icons/io5'

import Popup from 'reactjs-popup'

import InstaShareContext from '../InstaShareContext'

import './index.css'

const PostItem = props => {
  const {postItemDetails, addComment} = props
  const {
    postId,
    userId,
    userName,
    profilePic,
    postImageUrl,
    postCaption,
    likesCount,
    comments,
    createdAt,
  } = postItemDetails
  const clickedAddButton = () => {
    const inputEl = document.getElementById('comment')
    if (inputEl.value !== '') {
      addComment(userId, inputEl.value, postId, userName)
      inputEl.value = ''
    }
  }

  return (
    <InstaShareContext.Consumer>
      {value => {
        const {
          changeLikeStatus,
          likedPostsId,
          isDark,
          changeSavedPostsId,
          savedPostsId,
        } = value
        const postIndex = likedPostsId.indexOf(postId)
        const savedPostIndex = savedPostsId.indexOf(postId)
        const savedIcon =
          savedPostIndex === -1 ? (
            <FaRegBookmark size={25} color={isDark ? 'white' : 'black'} />
          ) : (
            <FaBookmark size={25} color={isDark ? 'white' : 'black'} />
          )
        const finalLikesCount = postIndex === -1 ? likesCount : likesCount + 1
        return (
          <li
            className={
              isDark ? 'post-card dark-bg no-border' : 'post-card light-bg'
            }
          >
            <div className="post-card-top">
              <img
                src={profilePic}
                alt="post author profile"
                className="post-card-profile-pic"
              />
              <p className="post-username">
                <Link
                  to={`/users/${userId}`}
                  className={
                    isDark
                      ? 'username-link-style light'
                      : 'username-link-style dark'
                  }
                >
                  {userName}
                </Link>
              </p>
            </div>
            <img src={postImageUrl} alt="post" className="post-img" />
            <div className="post-card-details-section">
              <div className="post-icons-container">
                {postIndex !== -1 ? (
                  <button
                    className="like-button"
                    type="button"
                    onClick={() => changeLikeStatus(postId, false)}
                    data-testid="unLikeIcon"
                  >
                    a<FcLike size={25} color={isDark ? '#ffffff' : '#000000'} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="like-button"
                    onClick={() => changeLikeStatus(postId, true)}
                    data-testid="likeIcon"
                  >
                    a
                    <BsHeart size={25} color={isDark ? '#ffffff' : '#000000'} />
                  </button>
                )}

                <button
                  className="comment-button"
                  type="button"
                  onClick={clickedAddButton}
                >
                  a
                  <FaRegComment
                    size={25}
                    color={isDark ? '#ffffff' : '#000000'}
                  />
                </button>
                <Popup
                  modal
                  trigger={
                    <button type="button" className="share-button">
                      a
                      <BiShareAlt
                        size={25}
                        color={isDark ? '#ffffff' : '#000000'}
                      />
                    </button>
                  }
                >
                  {close => (
                    <>
                      <div
                        className={
                          isDark
                            ? 'share-popup-container dark-bg light-border'
                            : 'share-popup-container light-bg dark-border'
                        }
                      >
                        <button
                          type="button"
                          className="close-popup-button"
                          onClick={() => close()}
                        >
                          a
                          <IoClose
                            size={25}
                            color={isDark ? 'white' : 'black'}
                          />
                        </button>
                        <div className="popup-options-container">
                          <a
                            href="https://web.whatsapp.com/"
                            className={
                              isDark
                                ? 'share-option light'
                                : 'share-option dark'
                            }
                          >
                            <FaWhatsappSquare size={40} color="green" />
                            Whatsapp
                          </a>
                          <a
                            href="https://www.facebook.com/"
                            className={
                              isDark
                                ? 'share-option light'
                                : 'share-option dark'
                            }
                          >
                            <FaFacebookSquare size={40} color="blue" />
                            Facebook
                          </a>
                          <a
                            href="https://www.linkedin.com/"
                            className={
                              isDark
                                ? 'share-option light'
                                : 'share-option dark'
                            }
                          >
                            <FaLinkedin size={40} color="blue" />
                            LinkedIn
                          </a>
                          <a
                            href="https://mail.google.com/"
                            className={
                              isDark
                                ? 'share-option light'
                                : 'share-option dark'
                            }
                          >
                            <IoMail
                              size={40}
                              color={isDark ? 'white' : 'black'}
                            />
                            Email
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </Popup>
                <button
                  type="button"
                  className="save-button"
                  onClick={() => changeSavedPostsId(postId)}
                >
                  a {savedIcon}
                </button>
              </div>

              <p className={isDark ? 'likes-count light' : 'likes-count dark'}>
                {finalLikesCount} likes
              </p>
              <p className={isDark ? 'caption light' : 'caption dark'}>
                {postCaption}
              </p>
              <ul className="comments-container">
                {comments.map(each => (
                  <li key={each.userId} className="comment">
                    <p
                      className={
                        isDark
                          ? 'comment-content light'
                          : 'comment-content dark'
                      }
                    >
                      <span
                        className={
                          isDark
                            ? 'comment-username light'
                            : 'comment-username dark'
                        }
                      >
                        {each.userName}
                      </span>
                      {each.comment}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="add-comment-container">
                <input
                  type="text"
                  placeholder="Add a comment"
                  className={
                    isDark
                      ? 'comment-input-style light'
                      : 'comment-input-style dark'
                  }
                  id="comment"
                />
                <button
                  className="send-button"
                  type="button"
                  onClick={clickedAddButton}
                >
                  a<IoSend size={20} color={isDark ? 'white' : 'black'} />
                </button>
              </div>
              <p className="post-publish">{createdAt}</p>
            </div>
          </li>
        )
      }}
    </InstaShareContext.Consumer>
  )
}

export default PostItem
