import React from 'react';

import styled from '@emotion/styled';

const Input = styled.input`
  margin-right: 8px;
`;

interface Props {
  label: string;
  value: boolean;
  onChange(value: boolean): void;
}

function Checkbox({ label, value, onChange }: Props) {
  return (
    <div>
      <label>
        <Input
          type="checkbox"
          checked={value}
          onChange={() => onChange(!value)}
        />
        {label}
      </label>
    </div>
  )
}

export default Checkbox;
