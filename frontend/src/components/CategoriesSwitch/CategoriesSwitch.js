import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'rmwc/Button';
import { Link } from 'react-router-dom';
import './CategoriesSwitch.css';

const CategoriesSwitch = ({ categories }) => {
  return (
    <div className="categories-switch">
      {categories.isFetching ? (
        <p>loading</p>
      ) : (
        categories.allCategories.map(category => (
          <Link
            key={category.path}
            to={{
              pathname: `/category/${category.path}`,
              state: { category: category.name },
            }}
          >
            <Button unelevated={category.name === categories.current}>
              {category.name}
            </Button>
          </Link>
        ))
      )}
    </div>
  );
};

CategoriesSwitch.propTypes = {
  categories: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(CategoriesSwitch);
