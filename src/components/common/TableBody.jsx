import React, { Component } from "react";
import _ from "lodash";
class TableBody extends Component {
  renderCell = (data, column) => {
    if (column.content) return column.content(data);
    return _.get(data, column.path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(data => (
          <tr key={data._id}>
            {columns.map(column => (
              <td key={data._id + (column.path || column.key)}>
                {this.renderCell(data, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
