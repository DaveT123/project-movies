import "./Reviews.css"
import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

import React from "react";

export default function Reviews({ getMovieData, movie, reviews, setReviews }) {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {
        e.preventDefault();
        const review = revText.current;

        try {
            const response = await api.post("/api/v1/reviews", {
                reviewBody: review.value,
                imdbId: movieId,
            });
            console.log(reviews);
            const updatedReviews = [...reviews, { body: review.value }];
            review.value = "";
            setReviews(updatedReviews);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <Row className="mt-2">
                <Col>
                    <h3>Reviews</h3>
                </Col>
            </Row>
            <Row className="mt-2 review-box">
                <Col>
                    <img src={movie?.poster} alt="movie-poster" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm
                                    handleSubmit={addReview}
                                    revText={revText}
                                    labelText="Write a Review?"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>

                    {reviews?.map((review) => {
                        return (
                            <>
                                <Row>
                                    <Col>{review.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </>
                        );
                    })}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
}
