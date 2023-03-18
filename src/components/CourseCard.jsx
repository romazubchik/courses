import React, { useCallback, useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ReactPlayer from 'react-player'

const HoverVideoPlayer = ({ courseVideoPreview, courseCover }) => {
  const [isHovering, setIsHovering] = React.useState(false)
  const playerRef = React.useRef(null)

  const PreviewImg = useCallback(() => <img src={courseCover} className='w-100' onMouseEnter={() => setIsHovering(true)} alt='Thumbnail' />, [courseCover])

  return <div className='w-100'>
    <ReactPlayer
      playerRef={playerRef}
      url={courseVideoPreview}
      playing={isHovering}
      muted={true}
      playIcon={<></>}
      light={isHovering ? null : <PreviewImg />}
      onMouseLeave={() => setIsHovering(false)}
      width='100%'
    />
  </div>
}

function CourseCard({ title, previewImageLink, description, lessonsCount, rating, skills, id, courseVideoPreview }) {
  let src = previewImageLink + '/cover.webp'
  let url = '/coursePage/' + id

  let listSkills = Object.keys(skills).map(skillId => (
    <li key={skillId}>
      {skills[skillId]}
    </li>
  ))

  return (
    <Col md={6} lg={4} sm={12} onClick={() => { window.location.href = url }}>
      <Card style={{ height: '800px'}} className='mt-4'>
        <HoverVideoPlayer courseVideoPreview={courseVideoPreview} courseCover={src} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>lessons Count: {lessonsCount}</Card.Text>
          <Card.Text>Rating: {rating}</Card.Text>
          <Card.Body>
            <ul>{listSkills}</ul>
          </Card.Body>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default CourseCard