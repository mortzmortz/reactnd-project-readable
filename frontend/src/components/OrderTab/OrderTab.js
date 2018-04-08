import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeSorting } from 'redux/actions/sorting';
import { TabBar, Tab } from 'rmwc/Tabs';

class OrderTab extends React.PureComponent {
  static propTypes = {
    sorting: PropTypes.object.isRequired,
    sortTabsList: PropTypes.array.isRequired,
  };

  state = {
    activeTabIndex: 0,
  };

  componentDidMount() {
    const { sortBy, byName } = this.props.sorting;
    const prevTab = byName[sortBy];
    this.setState({ activeTabIndex: prevTab.index });
  }

  handleTabClick = (event, tab) => {
    if (this.state.activeTabIndex !== tab.index) {
      this.setState({ activeTabIndex: tab.index });
      this.props.changeSorting(tab.name);
    }
  };

  render() {
    const { sortTabsList } = this.props;
    const { activeTabIndex } = this.state;
    return (
      <TabBar activeTabIndex={activeTabIndex} style={styles.tabBar}>
        {sortTabsList.map((tab, index) => (
          <Tab
            key={tab.path}
            style={styles.tab}
            onClick={event => this.handleTabClick(event, tab)}
          >
            {tab.name}
          </Tab>
        ))}
      </TabBar>
    );
  }
}

const styles = {};

styles.tabBar = {
  marginLeft: '0',
};

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
