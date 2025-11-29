import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../authSlice';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

function ResetPasswordForm({ switchToLogin }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { loading, message, error } = useSelector((state) => state.auth);
  
  const token = searchParams.get('token');
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [validationError, setValidationError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      setValidationError('Token không hợp lệ. Vui lòng yêu cầu link reset mật khẩu mới.');
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setValidationError('Token không hợp lệ.');
      return;
    }

    if (formData.newPassword.length < 6) {
      setValidationError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setValidationError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setValidationError('');
    const result = await dispatch(resetPassword({ 
      token, 
      newPassword: formData.newPassword 
    }));

    if (resetPassword.fulfilled.match(result)) {
      setTimeout(() => {
        switchToLogin();
      }, 2000);
    }
  };

  if (!token) {
    return (
      <div className="absolute top-1/2 right-[100px] -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 w-[360px] border border-black/10">
        <h2 className="text-2xl font-bold mb-1 tracking-tight text-fptdark">
          Token không hợp lệ !
        </h2>
        <p className="text-gray-600 text-xs mb-5">
          Link reset mật khẩu không hợp lệ hoặc đã hết hạn.
        </p>
        <button
          onClick={switchToLogin}
          className="
            w-full py-2.5 rounded-xl font-semibold text-sm text-white
            bg-gradient-to-t from-fpt to-fpt-light
            hover:opacity-90 hover:scale-[1.01]
            transition-all shadow-md
          "
        >
          Quay lại đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-1/2 right-[100px] -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 w-[360px] border border-black/10">
      <h2 className="text-2xl font-bold mb-1 tracking-tight text-fptdark">
        Đặt lại mật khẩu
      </h2>

      <p className="text-gray-600 text-xs mb-5">
        Nhập mật khẩu mới của bạn
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            placeholder="Mật khẩu mới"
            value={formData.newPassword}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-3 py-2.5 pr-10 bg-white border border-gray-300 rounded-xl text-sm
                       text-black outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu mới"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-3 py-2.5 pr-10 bg-white border border-gray-300 rounded-xl text-sm
                       text-black outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {(error || validationError) && (
          <div className="text-red-500 text-xs bg-red-50 p-2 rounded-lg">
            {validationError || error}
          </div>
        )}

        {message && !error && !validationError && (
          <div className="text-green-600 text-xs bg-green-50 p-2 rounded-lg">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !token}
          className="
            w-full py-2.5 rounded-xl font-semibold text-sm text-white
            bg-gradient-to-t from-fpt to-fpt-light
            hover:opacity-90 hover:scale-[1.01]
            transition-all shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
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

export default ResetPasswordForm;

