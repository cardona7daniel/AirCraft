import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import requestGetDataAirCraft from '../state/aircraft/action';

class AirCraft extends Component {
  render() {
    console.log(this.props.dataAircraft);
    return <div>Hola Mundo</div>;
  }
}

AirCraft.propTypes = {
  dataAircraft: PropTypes.any,
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
