import './index.css'

const NotFound = props => {
  const returnHomeClicked = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/daxizvsge/image/upload/v1705590349/erroring_1_pn7sxb.png"
        alt="page not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found.Please go back
        to the homepage.
      </p>
      <button
        className="home-page-button"
        type="button"
        onClick={returnHomeClicked}
      >
        Home Page
      </button>
    </div>
  )
}

export default NotFound
