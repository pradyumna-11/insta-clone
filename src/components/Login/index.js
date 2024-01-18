import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
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
    console.log(data)
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
      <div className="login-page">
        <img
          src="https://res.cloudinary.com/daxizvsge/image/upload/v1705213844/Illustration_ihyyu8.png"
          alt="website login"
          className="login-img"
        />
        <form className="login-form" onSubmit={this.submitLogin}>
          <img
            src="https://res.cloudinary.com/daxizvsge/image/upload/v1705303029/logo_p5ezce.png"
            alt="website logo"
            className="login-logo"
          />
          <h1 className="login-heading">Insta Share</h1>
          <div className="login-input-container">
            <label className="login-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="username-input"
              id="username"
              onChange={this.changeUsername}
              value={username}
            />
          </div>
          <div className="login-input-container">
            <label className="login-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="username-input"
              id="password"
              onChange={this.changePassword}
              value={password}
            />
          </div>
          {errorMsg !== '' ? <p className="login-error">*{errorMsg}</p> : ''}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
