// Icon
import { IoConstructOutline } from 'react-icons/io5';
// Styled
import styled from 'styled-components';

/** [Styled Component] */
const SectionLayout = styled.div`
  align-itmes: center;
  display: flex;
  height: 100%;'
  justify-content: center;
  .
`;

export const Preparing: React.FC<any> = ({ description, title }): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', height: '100%', justifyContent: 'center' }}>
      <Result description={description} icon={<IoConstructOutline color='#3f6600' size={56} />} title={title} />
    </div>
  );
}

const Result: React.FC<any> = ({ description, icon, title }): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', height: '100%', justifyContent: 'center' }}>
      <div>
        {icon ? (
          <div style={{ marginBottom: 16, textAlign: 'center' }}>{icon}</div>
        ) : (<></>)}
        <div>
          <h2 style={{ color: '##000000D9', fontSize: 20, fontWeight: '600', lineHeight: '24px', margin: 8, textAlign: 'center' }}>{title}</h2>
          {description ? (
            <p style={{ color: '#00000073', margin: 0 }}>{description}</p>
          ) : <></>}
        </div>
      </div>
    </div>
  );
}