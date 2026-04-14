import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import '../../assets/styles/modal.css';

const Modal = ({ isOpen, onClose, title, children, showCloseButton = true, className = '' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay" 
          onClick={onClose}
          initial={{ opacity: 0, pointerEvents: 'auto' }}
          animate={{ opacity: 1, pointerEvents: 'auto' }}
          exit={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className={`modal ${className}`} 
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping:12,
              mass: 1
            }}
          >
            {title && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '1px solid #e0e0e0',
                paddingBottom: '15px'
              }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{title}</h2>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X size={20} style={{ color: '#666' }} />
                  </button>
                )}
              </div>
            )}
            <div className="modal-content">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal