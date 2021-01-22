import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/main.css';

const Main = (props) => {
  return (
    <div>
      <Container fluid>
        <div className="hero">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <h1>URL Shortener</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit architecto animi nostrum cum facilis ipsa error
                consectetur enim, accusamus voluptates!
              </p>
              <button className="btn btn-light px-5 py-2">
                <Link to="/register">Get Started </Link>
              </button>
            </div>
            {/* <div className="col-md-5 col-sm-12 h-25">
              <img src="../assets/dark.png" alt="book" />
            </div> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Main;
