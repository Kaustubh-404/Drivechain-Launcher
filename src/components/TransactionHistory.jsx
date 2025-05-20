import React, { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, Download, Upload, Filter, RefreshCw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext'; // Adjust import path as needed

const TransactionHistory = () => {
  const { isDarkMode } = useTheme();
  const [filterType, setFilterType] = useState('all');
  
  // Mock transaction data
  const allTransactions = [
    { id: 'tx1', type: 'deposit', from: 'Bitcoin', to: 'Thunder', amount: 0.5, status: 'completed', timestamp: '2023-05-21T10:30:00Z' },
    { id: 'tx2', type: 'withdrawal', from: 'Thunder', to: 'Bitcoin', amount: 0.25, status: 'pending', timestamp: '2023-05-20T15:45:00Z' },
    { id: 'tx3', type: 'deposit', from: 'Bitcoin', to: 'ZSide', amount: 0.1, status: 'completed', timestamp: '2023-05-19T09:15:00Z' },
    { id: 'tx4', type: 'withdrawal', from: 'BitNames', to: 'Bitcoin', amount: 0.05, status: 'failed', timestamp: '2023-05-18T14:20:00Z' },
    { id: 'tx5', type: 'deposit', from: 'ZSide', to: 'Thunder', amount: 0.75, status: 'completed', timestamp: '2023-05-17T11:22:00Z' },
    { id: 'tx6', type: 'withdrawal', from: 'Thunder', to: 'BitNames', amount: 0.125, status: 'completed', timestamp: '2023-05-16T16:30:00Z' }
  ];
  
  // Filter transactions based on selected type
  const transactions = filterType === 'all' 
    ? allTransactions 
    : allTransactions.filter(tx => tx.type === filterType);
  
  const styles = {
    container: {
      backgroundColor: isDarkMode ? '#1f2937' : 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      maxWidth: '800px',
      margin: '0 auto',
      transition: 'all 0.3s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '16px',
      borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: 0,
      color: isDarkMode ? '#f3f4f6' : '#111827'
    },
    filterContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px'
    },
    filterButton: (active) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      backgroundColor: active ? (isDarkMode ? '#4b5563' : '#e5e7eb') : 'transparent',
      color: isDarkMode ? '#f3f4f6' : '#374151',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    }),
    refreshButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
      color: isDarkMode ? '#f3f4f6' : '#374151',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0 8px'
    },
    th: {
      textAlign: 'left',
      padding: '12px 16px',
      color: isDarkMode ? '#9ca3af' : '#6b7280',
      fontSize: '13px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    tr: {
      backgroundColor: isDarkMode ? '#273549' : '#f9fafb',
      borderRadius: '8px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s',
      cursor: 'pointer',
      ':hover': {
        transform: 'translateY(-2px)'
      }
    },
    td: {
      padding: '16px',
      color: isDarkMode ? '#d1d5db' : '#374151',
      fontSize: '14px',
      borderTop: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
      borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
    },
    tdFirst: {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
      borderLeft: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
    },
    tdLast: {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      borderRight: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
    },
    badge: (status) => ({
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: 
        status === 'completed' ? (isDarkMode ? '#065f46' : '#d1fae5') : 
        status === 'pending' ? (isDarkMode ? '#92400e' : '#fef3c7') : 
        (isDarkMode ? '#7f1d1d' : '#fee2e2'),
      color: 
        status === 'completed' ? (isDarkMode ? '#a7f3d0' : '#047857') : 
        status === 'pending' ? (isDarkMode ? '#fcd34d' : '#b45309') : 
        (isDarkMode ? '#fca5a5' : '#b91c1c')
    }),
    typeIcon: (type) => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      marginRight: '10px',
      backgroundColor: type === 'deposit' ? 
        (isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)') : 
        (isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'),
      color: type === 'deposit' ? '#10b981' : '#3b82f6'
    }),
    emptyState: {
      textAlign: 'center',
      padding: '30px',
      color: isDarkMode ? '#9ca3af' : '#6b7280',
      fontSize: '15px'
    },
    amount: (type) => ({
      color: type === 'deposit' ? '#10b981' : '#3b82f6',
      fontWeight: '500'
    }),
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '20px'
    },
    pageButton: (active) => ({
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: active ? (isDarkMode ? '#4b5563' : '#e5e7eb') : 'transparent',
      color: isDarkMode ? '#f3f4f6' : '#374151',
      border: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`,
      cursor: 'pointer'
    })
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Transaction History</h3>
        <button style={styles.refreshButton} onClick={() => console.log('Refresh clicked')}>
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>
      
      <div style={styles.filterContainer}>
        <button 
          style={styles.filterButton(filterType === 'all')} 
          onClick={() => setFilterType('all')}
        >
          <Filter size={16} />
          <span>All</span>
        </button>
        <button 
          style={styles.filterButton(filterType === 'deposit')} 
          onClick={() => setFilterType('deposit')}
        >
          <Download size={16} />
          <span>Deposits</span>
        </button>
        <button 
          style={styles.filterButton(filterType === 'withdrawal')} 
          onClick={() => setFilterType('withdrawal')}
        >
          <Upload size={16} />
          <span>Withdrawals</span>
        </button>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>From</th>
              <th style={styles.th}>To</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx, index) => (
                <tr key={tx.id} style={styles.tr} onClick={() => console.log(`Transaction ${tx.id} clicked`)}>
                  <td style={{...styles.td, ...styles.tdFirst}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <span style={styles.typeIcon(tx.type)}>
                        {tx.type === 'deposit' ? 
                          <ArrowDownLeft size={16} /> : 
                          <ArrowUpRight size={16} />
                        }
                      </span>
                      {tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                    </div>
                  </td>
                  <td style={styles.td}>{tx.from}</td>
                  <td style={styles.td}>{tx.to}</td>
                  <td style={styles.td}>
                    <span style={styles.amount(tx.type)}>
                      {tx.type === 'deposit' ? '+' : '-'}{tx.amount.toFixed(8)}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.badge(tx.status)}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                  <td style={{...styles.td, ...styles.tdLast}}>
                    {formatDate(tx.timestamp)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.emptyState}>
                  No transactions found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div style={styles.pagination}>
        <button style={styles.pageButton(true)}>1</button>
        <button style={styles.pageButton(false)}>2</button>
        <button style={styles.pageButton(false)}>3</button>
      </div>
    </div>
  );
};

export default TransactionHistory;