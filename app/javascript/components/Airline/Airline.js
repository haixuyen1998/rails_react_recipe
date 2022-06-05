import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Header from './Header';
import ReviewForm from "./ReviewForm";

const Wapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  `
const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow: scoll;

  &:last-child{
    background: #000;
  }
`
const Main = styled.div`
  padding-left: 50px;
`

const Airline = (props) => {
  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({})
  const [loaded, setLoaded] = useState(false)
  useEffect(()=>{
    const slug = props.match.params.slug
    const url = `/api/v1/airlines/${slug}`
    axios.get(url)
      .then(response => {
        setAirline(response.data)
        setLoaded(true)
      })
      .catch(response => console.log(response))
  },[])

  const handChange = (e) => {
    e.preventDefault()
    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
  }

  const handSubmit = (e) => {
    e.preventDefault()
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN']=csrfToken

    const airline_id = airline.data.id
    axios.post('/api/v1/reviews', {review, airline_id})
      .then(response => {
        const included = [...airline.included, response.data]
        setAirline({...airline, included})
        setReview({title: '', description: '', score: 0})
      })
      .catch(response => response)
  }

  const setRating = (score, e) => {
    e.preventDefault()
    setReview({...review, score})
  }

  return (
    <Wapper>
      {
        loaded &&
        <Fragment>
          <Column>
            <Main>
              <Header 
                attributes = {airline.data.attributes}
                review = {airline.included}/>
            <div className="reviews"></div>
            </Main>
          </Column>
          <Column>
            <ReviewForm
              handleChange = {handChange}
              handleSubmit = {handSubmit}
              setRating = {setRating}
              attributes = {airline.data.attributes}
              review = {review}
            />
          </Column>
        </Fragment>
      }
    </Wapper>
  )
}

export default Airline