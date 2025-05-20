import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  RefreshCw, 
  Info, 
  AlertCircle, 
  Check, 
  Wallet,
  ArrowRightLeft,
  Clock
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext'; // Adjust import path as needed

const CrossChainTransfer = () => {
  const { isDarkMode } = useTheme();
  const [fromChain, setFromChain] = useState('bitcoin');
  const [toChain, setToChain] = useState('thunder');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState({ bitcoin: 1.25, thunder: 7.8, zside: 42.5, bitnames: 3.2 });
  const [fee, setFee] = useState(0.0005);
  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Chain information & metadata
  const chainInfo = {
    bitcoin: {
      name: 'Bitcoin',
      icon: '₿',
      color: '#F7931A',
      symbol: 'BTC',
      confirmationTime: '~30 minutes'
    },
    thunder: {
      name: 'Thunder',
      icon: '⚡',
      color: '#3b82f6',
      symbol: 'THD',
      confirmationTime: '~5 seconds'
    },
    zside: {
      name: 'ZSide',
      icon: 'Z',
      color: '#8B5CF6',
      symbol: 'ZSD',
      confirmationTime: '~2 minutes'
    },
    bitnames: {
      name: 'BitNames',
      icon: '📝',
      color: '#EC4899',
      symbol: 'BNS',
      confirmationTime: '~1 minute'
    }
  };
  
  // Handle chain swap
  const handleSwapChains = () => {
    setFromChain(toChain);
    setToChain(fromChain);
  };
  
  // Format balance with 4 decimal places
  const formatAmount = (value) => {
    return parseFloat(value).toFixed(4);
  };
  
  // Calculate max amount
  const calculateMaxAmount = () => {
    return balance[fromChain] > fee ? (balance[fromChain] - fee) : 0;
  };
  
  // Set max available amount
  const handleSetMaxAmount = () => {
    setAmount(calculateMaxAmount().toString());
  };
  
  // Handle transfer submission
  const handleTransfer = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (parseFloat(amount) > balance[fromChain]) {
      alert('Insufficient balance');
      return;
    }
    
    setShowConfirmation(true);
  };
  
  // Confirm and process transfer
  const confirmTransfer = () => {
    setShowConfirmation(false);
    setIsProcessing(true);
    
    // Simulate transfer process
    setTimeout(() => {
      // Update balance simulation
      setBalance(prev => ({
        ...prev,
        [fromChain]: prev[fromChain] - parseFloat(amount) - fee,
        [toChain]: prev[toChain] + parseFloat(amount)
      }));
      
      setIsProcessing(false);
      
      // Show success message
      alert(`Successfully transferred ${amount} ${chainInfo[fromChain].symbol} to ${chainInfo[toChain].name}`);
      
      // Reset amount
      setAmount('');
    }, 2000);
  };
  
  const styles = {
    container: {
      backgroundColor: isDarkMode ? '#1f2937' : 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      maxWidth: '600px',
      margin: '0 auto',
      transition: 'all 0.3s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: isDarkMode ? '#f3f4f6' : '#111827',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    infoButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
      border: 'none',
      cursor: 'pointer'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: isDarkMode ? '#d1d5db' : '#4b5563'
    },
    balanceText: {
      fontSize: '13px',
      color: isDarkMode ? '#9ca3af' : '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    selectContainer: {
      position: 'relative',
      width: '100%'
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      paddingLeft: '48px', // Space for icon
      borderRadius: '10px',
      border: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`,
      backgroundColor: isDarkMode ? '#374151' : 'white',
      color: isDarkMode ? '#f3f4f6' : '#1f2937',
      fontWeight: '500',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='${isDarkMode ? '%23ffffff' : '%23000000'}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px center',
      backgroundSize: '16px',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      outline: 'none',
      fontSize: '15px'
    },
    selectFocused: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)'
    },
    chainIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '28px',
      height: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    inputContainer: {
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '10px',
      border: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`,
      backgroundColor: isDarkMode ? '#374151' : 'white',
      color: isDarkMode ? '#f3f4f6' : '#1f2937',
      fontWeight: '500',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      outline: 'none',
      fontSize: '15px'
    },
    inputFocused: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)'
    },
    maxButton: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      padding: '4px 8px',
      backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb',
      color: isDarkMode ? '#f3f4f6' : '#4b5563',
      border: 'none',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    transferRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      marginBottom: '20px'
    },
    arrowContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
      cursor: 'pointer',
      transition: 'background-color 0.2s, transform 0.2s'
    },
    arrowHover: {
      backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb',
      transform: 'rotate(180deg)'
    },
    feeContainer: {
      padding: '12px 16px',
      marginBottom: '20px',
      backgroundColor: isDarkMode ? '#273549' : '#f9fafb',
      borderRadius: '10px',
      border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
    },
    feeRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      fontSize: '14px',
      color: isDarkMode ? '#d1d5db' : '#4b5563'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '12px',
      paddingTop: '12px',
      borderTop: `1px dashed ${isDarkMode ? '#4b5563' : '#e5e7eb'}`,
      fontSize: '15px',
      fontWeight: '600',
      color: isDarkMode ? '#f3f4f6' : '#111827'
    },
    infoText: {
      fontSize: '13px',
      color: isDarkMode ? '#9ca3af' : '#6b7280',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '6px',
      marginBottom: '20px',
      padding: '10px',
      backgroundColor: isDarkMode ? '#273549' : '#f9fafb',
      borderRadius: '8px',
      border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px'
    },
    buttonHover: {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    buttonDisabled: {
      backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb',
      color: isDarkMode ? '#9ca3af' : '#6b7280',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    },
    processingAnimation: {
      animation: 'spin 1.5s linear infinite'
    },
    confirmation: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    confirmationBox: {
      backgroundColor: isDarkMode ? '#1f2937' : 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      width: '90%',
      maxWidth: '450px'
    },
    confirmationTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: isDarkMode ? '#f3f4f6' : '#111827'
    },
    confirmationDetails: {
      marginBottom: '20px'
    },
    confirmationRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
      fontSize: '15px',
      color: isDarkMode ? '#d1d5db' : '#4b5563'
    },
    confirmationButtons: {
      display: 'flex',
      gap: '12px',
      marginTop: '20px'
    },
    cancelButton: {
      flex: 1,
      padding: '12px',
      backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
      color: isDarkMode ? '#f3f4f6' : '#4b5563',
      border: 'none',
      borderRadius: '8px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    confirmButton: {
      flex: 1,
      padding: '12px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    }
  };
  
  // Determine if transfer button should be disabled
  const isDisabled = !amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance[fromChain] || fromChain === toChain || isProcessing;
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>
          <ArrowRightLeft size={20} color="#3b82f6" />
          Cross-Chain Transfer
        </h3>
        <button 
          style={styles.infoButton}
          onClick={() => alert('Transfer your assets between different blockchains quickly and securely.')}
        >
          <Info size={16} color={isDarkMode ? '#9ca3af' : '#6b7280'} />
        </button>
      </div>
      
      <div style={styles.transferRow}>
        <div style={{ flex: 1 }}>
          <div style={styles.formGroup}>
            <div style={styles.label}>
              <span>From</span>
              <span style={styles.balanceText}>
                <Wallet size={14} />
                Balance: {formatAmount(balance[fromChain])} {chainInfo[fromChain].symbol}
              </span>
            </div>
            <div style={styles.selectContainer}>
              <div 
                style={{
                  ...styles.chainIcon, 
                  backgroundColor: chainInfo[fromChain].color + (isDarkMode ? '30' : '20'),
                  color: chainInfo[fromChain].color
                }}
              >
                {chainInfo[fromChain].icon}
              </div>
              <select 
                style={styles.select}
                value={fromChain}
                onChange={(e) => setFromChain(e.target.value)}
              >
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="thunder">Thunder (THD)</option>
                <option value="zside">ZSide (ZSD)</option>
                <option value="bitnames">BitNames (BNS)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div 
          style={{
            ...styles.arrowContainer,
            ...(isHovered ? styles.arrowHover : {})
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleSwapChains}
        >
          <ArrowRight size={18} color={isDarkMode ? '#d1d5db' : '#6b7280'} />
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={styles.formGroup}>
            <div style={styles.label}>
              <span>To</span>
              <span style={styles.balanceText}>
                <Wallet size={14} />
                Balance: {formatAmount(balance[toChain])} {chainInfo[toChain].symbol}
              </span>
            </div>
            <div style={styles.selectContainer}>
              <div 
                style={{
                  ...styles.chainIcon, 
                  backgroundColor: chainInfo[toChain].color + (isDarkMode ? '30' : '20'),
                  color: chainInfo[toChain].color
                }}
              >
                {chainInfo[toChain].icon}
              </div>
              <select 
                style={styles.select}
                value={toChain}
                onChange={(e) => setToChain(e.target.value)}
              >
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="thunder">Thunder (THD)</option>
                <option value="zside">ZSide (ZSD)</option>
                <option value="bitnames">BitNames (BNS)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>
          <span>Amount</span>
        </label>
        <div style={styles.inputContainer}>
          <input
            type="number"
            style={styles.input}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0000"
            step="0.0001"
            min="0"
            max={balance[fromChain]}
          />
          <button 
            style={styles.maxButton}
            onClick={handleSetMaxAmount}
          >
            MAX
          </button>
        </div>
      </div>
      
      {amount && parseFloat(amount) > 0 && (
        <div style={styles.feeContainer}>
          <div style={styles.feeRow}>
            <span>Amount</span>
            <span>{parseFloat(amount).toFixed(4)} {chainInfo[fromChain].symbol}</span>
          </div>
          <div style={styles.feeRow}>
            <span>Network Fee</span>
            <span>{fee.toFixed(4)} {chainInfo[fromChain].symbol}</span>
          </div>
          <div style={styles.totalRow}>
            <span>Total</span>
            <span>{(parseFloat(amount) + fee).toFixed(4)} {chainInfo[fromChain].symbol}</span>
          </div>
        </div>
      )}
      
      {fromChain !== toChain && (
        <div style={styles.infoText}>
          <Clock size={16} />
          <span>Estimated transfer time: {chainInfo[toChain].confirmationTime}</span>
        </div>
      )}
      
      {fromChain === toChain && (
        <div style={{...styles.infoText, color: '#ef4444'}}>
          <AlertCircle size={16} color="#ef4444" />
          <span>Source and destination chains must be different</span>
        </div>
      )}
      
      <button
        style={{
          ...styles.button,
          ...(isHovered && !isDisabled ? styles.buttonHover : {}),
          ...(isDisabled ? styles.buttonDisabled : {})
        }}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleTransfer}
        disabled={isDisabled}
      >
        {isProcessing ? (
          <>
            <RefreshCw 
              size={20} 
              style={{
                animation: 'spin 1.5s linear infinite'
              }}
            />
            <span>Processing...</span>
          </>
        ) : (
          <span>Transfer</span>
        )}
      </button>
      
      {showConfirmation && (
        <div style={styles.confirmation}>
          <div style={styles.confirmationBox}>
            <h4 style={styles.confirmationTitle}>Confirm Transfer</h4>
            <div style={styles.confirmationDetails}>
              <div style={styles.confirmationRow}>
                <span>From</span>
                <span>{chainInfo[fromChain].name} ({chainInfo[fromChain].symbol})</span>
              </div>
              <div style={styles.confirmationRow}>
                <span>To</span>
                <span>{chainInfo[toChain].name} ({chainInfo[toChain].symbol})</span>
              </div>
              <div style={styles.confirmationRow}>
                <span>Amount</span>
                <span>{parseFloat(amount).toFixed(4)} {chainInfo[fromChain].symbol}</span>
              </div>
              <div style={styles.confirmationRow}>
                <span>Fee</span>
                <span>{fee.toFixed(4)} {chainInfo[fromChain].symbol}</span>
              </div>
              <div style={styles.confirmationRow}>
                <span>Total</span>
                <span>{(parseFloat(amount) + fee).toFixed(4)} {chainInfo[fromChain].symbol}</span>
              </div>
            </div>
            <div style={styles.confirmationButtons}>
              <button 
                style={styles.cancelButton}
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.confirmButton}
                onClick={confirmTransfer}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrossChainTransfer;