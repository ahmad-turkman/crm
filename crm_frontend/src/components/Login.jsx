import 'bootstrap/dist/css/bootstrap.min.css';

import axios from '../api/axios';

const Login = () => {
  const handleClick = (e) => {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let params = {
      username: username,
      password: password,
    };

    console.log('params', params);

    axios
      .post('/account/login', null, {
        params: params,
      })
      .then((res) => {
        localStorage.clear();
        const data = res.data;

        if (data.company_id) {
          localStorage.setItem('company_id', data.company_id);
          localStorage.setItem('company_name', data.company_name);

          if (data.contact_id) {
            localStorage.setItem('contact_id', data.contact_id);
            localStorage.setItem('first_name', data.first_name);
            localStorage.setItem('last_name', data.last_name);
          } else {
            localStorage.setItem('is_admin', data.is_admin);
          }
          window.location.href = '/';
        } else {
          alert('Something went wrong!');
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleClick}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>User name</label>
            <input
              id="username"
              className="form-control mt-1"
              placeholder="Enter user name"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
