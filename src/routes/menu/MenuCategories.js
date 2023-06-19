import React from "react";
import { NavLink } from "react-router-dom";
import ResetLocation from "../../helpers/ResetLocation";
export default class MenuCategories extends React.Component {
  render() {
    const { allCategories, changeCategory, resetPagination } = this.props;
    return (
      <article className="side-menu">
        <ul>
          {allCategories.map((category) => (
            <li key={category.id}>
              <NavLink
                to="/menu"
                onClick={() => {
                  changeCategory(category.id);
                  ResetLocation();
                  resetPagination();
                }}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </article>
    );
  }
}
