import React, { useState } from 'react';
import styled from 'styled-components';
import InvestmentForm from './InvestmentForm';
import PerformanceChart from './PerformanceChart';
import ComparisonTable from './ComparisonTable';
import { EcommLayout } from '../ecommerce/EcommLayout';

const CalculatorContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CalculatorHeader = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text-primary);
`;

const CalculatorDescription = styled.p`
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const CalculatorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InvestmentCalculator = () => {
  const [investmentData, setInvestmentData] = useState({
    amount: 1000,
    frequency: 'one-time',
    stock: 'SPY',
    startDate: new Date().toISOString().split('T')[0],
  });

  const handleInvestmentChange = (newData) => {
    setInvestmentData(prev => ({ ...prev, ...newData }));
  };

  return (
    <EcommLayout>
      <CalculatorContainer>
        <CalculatorHeader>Investment Calculator</CalculatorHeader>
        <CalculatorDescription>
          See how your investments could grow over time with different strategies.
        </CalculatorDescription>
        
        <CalculatorGrid>
          <InvestmentForm 
            data={investmentData}
            onChange={handleInvestmentChange}
          />
          <PerformanceChart data={investmentData} />
        </CalculatorGrid>
        
        <ComparisonTable data={investmentData} />
      </CalculatorContainer>
    </EcommLayout>
  );
};

export default InvestmentCalculator; 