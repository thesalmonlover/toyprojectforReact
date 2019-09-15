import _ from 'lodash';

function paginate (currentPage, totalItem, pageNumber) {
    const currentIndex = (currentPage-1)*pageNumber;
    const array = _(totalItem).slice(currentIndex, currentIndex+pageNumber).value();

    return array;
    


}

export default paginate;