import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import Pagination from './PaginationMenu'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import { getDataFromApi } from '../fetch'

export default function Dates() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [coursesPerPage] = useState(10)

  useEffect(() => {
    getDataFromApi('https://api.wisey.app/api/v1/core/preview-courses')
      .then((result) => {
        setCourses(result.courses)
        setLoading(true)
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
  }, [])

  if (!loading) {
    return <Spinner animation='border' />
  }

  const lastCoursesIndex = currentPage * coursesPerPage
  const firstCoursesIndex = lastCoursesIndex - coursesPerPage

  const currentCourse = courses.slice(firstCoursesIndex, lastCoursesIndex)

  const paginate = (pageNumber) => {
    window.scrollTo(0,0)
    setCurrentPage(pageNumber)
  }

  return (
    <Row>
      <Row className='w-100'>
        {currentCourse.map(data => (
          <CourseCard
            key={data.id}
            title={data.title}
            previewImageLink={data.previewImageLink}
            description={data.description}
            lessonsCount={data.lessonsCount}
            rating={data.rating}
            skills={data.meta.skills || ''}
            id={data.id}
            courseVideoPreview={data.meta?.courseVideoPreview?.link || ''}
          />
        ))}
      </Row>
      <Row>
        <Pagination
          coursesPerPage={coursesPerPage}
          totalCourses={courses.length}
          paginate={paginate}
        />
      </Row>
    </Row>
  )
}