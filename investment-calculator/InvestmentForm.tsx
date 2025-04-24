import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--bg-action-secondary);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--bg-action-primary);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--bg-action-secondary);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
  appearance: none;
  background-image: url('data:image/svg+xml,<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L12 13.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" fill="currentColor" stroke-width="5"></path></svg>');
  background-repeat: no-repeat;
  background-position: calc(100% - 8px) center;
  
  &:focus {
    outline: none;
    border-color: var(--bg-action-primary);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

interface InvestmentFormProps {
  data: {
    amount: number;
    frequency: string;
    stock: string;
    startDate: string;
  };
  onChange: (data: Partial<typeof props.data>) => void;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ data, onChange }) => {
  const handleChange = (field: string, value: string | number) => {
    onChange({ [field]: value });
  };

  return (
    <FormContainer>
      <FormGroup>
        <Label>Investment Amount</Label>
        <Input
          type="number"
          value={data.amount}
          onChange={(e) => handleChange('amount', Number(e.target.value))}
          min="0"
          step="100"
        />
      </FormGroup>

      <FormGroup>
        <Label>Investment Frequency</Label>
        <RadioGroup>
          <RadioLabel>
            <input
              type="radio"
              name="frequency"
              value="one-time"
              checked={data.frequency === 'one-time'}
              onChange={(e) => handleChange('frequency', e.target.value)}
            />
            One-time
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="frequency"
              value="monthly"
              checked={data.frequency === 'monthly'}
              onChange={(e) => handleChange('frequency', e.target.value)}
            />
            Monthly
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Stock/Index</Label>
        <Select
          value={data.stock}
          onChange={(e) => handleChange('stock', e.target.value)}
        >
          <option value="SPY">S&P 500 (SPY)</option>
          <option value="QQQ">Nasdaq 100 (QQQ)</option>
          <option value="DIA">Dow Jones (DIA)</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label>Start Date</Label>
        <Input
          type="date"
          value={data.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
        />
      </FormGroup>
    </FormContainer>
  );
};

export default InvestmentForm; 