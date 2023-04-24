import { Link } from "react-router-dom"

const Table = ({heading, header, rowData, path}) => {
  return (
    <div>
      <div className="card shadow mb-4">
            <div className="card-header py-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0 font-weight-bold text-primary">{heading}</h6>
                    <Link to={path+'/create'} className="btn btn-primary btn-user">Add</Link>
                </div>
                
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellpacing="0">
                        <thead>
                            <tr>
                                {header.map((col, index) => (
                                    <th key={index} className={col.align}>{col.text}</th>
                                ))} 
                            </tr>
                        </thead>
                        <tbody>
                        {rowData.map((row, index) => (
                            <tr key={index}>
                            {row.map((cell, index) => (
                                <td key={index} className={cell.align}>{cell.text}</td>
                            ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Table
