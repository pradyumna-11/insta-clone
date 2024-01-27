import {FaSearch, FaMoon} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdCloseCircle} from 'react-icons/io'
import {IoSunnyOutline} from 'react-icons/io5'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import InstaShareContext from '../InstaShareContext'

import './index.css'

const Header = props => {
  const {searchCall, makeSearchChange, searchValue, smallSearch} = props
  const logoutUser = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  const searchClicked = () => {
    searchCall()
  }

  const changeInput = event => {
    makeSearchChange(event)
  }

  return (
    <InstaShareContext.Consumer>
      {value => {
        const {
          activeSmallNav,
          toggleSmallNav,
          activeTab,
          changeActiveTab,
          isDark,
          toggleTheme,
        } = value
        const optionsClassName =
          activeSmallNav === true
            ? 'nav-small-options'
            : 'nav-small-options nav-options-close'
        const changeTheme = () => {
          toggleTheme()
        }
        const headerHeadingClassName = isDark
          ? 'header-heading light'
          : 'header-heading dark'
        const navbarClassName = isDark ? 'navbar dark-bg' : 'navbar light-bg'

        return (
          <nav className={navbarClassName}>
            <div className="nav-large">
              <div className="nav-large-left">
                <Link to="/" className="link-logo out ">
                  <img
                    src="https://res.cloudinary.com/daxizvsge/image/upload/v1705303029/logo_p5ezce.png"
                    alt="website logo"
                    className="header-logo"
                  />
                </Link>

                <h1 className={headerHeadingClassName}>
                  <Link
                    to="/"
                    className={isDark ? 'link-style light' : 'link-style dark'}
                  >
                    Insta Share
                  </Link>
                </h1>
              </div>
              <div className="nav-large-right">
                <button
                  type="button"
                  className="theme-button"
                  onClick={changeTheme}
                >
                  a
                  {isDark ? (
                    <FaMoon size={25} color={isDark ? '#ffffff' : '#000000'} />
                  ) : (
                    <IoSunnyOutline size={25} />
                  )}
                </button>
                <div className="search-container">
                  <input
                    type="search"
                    placeholder="Search Caption"
                    className="search-bar"
                    onChange={changeInput}
                    value={searchValue}
                  />
                  <button
                    type="button"
                    className="search-button"
                    onClick={searchClicked}
                    data-testid="searchIcon"
                  >
                    a <FaSearch size={14} color="#989898" />
                  </button>
                </div>
                <ul className="nav-items-container">
                  <li
                    className="nav-item"
                    onClick={() => changeActiveTab('HOME')}
                  >
                    <Link
                      className={
                        activeTab === 'HOME'
                          ? 'link-style active'
                          : 'link-style'
                      }
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => changeActiveTab('PROFILE')}
                  >
                    <Link
                      className={
                        activeTab === 'PROFILE'
                          ? 'link-style active'
                          : 'link-style'
                      }
                      to="/my-profile"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  className="logout-button"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="nav-small">
              <div className="nav-small-left">
                <img
                  src="https://res.cloudinary.com/daxizvsge/image/upload/v1705303029/logo_p5ezce.png"
                  alt="website logo"
                  className="header-logo"
                />
                <h1 className={headerHeadingClassName}>Insta Share</h1>
              </div>
              <button
                type="button"
                className="nav-menu-button"
                onClick={() => toggleSmallNav(true)}
              >
                a<GiHamburgerMenu color="black" size={25} />
              </button>
            </div>
            <div className={optionsClassName}>
              <ul className="nav-items-container">
                <li
                  className="nav-item"
                  onClick={() => changeActiveTab('HOME')}
                >
                  <Link
                    className={
                      activeTab === 'HOME' ? 'link-style active' : 'link-style'
                    }
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    smallSearch()
                    changeActiveTab('SEARCH')
                  }}
                >
                  <Link
                    className={
                      activeTab === 'SEARCH'
                        ? 'link-style active'
                        : 'link-style'
                    }
                    to="/"
                  >
                    Search
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => changeActiveTab('PROFILE')}
                >
                  <Link
                    className={
                      activeTab === 'PROFILE'
                        ? 'link-style active'
                        : 'link-style'
                    }
                    to="/my-profile"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="logout-button small-logout"
                onClick={logoutUser}
              >
                Logout
              </button>
              <button
                type="button"
                className="theme-button"
                onClick={changeTheme}
              >
                a
                {isDark ? (
                  <FaMoon size={25} color={isDark ? '#ffffff' : '#000000'} />
                ) : (
                  <IoSunnyOutline size={25} />
                )}
              </button>
              <button
                className="close-button"
                type="button"
                onClick={() => toggleSmallNav(false)}
              >
                a
                <IoMdCloseCircle color={isDark ? 'white' : 'black'} size={25} />
              </button>
            </div>
          </nav>
        )
      }}
    </InstaShareContext.Consumer>
  )
}

export default withRouter(Header)
