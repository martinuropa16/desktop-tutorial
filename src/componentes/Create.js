import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Create = () => {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [active, activechange] = useState("");
  const [date, datechange] = useState("");
  const [completed, completedchange] = useState(false);
  const [isdeleted, isdeletedchange] = useState(false);
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    console.log(active);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    e.preventDefault();
    //console.log({ id, name, email, phone, active });

    const empdata = { name, email, phone, active, completed, isdeleted, date };

    fetch("http://localhost:8000/list", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Contact Create</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        disabled="disabled"
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        pattern="^[a-zA-Z]*$"
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {name.length == 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group space">
                      <label>Status</label>
                      <select
                        className="status"
                        onChange={(e) => activechange(e.target.value)}
                      >
                        <option selected>Choose Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        required
                        value={email}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => emailchange(e.target.value)}
                        className="form-control"
                      ></input>
                      {/* {email.length == 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )} */}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        required
                        value={phone}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => phonechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {/* {phone.length == 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )} */}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => datechange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  {/* <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        required
                        checked={active}
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <label
                        onChange={(e) => activechange(e.target.checked)}
                        className="form-check-label"
                      >
                        Is Active
                      </label>
                    </div>
                  </div> */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Add
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
