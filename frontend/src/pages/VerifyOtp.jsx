import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleOtpChange = (e) => {
    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();

      if (res.ok) {
        const { message, ...userData } = data;
        login(userData);
        alert(message || 'Email verified successfully');
        navigate('/');
      } else {
        alert(data.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      alert('Please enter your email first');
      return;
    }

    setResending(true);

    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'A new OTP has been sent');
      } else {
        alert(data.message || 'Could not resend OTP');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Verify OTP</h2>
        <p className="auth-note">Enter the 6-digit OTP sent to your email.</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          inputMode="numeric"
          maxLength="6"
          placeholder="OTP"
          value={otp}
          onChange={handleOtpChange}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
        <button type="button" className="auth-link-button" onClick={handleResendOtp} disabled={resending}>
          {resending ? 'Sending...' : 'Resend OTP'}
        </button>
        <p>Already verified? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default VerifyOtp;
