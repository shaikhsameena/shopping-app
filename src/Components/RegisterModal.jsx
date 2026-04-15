import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { clearCart } from "../redux/cartSlice";

import { UserContext } from '../contexts/UserContext';
import { useDispatch } from 'react-redux';

export default function RegisterModal({ onClose, userInfo }) {
  const [showModal, setShowModal] = useState(true);
  const { setUserInfo } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const submitHandler = async ({ name, emailOrPhone, password }) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/register', {
        name, emailOrPhone, password
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      setUserInfo(data);
      dispatch(clearCart());
      toast.success(`${name} has been created`, {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: true,
        pauseOnHover: false,
        theme: 'colored',
      });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <div
        className={`modal fade ${showModal ? 'show d-block' : ''}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content custom-modal">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="modal-header">
                <h5 className="modal-title">Create an Account</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    {...register('name', { required: 'Please enter name' })}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="emailOrPhone" className="form-label">
                    Email or Mobile Number
                  </label>
                  <input
                    {...register('emailOrPhone', {
                      required: 'Please enter email or mobile number',
                      validate: (value) => {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        const mobileRegex = /^\d{10}$/;
                        return (
                          emailRegex.test(value) ||
                          mobileRegex.test(value) ||
                          'Enter a valid email or 10-digit mobile number'
                        );
                      },
                    })}
                    className={`form-control ${errors.emailOrPhone ? 'is-invalid' : ''}`}
                    id="emailOrPhone"
                  />
                  {errors.emailOrPhone && (
                    <div className="invalid-feedback">{errors.emailOrPhone.message}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    {...register('password', {
                      required: 'Please enter password',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    {...register('confirmPassword', {
                      required: 'Please confirm password',
                      validate: (value) =>
                        value === getValues('password') || 'Passwords do not match',
                    })}
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword.message}</div>
                  )}
                </div>
              </div>

              <div className="modal-footer d-flex flex-column">
                <button type="submit" className="login-btn w-100 mb-2">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />

  
      <style>{`
        .custom-modal .modal-content {
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .custom-modal .modal-header {
          border-bottom: none;
          padding: 1.2rem 1.5rem 0.5rem;
        }

        .custom-modal .modal-title {
          font-weight: 600;
          font-size: 1.25rem;
        }

        .custom-modal .modal-body {
          padding: 1rem 1.5rem;
        }

        .custom-modal .form-label {
          font-weight: 500;
          margin-bottom: 6px;
        }

        .custom-modal .form-control {
          border-radius: 10px;
          background-color: #f9f9f9;
          border: 1px solid #ccc;
          padding: 10px 14px;
          transition: 0.3s;
        }

        .custom-modal .form-control:focus {
          border-color: #0a1931;
          background-color: #fff;
          box-shadow: 0 0 0 0.2rem rgba(10, 25, 49, 0.15);
        }

        .custom-modal .invalid-feedback {
          font-size: 13px;
        }

        .custom-modal .modal-footer {
          border-top: none;
          padding: 0 1.5rem 1.5rem;
        }

        .custom-modal .login-btn {
          background-color: #0a1931;
          border: none;
          color: #fff;
          font-weight: 600;
          padding: 10px;
          border-radius: 25px;
          transition: all 0.3s ease;
        }

        .custom-modal .login-btn:hover {
          background-color: #081628;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}
