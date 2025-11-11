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

  const styles = {
    pageWrapper: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f5',
      padding: 16,
      boxSizing: 'border-box',
    },
    formCard: {
      background: '#fff',
      padding: '24px 28px',
      borderRadius: 12,
      maxWidth: 420,
      width: '100%',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
      boxSizing: 'border-box',
    },
    formTitle: {
      margin: '0 0 4px',
      fontSize: 24,
      fontWeight: 600,
    },
    formSubtitle: {
      margin: '0 0 20px',
      color: '#666',
      fontSize: 14,
    },
    formBody: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    },
    formLabel: {
      fontSize: 14,
      fontWeight: 500,
    },
    formInput: {
      padding: '10px 12px',
      borderRadius: 8,
      border: '1px solid #ddd',
      fontSize: 14,
      outline: 'none',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    },
    formHint: {
      fontSize: 12,
      color: '#888',
    },
    formButton: {
      marginTop: 8,
      width: '100%',
      padding: '10px 12px',
      borderRadius: 8,
      border: 'none',
      fontSize: 15,
      fontWeight: 500,
      cursor: 'pointer',
      background: '#1677ff',
      color: '#fff',
    },
    formButtonDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
    formMessage: {
      marginTop: 12,
      padding: '10px 12px',
      borderRadius: 8,
      background: '#f6ffed',
      border: '1px solid #b7eb8f',
      color: '#389e0d',
      fontSize: 13,
    },
  };

  return (
      <div style={styles.pageWrapper}>
        <div style={styles.formCard}>
          <h1 style={styles.formTitle}>Tạo tài khoản</h1>
          <p style={styles.formSubtitle}>
            Nhập thông tin bên dưới để bắt đầu sử dụng hệ thống.
          </p>

          <form onSubmit={handleSubmit} style={styles.formBody}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.formLabel}>
                Họ và tên
              </label>
              <input
                  id="name"
                  type="text"
                  name="name"
                  style={styles.formInput}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.name}
                  onChange={handleChange}
                  required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.formLabel}>
                Email
              </label>
              <input
                  id="email"
                  type="email"
                  name="email"
                  style={styles.formInput}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
              />
              <small style={styles.formHint}>
                Dùng email thật để có thể khôi phục mật khẩu sau này.
              </small>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.formLabel}>
                Mật khẩu
              </label>
              <input
                  id="password"
                  type="password"
                  name="password"
                  style={styles.formInput}
                  placeholder="Tối thiểu 8 ký tự"
                  value={formData.password}
                  onChange={handleChange}
                  required
              />
            </div>

            <button
                type="submit"
                style={{
                  ...styles.formButton,
                  ...(loading ? styles.formButtonDisabled : {}),
                }}
                disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>

            {message && <div style={styles.formMessage}>{message}</div>}
          </form>
        </div>
      </div>
  );

}

export default Signup;

