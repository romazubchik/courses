import React from 'react'
import Pagination from 'react-bootstrap/Pagination'


const PaginationMenu = ({ coursesPerPage, totalCourses, paginate }) => {

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <ul className='pagination'>
        {
          pageNumbers.map(number => (
            <Pagination.Item href={`#${number}`} key={number} onClick={() => paginate(number)}>
              {number}
            </Pagination.Item>
          ))
        }
      </ul>
    </div>
  )
}

export default PaginationMenu