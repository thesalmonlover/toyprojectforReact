import React, { Component } from "react";
import Heart from "./common/Heart";
import Table from "./common/Table";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
class MoviesTable extends Component {

  columns = [
    {
      path: "title",
      name: "Title",
      content: movie => <Link to={"/movies/" + movie._id}>{movie.title}</Link>
    },
    { path: "genre.name", name: "Genre" },
    { path: "numberInStock", name: "Stock" },
    { path: "dailyRentalRate", name: "Rate" },
    {
      key: "heart",
      content: data => (
        <Heart liked={data.like} onClick={this.props.onLike} data={data} />
      )
    }
  ];

  constructor() {
    super()
    const user = getCurrentUser();
    if(user&&user.isAdmin) this.columns.push({
      key: "delete",
      content: data => ( 
        <button
          onClick={() => this.props.onDelete(data)}
          className="btn btn-danger"
        >
          Delete
        </button>
      )
    })

  }
  
  render() {


    const { data, onSort, sortColumn, user } = this.props;
    return (
      <Table
        data={data}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
        user={user}
      />
    );
  }
}

export default MoviesTable;
