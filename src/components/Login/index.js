import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import InstaShareContext from '../InstaShareContext'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const object = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(object),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <InstaShareContext.Consumer>
        {value => {
          const {isDark} = value
          console.log(isDark)
          return (
            <div
              className={isDark ? 'login-page dark-bg' : 'login-page light-bg'}
            >
              <img
                src="https://res.cloudinary.com/daxizvsge/image/upload/v1705213844/Illustration_ihyyu8.png"
                alt="website login"
                className="login-img"
              />
              <form
                className={
                  isDark
                    ? 'login-form dark-bg light-border'
                    : 'login-form light-bg'
                }
                onSubmit={this.submitLogin}
              >
                <img
                  src="https://res.cloudinary.com/daxizvsge/image/upload/v1705303029/logo_p5ezce.png"
                  alt="website logo"
                  className="login-logo"
                />
                <h1
                  className={
                    isDark ? 'login-heading light' : 'login-heading dark'
                  }
                >
                  Insta Share
                </h1>
                <div className="login-input-container">
                  <label
                    className={
                      isDark ? 'login-label light' : 'login-label dark'
                    }
                    htmlFor="username"
                  >
                    USERNAME
                  </label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    className={
                      isDark ? 'username-input light' : 'username-input dark'
                    }
                    id="username"
                    onChange={this.changeUsername}
                    value={username}
                  />
                </div>
                <div className="login-input-container">
                  <label
                    className={
                      isDark ? 'login-label light' : 'login-label dark'
                    }
                    htmlFor="password"
                  >
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className={
                      isDark ? 'username-input light' : 'username-input dark'
                    }
                    id="password"
                    onChange={this.changePassword}
                    value={password}
                  />
                </div>
                {errorMsg !== '' ? (
                  <p className="login-error">*{errorMsg}</p>
                ) : (
                  ''
                )}
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
            </div>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }
}

export default Login
