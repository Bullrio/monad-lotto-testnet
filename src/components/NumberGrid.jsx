import React from 'react';
import { motion } from 'framer-motion';

const NumberGrid = ({ selectedNumber, takenNumbers, onNumberSelect, maxNumber = 100 }) => { // Default maxNumber to 100
  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

  const getNumberStatus = (number) => {
    if (takenNumbers.includes(number)) return 'taken';
    if (selectedNumber === number) return 'selected';
    return 'available';
  };

  const getNumberClass = (status) => {
    const baseClass = 'number-slot';
    switch (status) {
      case 'taken':
        return `${baseClass} taken`;
      case 'selected':
        return `${baseClass} selected`;
      default:
        return baseClass;
    }
  };

  return (
    <div className={`number-grid ${maxNumber === 50 ? 'grid-cols-10 md:grid-cols-10' : 'grid-cols-10'}`}>
      {numbers.map((number) => {
        const status = getNumberStatus(number);
        return (
          <motion.button
            key={number}
            className={getNumberClass(status)}
            onClick={() => status === 'available' && onNumberSelect(number)}
            disabled={status === 'taken'}
            whileHover={status === 'available' ? { scale: 1.05 } : {}}
            whileTap={status === 'available' ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: (number - 1) * 0.01,
              duration: 0.3 
            }}
          >
            {number}
          </motion.button>
        );
      })}
    </div>
  );
};

export default NumberGrid;