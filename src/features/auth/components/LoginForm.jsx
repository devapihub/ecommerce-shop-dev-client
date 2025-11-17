import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../authSlice';
import SocialLoginButtons from '../../../shared/components/client/common/SocialLoginButtons';

function LoginForm({ switchToSignup, switchToForgotPassword }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  return (
    <div className="absolute top-1/2 right-[100px] transform -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 w-[360px] border border-black/10">
      
      <h2 className="text-2xl font-bold mb-1 tracking-tight text-fptdark">
        Đăng nhập
      </h2>

      <p className="text-gray-600 text-xs mb-5">
        Vui lòng nhập thông tin đăng nhập của bạn
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm
                     focus:ring-2 focus:ring-fpt focus:border-transparent 
                     text-black outline-none transition-all"
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm
                     focus:ring-2 focus:ring-fpt focus:border-transparent 
                     text-black outline-none transition-all"
        />

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-2.5 rounded-xl font-semibold text-sm text-white
            bg-gradient-to-t from-fpt to-fpt-light
            hover:opacity-90 hover:scale-[1.01]
            transition-all shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-white text-gray-500">Hoặc</span>
        </div>
      </div>

      <SocialLoginButtons />

      <div className="mt-2 space-y-2">
        
        <button
          onClick={switchToForgotPassword}
          className="text-dark text-xs hover:underline block w-full text-left font-semibold"
        >
          Quên mật khẩu?
        </button>

        <div className="text-xs text-center flex gap-1 justify-center items-center">
        <p className='text-gray-600'>Bạn chưa có tài khoản?{' '}</p>
          <button
            onClick={switchToSignup}
            className="text-dark hover:underline font-semibold"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
