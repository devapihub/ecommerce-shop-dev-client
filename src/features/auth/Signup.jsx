import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, signupUser } from './authSlice';

function Signup() {
  const dispatch = useDispatch();
  const { formData, loading, message } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    dispatch(updateFormData({
      name: e.target.name,
      value: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  return (
    <div>
      <h1>Test</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Đăng Ký'}
        </button>

        {message && <div>{message}</div>}
      </form>
    </div>
  );
}

export default Signup;

