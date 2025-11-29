import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendOTP,
  verifyAndSignup,
  resetForm,
  updateFormData,
} from "../authSlice";
import { Eye, EyeOff } from "lucide-react";
import SocialLoginButtons from "../../../shared/components/client/common/SocialLoginButtons";
function SignupForm({ switchToLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, isAuthenticated, signupStep, signupEmail } =
    useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otpCode, setOtpCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtpCode(value);
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    Object.keys(FormData).forEach((key) => {
      dispatch(updateFormData({ key, value: formData[key] }));
    });
    dispatch(sendOTP(formData));

  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      return;
    }
    dispatch(verifyAndSignup({ email: signupEmail, otpCode }));
  };

  const handleResendOTP = () => {
    dispatch(sendOTP(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

  return (
    <div className="absolute top-1/2 right-[100px] -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 w-[360px] border border-black/10">
      <h2 className="text-2xl font-bold mb-1 tracking-tight text-fptdark">
        {signupStep === 1 ? "Đăng ký" : "Xác thực OTP"}
      </h2>

      <p className="text-gray-600 text-xs mb-5">
        {signupStep === 1
          ? "Tạo tài khoản mới để bắt đầu trải nghiệm dịch vụ"
          : `Nhập mã OTP đã được gửi đến email ${signupEmail}`}
      </p>

      {signupStep === 1 ? (
        <form onSubmit={handleSubmitStep1} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm
                       text-black outline-none transition-all"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm
                       text-black outline-none transition-all"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 pr-10 bg-white border border-gray-300 rounded-xl text-sm
                         text-black outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

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
            {loading ? "Đang gửi OTP..." : "Gửi mã OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitStep2} className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm text-gray-700 font-medium">
              Mã OTP (6 số)
            </label>
            <input
              type="text"
              name="otpCode"
              placeholder="Nhập mã OTP"
              value={otpCode}
              onChange={handleOtpChange}
              required
              maxLength={6}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl
                         text-black outline-none transition-all text-center text-2xl tracking-widest font-semibold"
            />
            <p className="text-xs text-gray-500 text-center">
              Mã OTP sẽ hết hạn sau 10 phút
            </p>
          </div>

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
            disabled={loading || otpCode.length !== 6}
            className="
              w-full py-2.5 rounded-xl font-semibold text-sm text-white
              bg-gradient-to-t from-fpt to-fpt-light
              hover:opacity-90 hover:scale-[1.01]
              transition-all shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Đang xác thực..." : "Xác thực và đăng ký"}
          </button>

          <button
            type="button"
            onClick={handleResendOTP}
            disabled={loading}
            className="
              w-full py-2 rounded-xl font-medium text-sm
              bg-white border border-gray-300 text-gray-700
              hover:bg-gray-50 hover:border-gray-400
              transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Đang gửi lại..." : "Gửi lại mã OTP"}
          </button>
        </form>
      )}

      {signupStep === 1 && (
        <>
          <div className="relative space-y-2 mb-2 mt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">Hoặc</span>
            </div>
          </div>

          <SocialLoginButtons />

          <div className="mt-3 text-xs text-gray-700 text-center">
            Bạn đã có tài khoản?{" "}
            <button
              onClick={switchToLogin}
              className="text-fptdark font-semibold hover:text-fpt transition"
            >
              Đăng nhập ngay
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SignupForm;
