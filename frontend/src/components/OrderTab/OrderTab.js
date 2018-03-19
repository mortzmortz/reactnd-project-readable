import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTab } from 'redux/actions/sorting';
import { TabBar, Tab } from 'rmwc/Tabs';

class OrderTab extends Component {
  state = {
    activeTabIndex: 0,
  };

  handleTabClick = (event, tab, index) => {
    if (this.state.activeTabIndex !== index) {
      this.setState({ activeTabIndex: index });
      this.props.changeTab(tab);
    }
  };

  render() {
    return (
      <TabBar activeTabIndex={this.state.activeTabIndex} style={styles.tabBar}>
        {this.props.sorting.allTabs.map((tab, index) => (
          <Tab
            key={tab.path}
            style={styles.tab}
            onClick={event => this.handleTabClick(event, tab, index)}
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
});

export default connect(mapStateToProps, {
  changeTab,
})(OrderTab);
