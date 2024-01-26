import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdCloseCircle} from 'react-icons/io'
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
        } = value
        const optionsClassName =
          activeSmallNav === true
            ? 'nav-small-options'
            : 'nav-small-options nav-options-close'

        return (
          <nav className="navbar">
            <div className="nav-large">
              <div className="nav-large-left">
                <Link to="/" className="link-logo out ">
                  <img
                    src="https://res.cloudinary.com/daxizvsge/image/upload/v1705303029/logo_p5ezce.png"
                    alt="website logo"
                    className="header-logo"
                  />
                </Link>

                <h1 className="header-heading">Insta Share</h1>
              </div>
              <div className="nav-large-right">
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
                <h1 className="header-heading">Insta Share</h1>
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
                className="close-button"
                type="button"
                onClick={() => toggleSmallNav(false)}
              >
                a<IoMdCloseCircle color="black" size={25} />
              </button>
            </div>
          </nav>
        )
      }}
    </InstaShareContext.Consumer>
  )
}

export default withRouter(Header)
