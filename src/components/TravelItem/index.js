import './index.css'

const TravelItem = props => {
  const {eachItem} = props
  const {name, imageUrl, description} = eachItem

  return (
    <li className="list">
      <img className="img" src={imageUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}
export default TravelItem
