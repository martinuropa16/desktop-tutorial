import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Archieve = ({ todos, setTodos }) => {
  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();
  const LoadDetail = (id) => {
    navigate("/list/detail/" + id);
  };
  const LoadArchieve = (id) => {
    navigate("/list/archieve/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/list/edit/" + id);
  };
  const RemoveFunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/list/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Remove successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  useEffect(() => {
    fetch("http://localhost:8000/list")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        empdatachange(err.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title"></div>
        <h2>Todo List</h2>
        <div className="card-body">
          <div className="divbtn">
            <Link to="list/create" className="btn btn-success">
              Add New (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadArchieve(item.id);
                        }}
                        className="btn btn-success"
                      >
                        Retrieve
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
            <Link to="/" className="btn btn-danger">
              Back
            </Link>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Archieve;
