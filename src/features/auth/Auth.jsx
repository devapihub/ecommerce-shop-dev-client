import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

function Auth() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const tab = searchParams.get('tab') || 'login';
    const [currentForm, setCurrentForm] = useState(tab); // 'login', 'signup', 'forgot-password'

    // Sync URL với state khi tab thay đổi
    useEffect(() => {
        setCurrentForm(tab);
    }, [tab]);

    const switchToSignup = useCallback(() => {
        setCurrentForm('signup');
        navigate('/auth?tab=signup', { replace: true });
    }, [navigate]);

    const switchToLogin = useCallback(() => {
        setCurrentForm('login');
        navigate('/auth?tab=login', { replace: true });
    }, [navigate]);

    const switchToForgotPassword = useCallback(() => {
        setCurrentForm('forgot-password');
        navigate('/auth?tab=forgot-password', { replace: true });
    }, [navigate]);

    return (
        <div className="bg-[#290602]">
            <div className="relative w-full max-w-[1200px] mx-auto">
                <img
                    src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/KV.png"
                    className="w-full h-auto object-cover"
                    alt=""
                />
                {currentForm === 'login' && (
                    <LoginForm 
                        switchToSignup={switchToSignup}
                        switchToForgotPassword={switchToForgotPassword}
                    />
                )}
                {currentForm === 'signup' && (
                    <SignupForm switchToLogin={switchToLogin}/>
                )}
                {currentForm === 'forgot-password' && (
                    <ForgotPasswordForm switchToLogin={switchToLogin}/>
                )}
            </div>
        </div>
    );
}

export default Auth;

