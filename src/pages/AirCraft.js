import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Tag, Row, Col, Input, Button, Switch, InputNumber } from 'antd';
import requestGetDataAirCraft from '../state/aircraft/action';
import mapa from '../images/mapa.png';

const Content = styled.div`
  position: relative;
  margin: 30px auto 0;
  width: 80%;
`;

const Image = styled.img`
  position: relative;
  width: 100%;
  border-radius: 6px;
`;

const Coordenada = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  margin: auto;
  width: 5px;
  height: 5px;
  border-radius: 50%;
`;

class AirCraft extends Component {
  state = {
    dataAircraft: [],
    dataAircraftOld: [],
    valueNumber: undefined,
  };

  _interval = null;
  _timeout = null;

  componentDidMount() {
    this.props.requestGetDataAirCraft();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataAircraft && nextProps.dataAircraft.length > 0) {
      this.setState({
        dataAircraft: nextProps.dataAircraft.filter(x => x.Lat && x.Long),
      });
    }
  }

  onInputChange = e => {
    const { dataAircraft } = this.props;
    const value = e.target.value;
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      const dataFiltered = dataAircraft
        .map(record => {
          if (record.Cou.toLowerCase().indexOf(value) === -1) {
            return null;
          }
          return {
            ...record,
          };
        })
        .filter(record => !!record && record.Lat && record.Long);
      this.setState({
        dataAircraft: dataFiltered,
        dataAircraftOld: dataFiltered,
      });
    }, 200);
  };

  onChangeLimit = val => {
    const { dataAircraftOld } = this.state;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(val) && reg.test(val)) || val === '') {
      this.setState({
        valueNumber: val,
      });
      clearTimeout(this._timeout);
      this._timeout = setTimeout(() => {
        const dataFiltered = dataAircraftOld.filter(x => x.Lat && x.Long);
        const value = val !== '' ? val : dataFiltered.length;
        this.setState({
          dataAircraft: dataFiltered.filter(
            (record, idx) => idx < parseInt(value, 10),
          ),
        });
      }, 200);
    }
  };

  updateData = () => {
    this.props.requestGetDataAirCraft();
  };

  updateInterval = checked => {
    if (checked) {
      this._interval = setInterval(() => {
        this.updateData();
      }, 20000);
    } else {
      clearInterval(this._interval);
    }
  };

  getColor = alt => {
    if (alt < 1000) {
      return 'green';
    } else if (alt >= 1000 && alt < 30000) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  render() {
    const { loading } = this.props;
    const { dataAircraft, valueNumber } = this.state;
    return (
      <Content>
        <div>
          <Row>
            <Col span={3}>
              <Tag color="geekblue">
                <p>
                  En vuelo <b>{dataAircraft.length}</b>
                </p>
              </Tag>
            </Col>
            <Col span={3}>
              <Switch onChange={this.updateInterval} />
            </Col>
            <Col span={3}>
              <Button
                type="primary"
                size="small"
                loading={loading}
                onClick={this.updateData}>
                Actualizar
              </Button>
            </Col>
            <Col span={5}>
              <Input
                placeholder="Filtrar países"
                onChange={this.onInputChange}
              />
            </Col>
            <Col span={8} offset={1}>
              <span>Limite: </span>
              <InputNumber
                min={1}
                max={this.props.dataAircraft.length}
                placeholder="Límite"
                value={valueNumber}
                onChange={this.onChangeLimit}
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col span={24}>
              <Image src={mapa} alt="Mapa" />
              {dataAircraft.map((x, i) => (
                <Coordenada
                  key={i.toString()}
                  style={{
                    left: `${
                      x.Long < 0
                        ? x.Long * 100 / 180 + 1
                        : x.Long * 100 / 180 - 1
                    }%`,
                    bottom: `${
                      x.Lat < 0 ? x.Lat * 100 / 90 + 1 : x.Lat * 100 / 90 - 1
                    }%`,
                    backgroundColor: !!x.Alt && this.getColor(x.Alt),
                  }}
                />
              ))}
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

AirCraft.propTypes = {
  dataAircraft: PropTypes.any,
  loading: PropTypes.bool,
  requestGetDataAirCraft: PropTypes.any,
};

AirCraft.defaultProps = {
  loading: false,
};

const mapStateToProps = state => ({
  loading: state.airCraft.loading,
  dataAircraft: state.airCraft.dataAircraft,
});

const mapDispatchToProps = dispatch => ({
  requestGetDataAirCraft: () => {
    dispatch(requestGetDataAirCraft());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AirCraft);
