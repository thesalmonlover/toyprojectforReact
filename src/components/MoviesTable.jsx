import React, { Component } from "react";
import Heart from "./common/Heart";
import Table from "./common/Table";
import { Link } from "react-router-dom";
class MoviesTable extends Component {
  render() {
    const columns = [
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
      },
      {
        key: "delete",
        content: data => (
          <button
            onClick={() => this.props.onDelete(data)}
            className="btn btn-danger"
          >
            Delete
          </button>
        )
      }
    ];
    const { data, onSort, sortColumn } = this.props;
    return (
      <Table
        data={data}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={columns}
      />
    );
  }
}

export default MoviesTable;
