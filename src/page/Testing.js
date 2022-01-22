import React from "react";
import Container from "react-bootstrap/Container";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import "./TestingCSSfile.css";
import HomeNav from "../home/HomeNav2";
import { Link } from "react-router-dom";


const Testing = () => {
  //     const [name, setName] = useState('');
  //     const [email, setEmail] = useState('');
  //     const [password, setPassword] = useState('');

  //     // const submit = async (e: SyntheticEvent) => {
  //     //     e.preventDefault();
  //         // const response = await fetch("http://localhost:3001/getUsers",{
  //         //     method: 'POST',
  //         //     headers: {'Content-Type': 'application/json'},
  //         //     body: JSON.stringify({
  //         //         last_name: name,
  //         //         email_address: email,
  //         //         password: password
  //         //     })
  //         // });
  //         // const content = await response.json();
  //         // console.log(content);

  //         // useEffect(async() => {
  //         //     axios
  //         //       .get("http://localhost:3001/Register1", {
  //         //         params: { textData: "local" },
  //         //       })
  //         //       .then((response) => {
  //         //         setUsers(response.data);
  //         //         console.log(response.data);
  //         //       });
  //         //   }, []);
  //     // }
  //     const submit = (event) => {
  //       event.preventDefault();
  //       // const user_ID = event.target.user_ID.value;

  //       axios
  //         .post("http://localhost:3001/StudentCreate", {

  //         })
  //         .then((response) => {
  //           console.log(response.data);
  //         });

  //     };

  //   return (
  //     <Container>
  //       <form onSubmit={submit}>
  //         <h1 className="h3 mb-3 fw-normal">Please register</h1>
  //         <input className="form-control" placeholder="Name" required
  //         onChange={ (e) => setName(e.target.value)}/>
  //         <input
  //           type="email"
  //           className="form-control"
  //           placeholder="Email address"
  //           required
  //           onChange={ (e) => setEmail(e.target.value)}
  //         />
  //         <input
  //           type="password"
  //           className="form-control"
  //           placeholder="Password"
  //           required
  //           onChange={ (e) => setPassword(e.target.value)}
  //         />
  //         <button className="w-100 btn btn-lg btn-primary" type="submit">
  //           Submit
  //         </button>
  //       </form>
  //     </Container>
  //   );

  return (
    <div className="App">
      {/* <div class="container">
        <div class="row">
          <div class="col-md-5 mx-auto">
            <div id="first">
              <div class="myform form ">
                <div class="logo mb-3">
                  <div class="col-md-12 text-center">
                    <h1>Login</h1>
                  </div>
                </div>
                
                <form action="" method="post" name="login">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      name="email"
                      class="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div class="col-md-12 text-center ">
                    <button
                      type="submit"
                      class=" btn btn-block mybtn btn-primary tx-tfm">
                      Login
                    </button>
                    
                  </div>
                  <div class="form-group">
                    <p class="text-center">
                      Don't have account?{" "}
                      <a href="#" id="signup">
                        Sign up here
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
{/* 
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <a href="/" className="navbar-brand">Home</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/" className="nav-link">Login</a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">Sign Up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      <HomeNav />


      <div className="auth-wrapper">
        <div className="auth-inner">
        <form >
          <h4 className="text1">Sign up Your Business Account</h4>
          <div className="mt-4"></div>
            <div className="mt-2"></div>
            <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" placeholder="First Name" onChange={e => this.firstName = e.target.value} />
            </div>
            <div className="mt-2"></div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" placeholder="Last Name" onChange={e => this.lastName = e.target.value} />
            </div>
            <div className="mt-2"></div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email" onChange={e => this.email = e.target.value} />
            </div>
            <div className="mt-2"></div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" onChange={e => this.password = e.target.value} />
            </div>
            <div className="mt-2"></div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control" placeholder="Confirm Password" onChange={e => this.confirmPassword = e.target.value} />
            </div>
            <div className="mt-4"></div>
            <button className="btn btn-danger btn-block" >Sign Up</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Testing;
