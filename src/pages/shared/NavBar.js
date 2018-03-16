import React from 'react';
import styled from 'styled-components';
import { Layout as LayoutAnt, Row, Col } from 'antd';

const { Header } = LayoutAnt;

const Span = styled.span`
  color: white;
  font-size: 24px;
`;

function NavBar(props) {
  return (
    <LayoutAnt>
      <Header>
        <Row>
          <Col span={24} offset={12}>
            <Span>AirCraft</Span>
          </Col>
        </Row>
      </Header>
    </LayoutAnt>
  );
}

export default NavBar;
