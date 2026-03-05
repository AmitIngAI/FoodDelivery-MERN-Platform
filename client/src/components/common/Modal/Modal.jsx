import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md', // sm, md, lg, xl, full
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
  footer,
  icon,
  variant = 'default', // default, glass, gradient
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`modal-overlay ${variant}`}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleOverlayClick}
        >
          <motion.div
            className={`modal modal-${size} modal-${variant} ${className}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="modal-header">
                <div className="modal-title-wrapper">
                  {icon && <span className="modal-icon">{icon}</span>}
                  {title && <h3 className="modal-title">{title}</h3>}
                </div>
                {showCloseButton && (
                  <IconButton 
                    className="modal-close-btn"
                    onClick={onClose}
                    size="small"
                  >
                    <Close />
                  </IconButton>
                )}
              </div>
            )}

            {/* Body */}
            <div className="modal-body">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="modal-footer">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Confirm Modal
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger", // danger, warning, success, info
  loading = false,
}) => {
  const icons = {
    danger: "⚠️",
    warning: "⚡",
    success: "✅",
    info: "ℹ️",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      className="confirm-modal"
    >
      <div className="confirm-modal-content">
        <div className={`confirm-icon ${variant}`}>
          {icons[variant]}
        </div>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button 
            className="btn btn-outline"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button 
            className={`btn btn-${variant}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Alert Modal
export const AlertModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info", // success, error, warning, info
  buttonText = "OK",
}) => {
  const icons = {
    success: "🎉",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      className="alert-modal"
    >
      <div className="alert-modal-content">
        <motion.div 
          className={`alert-icon ${type}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          {icons[type]}
        </motion.div>
        <h3 className="alert-title">{title}</h3>
        <p className="alert-message">{message}</p>
        <button 
          className="btn btn-primary"
          onClick={onClose}
        >
          {buttonText}
        </button>
      </div>
    </Modal>
  );
};

// Image Preview Modal
export const ImageModal = ({
  isOpen,
  onClose,
  src,
  alt = "Preview",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      variant="glass"
      className="image-modal"
    >
      <div className="image-modal-content">
        <img src={src} alt={alt} />
      </div>
    </Modal>
  );
};

export default Modal;