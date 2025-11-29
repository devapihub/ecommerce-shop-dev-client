import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { forgotPassword } from '../authSlice';

function ForgotPasswordForm({ switchToLogin }) {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className="absolute top-1/2 right-[100px] -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 w-[360px] border border-black/10">
      
      <h2 className="text-2xl font-bold mb-1 tracking-tight text-fptdark">
        Quên mật khẩu
      </h2>

      <p className="text-gray-600 text-xs mb-5">
        Nhập email để nhận link khôi phục mật khẩu
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm
                     text-black outline-none transition-all"
        />

        {error && (
          <div className="text-red-500 text-xs bg-red-50 p-2 rounded-lg">
            {error}
          </div>
        )}

        {message && !error && (
          <div className="text-green-600 text-xs bg-green-50 p-2 rounded-lg">
            {message}
          </div>
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
          {loading ? 'Đang gửi...' : 'Gửi email khôi phục'}
        </button>
      </form>

      <div className="mt-3 text-xs text-center flex justify-center items-center gap-2 text-dark cursor-pointer">
        <div className='font-bold'>
          <ArrowLeft size={14} />
        </div>
        <button
          onClick={switchToLogin}
          className="text-dark hover:underline font-semibold"
        >
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
