const PageHeading = (props) => {
    const {heading} = props
  return (
    <div className="mb-4">
        <h1 className="h3 mb-0 text-gray-800">{heading}</h1>
    </div>
  )
}
export default PageHeading
