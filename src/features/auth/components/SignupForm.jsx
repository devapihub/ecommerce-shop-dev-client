import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../authSlice";
import SocialLoginButtons from "../../../shared/components/client/common/SocialLoginButtons";

function SignupForm({ switchToLogin }) {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signupUser(formData));
  };

  return (
    <div className="absolute top-1/2 right-[100px] -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 w-[360px] border border-black/10">
      <h2 className="text-2xl font-bold mb-1 tracking-tight text-fptdark">
        Đăng ký
      </h2>

      <p className="text-gray-600 text-xs mb-5">
        Tạo tài khoản mới để bắt đầu trải nghiệm dịch vụ
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm
                     focus:ring-2 focus:ring-fpt focus:border-transparent 
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
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>

      <div className="relative space-y-2 mb-2">
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
    </div>
  );
}

export default SignupForm;
