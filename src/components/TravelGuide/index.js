import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelItem from '../TravelItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {list: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTravelDetails()
  }

  getTravelDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({
        list: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProductsListView = () => {
    const {list} = this.state

    return (
      <div className="container">
        <h1 className="heading">Travel Guide</h1>
        <ul className="unordered-list">
          {list.map(each => (
            <TravelItem eachItem={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllProductsa = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="bg-container">{this.renderAllProductsa()}</div>
  }
}
export default TravelGuide
