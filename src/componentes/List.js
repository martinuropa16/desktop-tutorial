import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

const List = (props) => {
  const [completed, completedchange] = useState(false);
  const [empdata, empdatachange] = useState();
  const title = props.title;
  /*   const completed = props.completed;
  const empdata = props.empdata;
 */
  const navigate = useNavigate();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const LoadDetail = (id) => {
    navigate("/list/detail/" + id);
  };

  const LoadEdit = (id) => {
    navigate("/list/edit/" + id);
  };

  const RemoveFunction = (id) => {
    if (
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          window.location.reload();
        }
      })
    ) {
      fetch("http://localhost:8000/list/" + id, {
        method: "DELETE",
      }).catch((err) => {
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

  const handleCompleted = (todo, e) => {
    empdatachange(
      empdata.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: e.target.checked };
        }
        return item;
      })
    );
  };

  /*  const completedchange = (id) => {
    const empdata = { completed };

    fetch("http://localhost:8000/list", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("saved successfully.");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }; */

  /*   const completedchange = (e) => {
    e.preventDefau
  }; */
  let noInfo = "";
  let content = "";

  if (empdata?.length <= 0) {
    noInfo = (
      <p style={{ textAlign: "center", fontSize: "24px" }}>
        No info found. Maybe add one?
      </p>
    );
  }

  if (empdata?.length > 0) {
    content = (
      <tbody>
        {empdata &&
          empdata.map((item) => (
            /* { content }, */
            <tr
              key={item.id}
              /*  className={` ${item.length > 0 ? { content } : ""} `} */
            >
              <td className={` ${item.completed ? "crossed-line" : ""} `}>
                {item.id}
              </td>
              <td className={` ${item.completed ? "crossed-line" : ""} `}>
                {item.name}
              </td>
              <td className={` ${item.completed ? "crossed-line" : ""} `}>
                {item.email}
              </td>
              <td className={` ${item.completed ? "crossed-line" : ""} `}>
                {item.phone}
              </td>
              <td className={` ${item.completed ? "crossed-line" : ""} `}>
                {item.active}
              </td>
              <td className={` ${item.completed ? "crossed-line" : ""} `}>
                {moment().format(item.date)}
              </td>
              <td>
                <div className="form-check" style={{ minHeight: "0rem" }}>
                  <input
                    /* key={item.id} */
                    value={completed}
                    onClick={(e) => handleCompleted(item, e)}
                    type="checkbox"
                    className="form-check-input"
                  ></input>
                </div>
                <a
                  onClick={() => {
                    LoadEdit(item.id);
                  }}
                  className="btn btn-success"
                >
                  Edit
                </a>

                <a
                  onClick={() => {
                    LoadDetail(item.id);
                  }}
                  className="btn btn-primary"
                >
                  Details
                </a>

                <a
                  onClick={() => {
                    RemoveFunction(item.id);
                  }}
                  className="btn btn-danger"
                >
                  Remove
                </a>
                {/* 
              <Link to="list/archieve" className="btn btn-danger">
                Archieve
              </Link> */}
              </td>
            </tr>

            /* {`${
item.completed ? (
<p style={{ textAlign: "center", fontSize: "24px" }}>""</p>
) : (
<p style={{ textAlign: "center", fontSize: "24px" }}>
No info found. Maybe add one?
</p>
)
}

`}, */
          ))}
      </tbody>
    );
  }

  return (
    <>
      <h1>{title}</h1>
      <div className="container">
        {/*      {console.log(empdata.completed)} */}
        <div className="card">
          <div className="card-title"></div>
          <h2>Todo List</h2>
          <div className="card-body">
            <div className="divbtn">
              {/*   <Link to="list/create" className="btn btn-success">
              Add New (+)
            </Link> */}
            </div>
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Phone</td>
                  <td>Status</td>
                  <td>Date</td>
                  <td>Action</td>
                </tr>
              </thead>
              {content}
            </table>
            {noInfo}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
