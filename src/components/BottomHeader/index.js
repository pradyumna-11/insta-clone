import {BsHeart} from 'react-icons/bs'
import {FaBookmark} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import InstaShareContext from '../InstaShareContext'

import './index.css'

const BottomHeader = () => (
  <InstaShareContext.Consumer>
    {value => {
      const {isDark} = value
      return (
        <nav
          className={
            isDark ? 'bottom-navbar dark-bg' : 'bottom-navbar light-bg'
          }
        >
          <ul className="bottom-navbar-items-container">
            <li className="bottom-navbar-item">
              <Link to="/saved-posts" className="profile-bottom-link">
                <FaBookmark size={25} color={isDark ? 'white' : 'black'} />
              </Link>
            </li>
            <li className="bottom-navbar-item">
              <Link to="/liked-posts" className="profile-bottom-link">
                <BsHeart size={25} color={isDark ? 'white' : 'black'} />
              </Link>
            </li>
          </ul>
        </nav>
      )
    }}
  </InstaShareContext.Consumer>
)

export default BottomHeader
