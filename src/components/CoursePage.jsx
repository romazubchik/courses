import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import { Card } from "react-bootstrap";
import LessonPlayer from "./LessonPlayer";
import Button from 'react-bootstrap/Button';
import unlock  from '../images/unlock.jpg';
import lock from '../images/lock.jpg';
import { getDataFromApi } from "../fetch";
import '../сss/CoursePage.css';


const saveLessonToLocalStorage = (courseId, lessonOrderId) => {
  localStorage.setItem(`${courseId}-current-lesson-order`, lessonOrderId)
}

const getLessonFromLocalStorage = (courseId) => {
  const lessonOrderId =  parseInt(localStorage.getItem(`${courseId}-current-lesson-order`))
  return lessonOrderId ? lessonOrderId - 1 : 0
}


function CoursePage() {
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState();

    const changeLesson = (lesson) => {
      if (!course) return

      saveLessonToLocalStorage(course.id, lesson.order)
      setSelectedLesson(lesson);
    }

    const { id } = useParams();

    let url = "https://api.wisey.app/api/v1/core/preview-courses" + "/"  + id;

    useEffect(() => {
        getDataFromApi(url)
            .then((course) => {
                setCourse(course);
                const lessonOrderId = getLessonFromLocalStorage(course.id);
                setSelectedLesson(course.lessons[lessonOrderId]);
                setLoading(true);
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
            }); 
            
    }, [])

    if (!loading) {
        return <Spinner animation="border" />
    }

    let listLessons = course.lessons.map(lesson => (
        (lesson.status == "unlocked") 
        ? <ListGroup.Item as="li" onClick={() => changeLesson(lesson)} key={lesson.id} > {lesson.title} {<img src={unlock} width={40}/>} </ListGroup.Item>
        : <ListGroup.Item as="li" key={lesson.id} > {lesson.title} {<img src={lock} width={40}/>} </ListGroup.Item>
    ));

    let listSkills = Object.keys(course.meta.skills).map(skillId => (
        <ListGroup.Item key={skillId} >
          {course.meta.skills[skillId]}
        </ListGroup.Item>
    ))

    let src = course.previewImageLink  + '/cover.webp';

    return (
        <div className="coursePage">
            <Button variant="primary" onClick={() => window.location.href="/"}>Back</Button>
            <h1>{course.title}</h1>
            <Card.Img variant="top" src={src} />

            <h3>Course details</h3>
            <ListGroup className="ListGroup"> 
                <ListGroup.Item>Description: {course.description}</ListGroup.Item>
                <ListGroup.Item>Slug: {course.meta.slug}</ListGroup.Item>
            </ListGroup>

            <h3>List of skills</h3>
            <ListGroup className="ListGroup" as="ol" numbered>{listSkills}</ListGroup>

            <div className="lessonPlayer">
            {selectedLesson && <>
                <h3>Lesson #{selectedLesson.order} {selectedLesson.title}</h3>
                <LessonPlayer srcVideo={selectedLesson.link} lessonId={selectedLesson.id}/>
            </>}
            </div>

            <h3>List of lessons</h3>
            <ListGroup className="ListGroup" as="ol" numbered>{listLessons}</ListGroup>

        </div>
    )
}

export default CoursePage;