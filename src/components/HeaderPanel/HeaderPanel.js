import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/plainid-logo-white.png';
import {headerPanelHeight, HeaderText} from '../../styles/commonStyles';

const HeaderPanelContainer = styled.header`
  display: flex;
  background-color: #4b555f;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  height: ${headerPanelHeight};
  align-items: center;
  z-index: 1;
`;

const Logo = styled.img`
  width: 100px;
  height: 27px;
  margin: 7px;
`;

const HeaderPanelText = styled(HeaderText)`
  color: #fbfbfb;
  margin-left: 5px;
`;

const LangRadioBtnsSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`;

const LangRadio = ({ value, currentLang, label, setLang }) => (
  <HeaderPanelText style={{ cursor: 'pointer' }}>
    <input
      type="radio"
      id={value}
      value={value}
      onClick={setLang}
      checked={currentLang === value}
      style={{ cursor: 'pointer' }}
    />
    <label for={value} style={{ paddingLeft: 5, cursor: 'pointer' }}>{label}</label>
  </HeaderPanelText>
)

export default function HeaderPanel(props) {
    const logoProps = {
        src: logo,
        alt: 'Logo'
    };
    return (
        <HeaderPanelContainer>
            <Logo {...logoProps} />
            <HeaderPanelText>PlainID- Demo App</HeaderPanelText>
            <LangRadioBtnsSection>       
              <LangRadio value="en-US" label="English" {...props} />
              <LangRadio value="es" label="Spanish" {...props} />
            </LangRadioBtnsSection>
        </HeaderPanelContainer>
    );
}
