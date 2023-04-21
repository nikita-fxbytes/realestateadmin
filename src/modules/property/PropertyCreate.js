import PageHeading from "../../components/pageheading/PageHeading";

const PropertyCreate = () => {
  return (
    <>
      <PageHeading heading='Add new property'/>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Custom Text Color Utilities</h6>
        </div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..."/>
                </div>              
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
        </div>
      </div>
    </>
  )
}

export default PropertyCreate;
