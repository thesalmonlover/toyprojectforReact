import React from 'react';


const ListGroup = (props) => {
    const {genres, onClick, currentGenre, textProperty, valueProperty} = props;
    return ( 
        <ul className="list-group">
            {genres.map(data => 
                <li onClick={() => onClick(data)} key={data[valueProperty]} className={currentGenre===data ? "list-group-item active" : "list-group-item"}>{data[textProperty]}</li>
            )}
        </ul>
     );
}

ListGroup.defaultProps = {
    textProperty:"name",
    valueProperty:"_id"
}
 
export default ListGroup;