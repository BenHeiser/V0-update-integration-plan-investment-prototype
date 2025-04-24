import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-top: 2rem;
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 1px solid var(--bg-action-secondary);
  color: var(--text-primary);
  font-weight: 600;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid var(--bg-action-secondary);
  color: var(--text-primary);
`;

const Tr = styled.tr`
  &:last-child {
    ${Td} {
      border-bottom: none;
    }
  }
`;

const ValueCell = styled(Td)`
  font-family: monospace;
  text-align: right;
`;

interface ComparisonTableProps {
  data: {
    amount: number;
    frequency: string;
    stock: string;
    startDate: string;
  };
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
  // Mock data for demonstration
  const strategies = [
    {
      name: 'Conservative',
      returnRate: 0.05,
      risk: 'Low',
    },
    {
      name: 'Balanced',
      returnRate: 0.08,
      risk: 'Medium',
    },
    {
      name: 'Aggressive',
      returnRate: 0.12,
      risk: 'High',
    },
  ];

  const calculateProjectedValue = (returnRate: number) => {
    const years = 5; // 5-year projection
    const periods = years * 12;
    const monthlyRate = returnRate / 12;
    
    if (data.frequency === 'one-time') {
      return data.amount * Math.pow(1 + returnRate, years);
    } else {
      // Monthly contributions
      const monthlyContribution = data.amount;
      return monthlyContribution * ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate);
    }
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <Tr>
            <Th>Strategy</Th>
            <Th>Risk Level</Th>
            <Th>Annual Return</Th>
            <Th>5-Year Projection</Th>
          </Tr>
        </thead>
        <tbody>
          {strategies.map((strategy) => (
            <Tr key={strategy.name}>
              <Td>{strategy.name}</Td>
              <Td>{strategy.risk}</Td>
              <Td>{(strategy.returnRate * 100).toFixed(1)}%</Td>
              <ValueCell>
                ${calculateProjectedValue(strategy.returnRate).toLocaleString()}
              </ValueCell>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ComparisonTable; 