import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

import { LoadingIndicator } from 'components/';

const CategoriesSwitch = ({ categories }) => {
  return (
    <div className="categories-switch">
      {categories.isFetching ? (
        <LoadingIndicator />
      ) : (
        <Menu mode="horizontal" selectedKeys={[categories.active]}>
          {Object.values(categories.byName).map(category => (
            <Menu.Item key={category.name} style={styles.menuItem}>
              <Link
                key={category.path}
                to={{
                  pathname: `/${category.path}`,
                  state: { category: category.name },
                }}
              >
                {category.name}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </div>
  );
};

const styles = {};

styles.menuItem = {
  textTransform: 'uppercase',
};

CategoriesSwitch.propTypes = {
  categories: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(CategoriesSwitch);
