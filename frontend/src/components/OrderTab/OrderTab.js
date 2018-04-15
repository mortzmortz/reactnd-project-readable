import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'antd';

import { changeSorting } from 'redux/actions/sorting';

class OrderTab extends React.PureComponent {
  static propTypes = {
    changeSorting: PropTypes.func.isRequired,
    sorting: PropTypes.object.isRequired,
    sortTabsList: PropTypes.array.isRequired,
  };

  handleSelect = event => {
    const { key } = event;
    if (this.props.sorting.sortBy !== key) {
      this.props.changeSorting(key);
    }
  };

  render() {
    const { sortTabsList } = this.props;

    return (
      <Menu
        mode="horizontal"
        onSelect={this.handleSelect}
        defaultSelectedKeys={[this.props.sorting.sortBy]}
      >
        {sortTabsList.map((tab, index) => (
          <Menu.Item key={tab.path} style={styles.tab}>
            {tab.name}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

const styles = {};

styles.tab = {
  minWidth: '100px',
  textTransform: 'uppercase',
};

const mapStateToProps = state => ({
  sorting: state.sorting,
  sortTabsList: Object.values(state.sorting.byName),
});

export default connect(mapStateToProps, {
  changeSorting,
})(OrderTab);
