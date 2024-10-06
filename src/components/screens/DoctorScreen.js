import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Loader from '../Loader';
import Message from '../Message';
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetails, getReviews } from "../../actions/doctorActions"; 
import { createAppointment } from "../../actions/createAppointment";
import Rating from "../Rating";

function DoctorScreen({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Doctor Details
  const doctorDetail = useSelector((state) => state.doctorDetail); 
  const { loading, error, doctor } = doctorDetail;

  // Reviews
  const doctorReviews = useSelector((state) => state.doctorReviews);
  const { loading: loadingReviews, error: errorReviews, reviews } = doctorReviews;

  // Appointment Create
  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const { loading: loadingAppointment, error: errorAppointment } = appointmentCreate;

  useEffect(() => {
    dispatch(getDoctorDetails(id));
    dispatch(getReviews(id)); // Fetch reviews for the doctor
  }, [dispatch, id]);

  const bookHandler = async () => {
    const appointmentData = {
      doctor: doctor.id, 
      appointment_time: new Date().toISOString()
    };

    console.log("Sending appointment data:", JSON.stringify(appointmentData));

    try {
      await dispatch(createAppointment(appointmentData)); 
      history.push(`/appointments`);
    } catch (error) {
      console.error("Failed to create appointment", error);
    }
  };

  return (
    <div>
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>An error occurred. Please try again later.</Message>
      ) : (
        doctor && (
          <>
            <Row>
              <Col md={6}>
                {doctor.image ? (
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    style={{ width: "650px", height: "400px" }}
                    fluid
                  />
                ) : (
                  <div>No image available</div>
                )}
              </Col>

              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>Dr. {doctor.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Specialization: {doctor.specialization || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: {doctor.description || "No description available."}
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Booking Fee:</Col>
                        <Col>
                          <strong>${doctor.fee || "N/A"}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {doctor.available ? "Available" : "Not Available"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      {loadingAppointment && <Loader />}
                      {errorAppointment && (
                        <Message variant="danger">{errorAppointment}</Message>
                      )}
                      <Button
                        className="btn-block"
                        disabled={!doctor.available || loadingAppointment}
                        type="button"
                        onClick={bookHandler}
                      >
                        Consult
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>

           

          </>
        )
      )}
    </div>
  );
}

export default DoctorScreen;
